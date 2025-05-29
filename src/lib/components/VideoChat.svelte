<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Peer from "peerjs";

  export let tutorId: string;
  export let tutorName: string;
  export let onClose: () => void;
  export let isTutor: boolean = false;
  const dispatch = createEventDispatcher();
  let localStream: MediaStream | null = null;
  let remoteStream: MediaStream | null = null;
  let localVideo: HTMLVideoElement;
  let remoteVideo: HTMLVideoElement;
  let connectionStatus = "Initializing...";
  let isCallActive = false;
  let myPeerId = "";
  export let manualPeerId: string = "";

  let peer: Peer | null = null;
  let mediaConnection: any = null;
  let peerId = isTutor
    ? `tutor-${tutorId}`
    : `user-123`;
  let targetPeerId = isTutor
    ? `user-123`
    : `tutor-${tutorId}`;
  let currentPeerId = "";
  let showPeerId = true;

  onMount(async () => {
    try {
      connectionStatus = "Requesting camera access...";

      // Enable both audio and video for better testing
      localStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      connectionStatus = "Camera access granted";

      // Display local video stream with proper error handling
      if (localVideo) {
        localVideo.srcObject = localStream;
        // Add event listeners to debug video loading
        localVideo.addEventListener('loadedmetadata', () => {
          console.log('Local video metadata loaded');
        });
        localVideo.addEventListener('canplay', () => {
          console.log('Local video can play');
        });
      }

      await initPeer();
    } catch (error) {
      console.error("Error accessing media devices:", error);
      connectionStatus = "Failed to access camera/microphone";
    }
  });

  onDestroy(() => {
    cleanup();
  });

  function initPeer(): Promise<void> {
    return new Promise((resolve, reject) => {
      connectionStatus = "Connecting to peer server...";

      peer = new Peer(peerId);

      peer.on("open", (id) => {
        console.log("My peer ID is: " + id);
        myPeerId = id;
        connectionStatus = "Ready to connect";
        dispatch("peerIdGenerated", { peerId: id });
        resolve();
      });

      peer.on("call", (call) => {
        console.log("Receiving call from:", call.peer);
        currentPeerId = call.peer;
        connectionStatus = "Incoming call...";

        if (localStream) {
          call.answer(localStream);
          setupCallHandlers(call);
        }
      });

      peer.on("error", (err) => {
        console.error("Peer error:", err);

        if (err.type === "peer-unavailable") {
          connectionStatus = "The other party is not available";
        } else if (err.type === "network") {
          connectionStatus = "Network connection failed";
        } else if (err.type === "server-error") {
          connectionStatus = "Server connection failed";
        } else {
          connectionStatus = `Connection error: ${err.message}`;
        }

        reject(err);
      });

      peer.on("disconnected", () => {
        console.log("Peer disconnected");
        connectionStatus = "Disconnected from server";

        if (peer && !peer.destroyed) {
          peer.reconnect();
        }
      });
    });
  }

  function setupCallHandlers(call: any) {
    mediaConnection = call;

    call.on("stream", (stream: MediaStream) => {
      console.log("Received remote stream");
      console.log("Remote stream tracks:", stream.getTracks());
      
      remoteStream = stream;
      isCallActive = true;
      connectionStatus = "Connected";

      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        if (remoteVideo && remoteStream) {
          console.log("Setting remote video source");
          remoteVideo.srcObject = remoteStream;
          
          // Add event listeners for debugging
          remoteVideo.addEventListener('loadedmetadata', () => {
            console.log('Remote video metadata loaded');
            console.log('Remote video dimensions:', remoteVideo.videoWidth, 'x', remoteVideo.videoHeight);
          });
          
          remoteVideo.addEventListener('canplay', () => {
            console.log('Remote video can play');
          });
          
          remoteVideo.addEventListener('error', (e) => {
            console.error('Remote video error:', e);
          });

          // Force play the video
          remoteVideo.play().catch(err => {
            console.error('Error playing remote video:', err);
          });
        }
      }, 100);
    });

    call.on("close", () => {
      console.log("Call closed");
      isCallActive = false;
      connectionStatus = "Call ended";
      remoteStream = null;

      if (remoteVideo) {
        remoteVideo.srcObject = null;
      }
    });

    call.on("error", (err: any) => {
      console.error("Call error:", err);
      connectionStatus = "Call error occurred";
      isCallActive = false;

      if (remoteVideo) {
        remoteVideo.srcObject = null;
      }
    });
  }

  function startCall() {
    if (!peer || !localStream) {
      console.error("Peer or local stream not available");
      connectionStatus = "Cannot start call - not ready";
      return;
    }

    if (peer.disconnected) {
      connectionStatus = "Reconnecting...";
      peer.reconnect();
      return;
    }

    try {
      connectionStatus = `Calling ${isTutor ? "student" : "tutor"}...`;
      const peerToCall = manualPeerId || targetPeerId;

      console.log("Calling peer:", peerToCall);
      console.log("Local stream tracks:", localStream.getTracks());

      const call = peer.call(peerToCall, localStream);

      if (call) {
        setupCallHandlers(call);
      } else {
        connectionStatus = "Failed to initiate call";
      }
    } catch (error) {
      console.error("Error starting call:", error);
      connectionStatus = "Failed to start call";
    }
  }

  function hangUp() {
    isCallActive = false;
    connectionStatus = "Ending call...";

    if (mediaConnection) {
      mediaConnection.close();
      mediaConnection = null;
    }

    if (remoteVideo) {
      remoteVideo.srcObject = null;
    }

    remoteStream = null;
    connectionStatus = "Call ended";
  }

  function cleanup() {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
        console.log("Stopped track:", track.kind);
      });
      localStream = null;
    }

    if (localVideo) {
      localVideo.srcObject = null;
    }

    if (remoteVideo) {
      remoteVideo.srcObject = null;
    }

    if (mediaConnection) {
      mediaConnection.close();
      mediaConnection = null;
    }

    if (peer && !peer.destroyed) {
      peer.destroy();
      peer = null;
    }

    remoteStream = null;
    isCallActive = false;
  }

  function toggleAudio() {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
      }
    }
  }

  function toggleVideo() {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
      }
    }
  }
