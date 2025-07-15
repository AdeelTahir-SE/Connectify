import { io } from "socket.io-client";
const configure = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
import { signalingEmitter } from "./event-emitter";
export const signallingChannel = io(process.env.NEXT_PUBLIC_SERVER_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

export const peerConnection: Map<string, RTCPeerConnection> = new Map();

signallingChannel.onAny((event, ...args) => {
  console.log(`Event: ${event}`, args);
  if (event === "connect") {
    console.log("Connected to signaling server");
  }
  if (event === "disconnect") {
    console.log("Disconnected from signaling server");
  }
  if (event === "connect_error") {
    console.error("Connection error:", args);
  }
});

signallingChannel.on("message", async (data) => {
  if (data.answer) {
    const pc = peerConnection.get(`${data.receiverId}-${data.senderId}`);
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    } else {
      console.error("Peer connection not found for answer");
    }
  }

  if (data.offer) {
    const key = `${data.receiverId}-${data.senderId}`;
    signalingEmitter.emit("offerReceived", {
      senderId: data.senderId,
      receiverId: data.receiverId,
      offer: data.offer,
    });

    signalingEmitter.once("offerAccepted", async () => {
      signalingEmitter.emit("videoModal", true);

      const pc = new RTCPeerConnection(configure);
      peerConnection.set(key, pc);

      const userMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const localVideo = document.getElementById(
        "localVideo"
      ) as HTMLVideoElement;
      if (localVideo) {
        localVideo.srcObject = userMedia;
        localVideo.autoplay = true;
        localVideo.controls = true;
      }

      userMedia.getTracks().forEach((track) => {
        pc.addTrack(track, userMedia);
      });

      pc.addEventListener("track", async (event) => {
        const stream = event.streams[0];
        const remoteVideo = document.getElementById(
          "remoteVideo"
        ) as HTMLVideoElement;

        remoteVideo.srcObject = stream;
        remoteVideo.autoplay = true;
        remoteVideo.muted = true;
        remoteVideo.controls = true;
        remoteVideo.addEventListener("loadedmetadata", async() => {
          await remoteVideo.play();
        });
      });
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      pc.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          signallingChannel.emit("message", {
            senderId: data.receiverId,
            receiverId: data.senderId,
            iceCandidate: event.candidate,
          });
        }
      });

      signallingChannel.emit("message", {
        senderId: data.receiverId,
        receiverId: data.senderId,
        answer,
      });
    });

    // //rejected the offer
    // signalingEmitter.once("offerRejected", async () => {
    //   const pc = peerConnection.get(key);
    //   pc?.close();
    //   peerConnection.delete(key);
    //   signalingEmitter.emit("videoModal", false);
    //   signallingChannel.emit("message", {
    //     senderId: data.receiverId,
    //     receiverId: data.senderId,
    //     callClosed: true,
    //   });
    //   const localVideo = document.getElementById(
    //     "localVideo"
    //   ) as HTMLVideoElement;
    //   if (localVideo) {
    //     const stream = localVideo.srcObject as MediaStream;
    //     if (stream) {
    //       stream.getTracks().forEach((track) => track.stop());
    //     }
    //     localVideo.srcObject = null;
    //     localVideo.muted = true;
    //     localVideo.autoplay = false;
    //     localVideo.controls = false;
    //   }
    //   const remoteVideo = document.getElementById(
    //     "remoteVideo"
    //   ) as HTMLVideoElement;
    //   if (remoteVideo) {
    //     const stream = remoteVideo.srcObject as MediaStream;
    //     if (stream) {
    //       stream.getTracks().forEach((track) => track.stop());
    //     }
    //     remoteVideo.srcObject = null;
    //     remoteVideo.muted = true;
    //     remoteVideo.autoplay = false;
    //     remoteVideo.controls = false;
    //   }

    // });

    // Handle close video call event
    signalingEmitter.once("closeVideoCall", async () => {
      const pc = peerConnection.get(key);
      pc?.close();
      peerConnection.delete(key);
      signalingEmitter.emit("videoModal", false);
      signallingChannel.emit("message", {
        senderId: data.receiverId,
        receiverId: data.senderId,
        callClosed: true,
      });
      const localVideo = document.getElementById(
        "localVideo"
      ) as HTMLVideoElement;
      if (localVideo) {
        const stream = localVideo.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        localVideo.srcObject = null;
        localVideo.muted = true;
        localVideo.autoplay = false;
        localVideo.controls = false;
      }
      const remoteVideo = document.getElementById(
        "remoteVideo"
      ) as HTMLVideoElement;
      if (remoteVideo) {
        const stream = remoteVideo.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        remoteVideo.srcObject = null;
        remoteVideo.muted = true;
        remoteVideo.autoplay = false;
        remoteVideo.controls = false;
      }
    });

    if (data.iceCandidate) {
      const pc = peerConnection.get(`${data.receiverId}-${data.senderId}`);
      if (pc) {
        await pc.addIceCandidate(new RTCIceCandidate(data.iceCandidate));
      } else {
        console.error("Peer connection not found for ICE candidate");
      }
    }
  }

  //remote cancelled the call
  if (data.callClosed) {
    const key = `${data.receiverId}-${data.senderId}`;
    const pc = peerConnection.get(key);
    pc?.close();
    peerConnection.delete(key);

    const localVideo = document.getElementById(
      "localVideo"
    ) as HTMLVideoElement;
    if (localVideo) {
      const stream = localVideo.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      localVideo.srcObject = null;
      localVideo.muted = true;
      localVideo.autoplay = false;
      localVideo.controls = false;
    }

    const remoteVideo = document.getElementById(
      "remoteVideo"
    ) as HTMLVideoElement;
    if (remoteVideo) {
      const stream = remoteVideo.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      remoteVideo.srcObject = null;
      remoteVideo.muted = true;
      remoteVideo.autoplay = false;
      remoteVideo.controls = false;
    }
    signalingEmitter.emit("videoModal", false);
  }
});

signallingChannel.on("group-call-join",(data)=>{
  signalingEmitter.emit("group-call-join", data);
})
