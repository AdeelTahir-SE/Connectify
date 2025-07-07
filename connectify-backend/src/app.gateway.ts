/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class WebSocket implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private userSocketMap: Map<string, string> = new Map();

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    // Remove any userIds that had this socket
    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === client.id) {
        this.userSocketMap.delete(userId);
        console.log(`Removed user ${userId} from userSocketMap.`);
      }
    }
  }

  @SubscribeMessage("register")
  handleRegister(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { userId, userName }: { userId: string; userName: string } = data;
    this.userSocketMap.set(userId, client.id);
    console.log(`✅ Registered user: ${userName} (${userId}) with socket ${client.id}`);
    this.server.emit("userRegistered", { userId, userName });
  }

  @SubscribeMessage("message")
  handleEvent(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { senderId, receiverId, offer, answer, iceCandidate ,callClosed} = data;
    console.log(`📨 Message from ${senderId} to ${receiverId}:`, data);

    const receiverSocketId = this.userSocketMap.get(receiverId);
    if (!receiverSocketId) {
      console.error(`❌ Receiver ${receiverId} is not connected.`);
      return;
    }

    this.server.to(receiverSocketId).emit("message", {
      senderId,
      receiverId,
      offer,
      answer,
      iceCandidate,
      callClosed,
    });

    console.log(`✅ Relayed message to ${receiverId}.`);
  }
}
