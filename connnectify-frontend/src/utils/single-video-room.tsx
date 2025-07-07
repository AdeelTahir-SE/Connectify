import { io } from "socket.io-client";
const configure = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
import { signalingEmitter } from "./event-emitter";
export const signallingChannel = io("http://localhost:3001", {
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
      console.log("Remote description set for answer successfully!");
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
      const pc = new RTCPeerConnection(configure);
      peerConnection.set(key, pc);
      signalingEmitter.emit("videoModal");

      const userMedia = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const localVideo = document.getElementById(
        "localVideo"
      ) as HTMLVideoElement;
      console.log("Local video element:", localVideo);
      if (localVideo) {
        localVideo.srcObject = userMedia;
        localVideo.autoplay = true;
        localVideo.controls = true;
      }

      userMedia.getTracks().forEach((track) => {
        pc.addTrack(track, userMedia);
      });

      pc.addEventListener("track", async (event) => {
        console.log("Track event received-finally:", event);
        const stream = event.streams[0];
        const remoteVideo = document.getElementById(
          "remoteVideo"
        ) as HTMLVideoElement;
        console.log("Remote video element:", remoteVideo);
        console.log(
          "Remote stream tracks:",
          stream.getTracks().map((t) => ({
            kind: t.kind,
            readyState: t.readyState,
          }))
        );

        remoteVideo.srcObject = stream;
        remoteVideo.autoplay = true;
        remoteVideo.muted = true;
        remoteVideo.controls = true;
        remoteVideo.onloadedmetadata = async () => {
          try {
            await remoteVideo.play();
            console.log("Remote video playback started successfully!");
          } catch (err) {
            console.error("Autoplay error:", err);
          }
        };
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


    //rejected the offer  
    signalingEmitter.once("offerRejected", async () => {
      const pc = peerConnection.get(key);
      pc?.close();
      peerConnection.delete(key);
    });

    // Handle close video call event
    signalingEmitter.once("closeVideoCall", async () => {
      const pc = peerConnection.get(key);
      pc?.close();
      peerConnection.delete(key);
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
      }

      console.log("Call cleanup completed.");
    }

});

export async function initiateCall(senderId: string, receiverId: string) {
  const key = `${senderId}-${receiverId}`;
  if (peerConnection.has(key)) {
    console.warn("Peer connection already exists for this call");
    return { pc: peerConnection.get(key), error: null };
  }
  const pc = new RTCPeerConnection(configure);
  peerConnection.set(key, pc);
  return { pc, error: null };
}

export async function createOffer(senderId: string, receiverid: string) {
  const pc = peerConnection.get(`${senderId}-${receiverid}`);
  if (!pc) {
    console.error("Peer connection not found for creating offer");
    return { pc: null, error: "Peer connection not found" };
  }

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  pc.addEventListener("icecandidate", (event) => {
    if (event.candidate) {
      signallingChannel.emit("message", {
        senderId,
        receiverId: receiverid,
        iceCandidate: event.candidate,
      });
      console.log("ICE candidate sent:", event.candidate);
    }
  });

  pc.addEventListener("connectionstatechange", (event) => {
    if (pc.connectionState === "connected") {
      console.log("Peer connection established successfully!");
    }
  });
  
  signallingChannel.once("closeVideoCall", () => {
    const key = `${senderId}-${receiverid}`;
    const pc = peerConnection.get(key);
    if (pc) {
      pc.close();
      peerConnection.delete(key);
      console.log("Call closed and peer connection removed.");
    } else {
      console.warn("No peer connection found to close.");
    }
  });

  signallingChannel.emit("message", {
    senderId,
    receiverId: receiverid,
    offer,
  });
}