</script>

<div class="video-chat-container">
  <div class="video-chat-header">
    <h2>Video Call with {tutorName}</h2>
    <button class="btn close-btn" on:click={onClose}>×</button>
  </div>

  <div class="video-chat-status">
    <p>{connectionStatus}</p>
    {#if showPeerId && myPeerId}
      <small>Your ID: {myPeerId} ({isTutor ? "Tutor" : "Student"})</small>
    {/if}
  </div>

  <div class="video-streams">
    <div class="remote-stream">
      {#if isCallActive}
        <!-- Always show the video element when call is active -->
        <video 
          bind:this={remoteVideo} 
          autoplay 
          playsinline 
          controls={false}
          style="display: block;"
        ></video>
        {#if !remoteStream}
          <div class="overlay-message">Waiting for remote video...</div>
        {/if}
      {:else}
        <div class="placeholder">
          <span>No active call</span>
        </div>
      {/if}
    </div>

    <div class="local-stream">
      <video bind:this={localVideo} autoplay playsinline muted></video>
    </div>
  </div>

  <div class="video-controls">
    {#if !isCallActive}
      <button
        class="btn primary"
        on:click={startCall}
        disabled={!peer || peer.disconnected || !localStream}
      >
        {peer && !peer.disconnected ? "Start Call" : "Connecting..."}
      </button>
    {:else}
      <div class="call-controls">
        <button class="btn secondary" on:click={toggleAudio}>
          🎤 Toggle Audio
        </button>
        <button class="btn secondary" on:click={toggleVideo}>
          📹 Toggle Video
        </button>
        <button class="btn danger" on:click={hangUp}>End Call</button>
      </div>
    {/if}
  </div>
</div>

<style>
  .video-chat-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 800px;
    height: 80vh;
    max-height: 600px;
    background-color: var(--color-white);
    border: 2px solid var(--color-black);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  .video-chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-3);
    border-bottom: 2px solid var(--color-black);
    background-color: var(--color-gray-50);
  }

  .video-chat-header h2 {
    margin: 0;
    font-size: 1.25rem;
  }

  .close-btn {
    font-size: 1.5rem;
    line-height: 1;
    padding: 0 var(--space-2);
    background: none;
    border: 1px solid var(--color-black);
    cursor: pointer;
  }

  .close-btn:hover {
    background-color: var(--color-gray-200);
  }

  .video-chat-status {
    padding: var(--space-2);
    text-align: center;
    font-weight: bold;
    background-color: var(--color-gray-100);
    border-bottom: 1px solid var(--color-gray-300);
  }

  .video-streams {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: var(--color-gray-900);
    min-height: 0;
  }

  .remote-stream {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .remote-stream video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #000;
  }

  .overlay-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--color-white);
    font-size: var(--text-xl);
    background-color: rgba(0, 0, 0, 0.7);
    padding: var(--space-2);
    border-radius: 4px;
  }

  .local-stream {
    position: absolute;
    bottom: var(--space-3);
    right: var(--space-3);
    width: 150px;
    height: 100px;
    overflow: hidden;
    border: 2px solid var(--color-white);
    border-radius: 8px;
    background-color: #000;
  }

  .local-stream video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    font-size: var(--text-xl);
    background-color: var(--color-gray-800);
  }

  .video-controls {
    padding: var(--space-3);
    display: flex;
    justify-content: center;
    border-top: 2px solid var(--color-black);
    background-color: var(--color-white);
  }

  .call-controls {
    display: flex;
    gap: var(--space-2);
    align-items: center;
  }

  .btn {
    padding: var(--space-2) var(--space-3);
    border: 2px solid var(--color-black);
    background-color: var(--color-white);
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
  }

  .btn:hover:not(:disabled) {
    background-color: var(--color-gray-100);
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn.primary {
    background-color: #007bff;
    color: white;
  }

  .btn.primary:hover:not(:disabled) {
    background-color: #0056b3;
  }

  .btn.secondary {
    background-color: var(--color-gray-200);
  }

  .btn.secondary:hover {
    background-color: var(--color-gray-300);
  }

  .btn.danger {
    background-color: #ff3e3e;
    color: white;
  }

  .btn.danger:hover {
    background-color: #cc0000;
  }
</style>