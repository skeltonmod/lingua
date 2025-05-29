<script lang="ts">
  import VideoChat from "$lib/components/VideoChat.svelte";

  let showVideoChat = false;
  let isTutor = false;
  let peerIdToConnect = "";
  let displayedPeerId = "";

  function openVideoChat(asTutor: boolean) {
    isTutor = asTutor;
    showVideoChat = true;
  }

  function closeVideoChat() {
    showVideoChat = false;
  }

  function setPeerId(event: CustomEvent) {
    displayedPeerId = event.detail.peerId;
  }

  function handleConnect() {
    if (isTutor && peerIdToConnect) {
      openVideoChat(true);
    }
  }
</script>

<svelte:head>
  <title>Test Video Chat</title>
</svelte:head>

<div class="test-container">
  <h1>Video Chat Testing</h1>

  <div class="role-selection">
    <h2>Choose a role to test</h2>
    <div class="buttons">
      <button class="btn primary" on:click={() => openVideoChat(true)}>
        Join as Tutor
      </button>
      <button class="btn primary" on:click={() => openVideoChat(false)}>
        Join as Student
      </button>
    </div>

    {#if displayedPeerId}
      <div class="peer-id-display">
        <h3>Your Peer ID:</h3>
        <div class="peer-id">{displayedPeerId}</div>
        <p class="hint">
          Share this ID with the {isTutor ? "student" : "tutor"} to connect
        </p>
      </div>
    {/if}

    {#if !showVideoChat}
      <div class="connect-form">
        <h3>Connect to Student</h3>
        <div class="input-group">
          <label for="peer-id-input">Enter Student's Peer ID:</label>
          <input
            id="peer-id-input"
            type="text"
            bind:value={peerIdToConnect}
            placeholder="e.g., user-abc123"
          />
          <button
            class="btn primary"
            on:click={handleConnect}
            disabled={!peerIdToConnect}
          >
            Connect
          </button>
        </div>
      </div>
    {/if}

    <div class="instructions">
      <h3>How to test:</h3>
      <ol>
        <li>Open this page in two different browser tabs</li>
        <li>In one tab, click "Join as Tutor"</li>
        <li>In the other tab, click "Join as Student"</li>
        <li>
          Copy the Student's Peer ID and paste it into the Tutor's "Connect to
          Student" field
        </li>
        <li>Click "Connect" as the Tutor to initiate the call</li>
        <li>Allow camera/microphone access in both tabs</li>
      </ol>
      <p>
        <strong>Note:</strong> You'll need to open this in two separate tabs or windows
      </p>
    </div>
  </div>
</div>

{#if showVideoChat}
  <div class="video-chat-overlay">
    <VideoChat
      tutorId={`1234`}
      tutorName="Test Tutor"
      onClose={closeVideoChat}
      {isTutor}
      manualPeerId={isTutor ? peerIdToConnect : ""}
      on:peerIdGenerated={setPeerId}
    />
  </div>
{/if}

<style>
  .test-container {
    max-width: 800px;
    margin: 0 auto;
    padding: var(--space-5);
  }

  h1 {
    text-align: center;
    margin-bottom: var(--space-5);
  }

  .role-selection {
    border: 2px solid var(--color-black);
    padding: var(--space-4);
    border-radius: 8px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: var(--space-4);
    margin: var(--space-4) 0;
  }

  .btn {
    padding: var(--space-2) var(--space-4);
    border: 2px solid var(--color-black);
    background-color: var(--color-white);
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
  }

  .btn.primary {
    background-color: #007bff;
    color: white;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .instructions {
    background-color: var(--color-gray-100);
    padding: var(--space-3);
    border-radius: 4px;
    margin-top: var(--space-4);
  }

  .video-chat-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }

  .peer-id-display {
    margin: var(--space-4) 0;
    padding: var(--space-3);
    background-color: var(--color-gray-50);
    border: 1px solid var(--color-gray-300);
    border-radius: 4px;
    text-align: center;
  }

  .peer-id {
    font-family: var(--font-mono);
    font-size: var(--text-lg);
    padding: var(--space-2);
    background-color: var(--color-white);
    border: 1px solid var(--color-gray-300);
    border-radius: 4px;
    margin: var(--space-2) 0;
    word-break: break-all;
  }

  .hint {
    font-size: var(--text-sm);
    color: var(--color-gray-600);
    margin-top: var(--space-1);
  }

  .connect-form {
    margin: var(--space-4) 0;
    padding: var(--space-3);
    background-color: var(--color-gray-50);
    border: 1px solid var(--color-gray-300);
    border-radius: 4px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .input-group input {
    padding: var(--space-2);
    border: 2px solid var(--color-black);
    font-family: var(--font-mono);
    font-size: var(--text-base);
  }

  @media (min-width: 768px) {
    .input-group {
      flex-direction: row;
      align-items: flex-end;
    }

    .input-group label {
      flex: 0 0 auto;
    }

    .input-group input {
      flex: 1;
    }
  }
</style>
