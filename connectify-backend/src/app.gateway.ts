import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CallSignalData, GroupCallData, GroupCallResponseData, WaitingUser} from "./types"


@WebSocketGateway()
export class WebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSocketMap: Map<string, string> = new Map();

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    // console.log(`Client disconnected: ${client.id}`);
    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === client.id) {
        this.userSocketMap.delete(userId);
        // console.log(`Removed user ${userId} from userSocketMap.`);
      }
    }
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: {userId:string,userName:string}, @ConnectedSocket() client: Socket) {
    const { userId, userName }: { userId: string; userName: string } = data;
    this.userSocketMap.set(userId, client.id);
    console.log(
      `✅ Registered user: ${userName} (${userId}) with socket ${client.id}`,
    );
    this.server.emit('userRegistered', { userId, userName });
  }
  
 
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: CallSignalData) {
    const { senderId, receiverId, offer, answer, iceCandidate, callClosed } =data;

    const receiverSocketId = this.userSocketMap.get(receiverId );
    if (!receiverSocketId) {
      // console.error(`❌ Receiver ${receiverId} is not connected.`);
      return;
    }

    // console.log(`✅ Found receiver ${receiverId} with socket ID ${receiverSocketId}. Relaying message... 
    //   callClosed: ${callClosed}
    //   offer: ${offer ? JSON.stringify(offer) : 'No offer'},
    //   answer: ${answer ? JSON.stringify(answer) : 'No answer'},
    //   iceCandidate: ${iceCandidate ? JSON.stringify(iceCandidate) : 'No ICE candidate'}
      
    //   `);

    this.server.to(receiverSocketId).emit('message', {
      senderId,
      receiverId,
      offer,
      answer,
      iceCandidate,
      callClosed,
    });

    // console.log(`✅ Relayed message to ${receiverId}.`);
  }

  @SubscribeMessage('group-call-join')
  handleGroupCallJoin(
    @MessageBody() data: GroupCallData,
  ) {
    const { requestedPeople, sender, channel, token } = data;
    // console.log(`📨 Group call join request from ${sender}:`, requestedPeople);

    for (const person of requestedPeople) {
      const receiverSocketId = this.userSocketMap.get(person?.uid);
      if (!receiverSocketId) {
        // console.error(`❌ Receiver ${person.uid} is not connected.`);
        continue;
      }
      // console.log(
      //   `✅ Found receiver ${person.uid} with socket ID ${receiverSocketId}. Relaying join request...`,
      // );
      this.server.to(receiverSocketId).emit('group-call-join', {
        requestedPeople,
        sender,
        channel,
        token,
      });
    }

    // console.log(`✅ Group call join request relayed to all participants.`);
  }

  @SubscribeMessage('group-call-accept')
  handleGroupCallAccept(
    @MessageBody() data: GroupCallResponseData,
  ) {
    const { requestedPeople, sender, acceptor } = data;
    // console.log(`📨 Group call accept from ${sender}:`, requestedPeople);

    for (const person of requestedPeople) {
      const receiverSocketId = this.userSocketMap.get(person.uid);
      if (!receiverSocketId) {
        // console.error(`❌ Receiver ${person.uid} is not connected.`);
        continue;
      }
      // console.log(
      //   `✅ Found receiver ${person.uid} with socket ID ${receiverSocketId}. Relaying accept...`,
      // );
      this.server.to(receiverSocketId).emit('group-call-accept', {
        requestedPeople,
        sender,
        acceptor: acceptor,
      });
    }

    // console.log(`✅ Group call accept relayed to all participants.`);
  }
  @SubscribeMessage('group-call-reject')
  handleGroupCallReject(
    @MessageBody() data: GroupCallResponseData,
  ) {
    const { requestedPeople, sender, rejector } = data;
    // console.log(`📨 Group call reject from ${sender}:`, requestedPeople);

    for (const person of requestedPeople) {
      const receiverSocketId = this.userSocketMap.get(person.uid);
      if (!receiverSocketId) {
        // console.error(`❌ Receiver ${person?.uid} is not connected.`);
        continue;
      }
      // console.log(
      //   `✅ Found receiver ${person.uid} with socket ID ${receiverSocketId}. Relaying reject...`,
      // );
      this.server.to(receiverSocketId).emit('group-call-reject', {
        requestedPeople,
        sender,
        rejector,
      });
    }

    // console.log(`✅ Group call reject relayed to all participants.`);
  }

  private waitingUser: WaitingUser | null = null;

  @SubscribeMessage('join-random-lobby')
  onJoinLobby(
    @MessageBody() data: { uid: string },
    @ConnectedSocket() client: Socket,
  ) {
    if (this.waitingUser) {
      const channel = `random-${Date.now()}-${data.uid}`;
  // console.log(`Matched ${this.waitingUser.uid} with ${data.uid} in channel ${channel}`);
      client.emit('matched', {
        channel,
        peer: this.waitingUser.uid,
      });

      this.waitingUser.socket.emit('matched', {
        channel,
        peer: data.uid,
      });

      this.waitingUser = null; 
    } else {
      this.waitingUser = { uid: data.uid, socket: client };
    }
  }
}
