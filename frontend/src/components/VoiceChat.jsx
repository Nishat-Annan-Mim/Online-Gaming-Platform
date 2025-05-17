// components/VoiceChat.jsx
import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';

const VoiceChat = ({ room }) => {
  const localAudioRef = useRef();
  const remoteAudioRef = useRef();
  const pcRef = useRef();
  const [socket] = useState(() => io());
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    // Initialize peer connection with STUN servers
    pcRef.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Handle incoming voice offers
    socket.on('voice-offer', async ({ sdp, caller }) => {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
      localAudioRef.current.srcObject = stream;
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      socket.emit('voice-answer', { sdp: answer, callee: socket.id, target: caller });
    });

    // Handle incoming voice answers
    socket.on('voice-answer', async ({ sdp }) => {
      await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    // Handle incoming ICE candidates
    socket.on('ice-candidate', async ({ candidate }) => {
      if (candidate) {
        try {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error('Error adding received ICE candidate', err);
        }
      }
    });

    // Send ICE candidates to the other peer
    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, target: room });
      }
    };

    // When remote track arrives, set it to audio element
    pcRef.current.ontrack = (event) => {
      remoteAudioRef.current.srcObject = event.streams[0];
    };

    // Join a voice room (used as signaling room for simplicity)
    socket.emit('joinRoom', { room: room });

    return () => {
      socket.disconnect();
      pcRef.current.close();
    };
  }, [room, socket]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
    localAudioRef.current.srcObject = stream;

    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    // Emit the offer to others in the room
    socket.emit('voice-offer', { sdp: offer, caller: socket.id, target: room });
    setInCall(true);
  };

  return (
    <div>
      <h3>Voice Chat</h3>
      <audio ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudioRef} autoPlay />
      {!inCall && <button onClick={startCall}>Start Voice Chat</button>}
    </div>
  );
};

export default VoiceChat;
