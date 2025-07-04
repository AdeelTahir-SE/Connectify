export async function startVideoCall(caller_id: string, sender_id: string) {
  const config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  const peerConnection = new RTCPeerConnection(config);
  const offer = await peerConnection.createOffer();
  signalingChannel.addEventListener("message", async (message) => {
    if (message.answer) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(message.answer)
      );
    }
  });
  await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
  signalingChannel.send({
    caller_id: caller_id,
    sender_id: sender_id,
    offer: offer,
  });
}

export async function receiveVideoCall(caller_id: string, sender_id: string) {
  const config = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
  const peerConnection = new RTCPeerConnection(config);
  signalingChannel.onmessage = async (message) => {
    if (message.offer) {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(message.offer)
      );
      const answer = peerConnection.createAnswer();
      await peerConnection.setLocalDescription(
        new RTCSessionDescription(answer)
      );
      signalingChannel.send({
        caller_id: caller_id,
        sender_id: sender_id,
        answer: answer,
      });
    }
  };
}

export async function endVideoCall(caller_id: string, sender_id: string) {
  signalingChannel.send({
    caller_id: caller_id,
    sender_id: sender_id,
    cancel: true,
  });
}
