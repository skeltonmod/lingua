<script lang="ts">
  import VideoChat from "$lib/components/VideoChat.svelte";
  export let tutor: {
    id: string;
    name: string;
    avatar: string;
    languages: { name: string; level: string }[];
    rating: number;
    reviews: number;
    hourlyRate: number;
    specialties: string[];
  };

  let showVideoChat = false;
  let selectedTutor: {
    id: string;
    name: string;
  } | null = null;

  function getStars(rating: number) {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  }

  // @ts-expect-error too lazy
  function startVideoChat(tutor) {
    selectedTutor = tutor;
    showVideoChat = true;
  }

  function closeVideoChat() {
    showVideoChat = false;
    selectedTutor = null;
  }
</script>

<div class="tutor-card">
  <div class="tutor-avatar">
    <img src={tutor.avatar} alt={`${tutor.name} profile picture`} />
  </div>

  <div class="tutor-info">
    <h3 class="tutor-name">{tutor.name}</h3>

    <div class="tutor-languages">
      {#each tutor.languages as language, i}
        <span class="language">
          {language.name} ({language.level})
          {#if i < tutor.languages.length - 1},
          {/if}
        </span>
      {/each}
    </div>

    <div class="tutor-rating">
      <span class="stars" aria-label={`${tutor.rating} out of 5 stars`}>
        {getStars(tutor.rating)}
      </span>
      <span class="review-count">({tutor.reviews})</span>
    </div>

    <div class="tutor-specialties">
      {#each tutor.specialties as specialty}
        <span class="specialty">{specialty}</span>
      {/each}
    </div>
  </div>

  <div class="tutor-action">
    <div class="tutor-price">
      <span class="price-label">Price</span>
      <span class="price-amount">${tutor.hourlyRate}/hr</span>
    </div>

    <div class="buttons-container">
      <a href={`/tutors/${tutor.id}`} class="btn primary view-profile">
        VIEW PROFILE
      </a>
      <button class="btn video-chat-btn" on:click={() => startVideoChat(tutor)}>
        START VIDEO CHAT
      </button>
    </div>
  </div>
</div>

{#if showVideoChat && selectedTutor}
  <div class="video-chat-overlay">
    <VideoChat
      tutorId={selectedTutor.id}
      tutorName={selectedTutor.name}
      onClose={closeVideoChat}
    />
  </div>
{/if}

<style>
  .tutor-card {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: var(--space-4);
    padding: var(--space-4);
    border: 2px solid var(--color-black);
    background-color: var(--color-white);
    margin-bottom: var(--space-3);
    transition: transform var(--transition-fast);
  }

  .tutor-card:hover {
    transform: translateY(-4px);
  }

  .tutor-avatar {
    width: 80px;
    height: 80px;
    border: 2px solid var(--color-black);
    overflow: hidden;
  }

  .tutor-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tutor-name {
    font-size: var(--text-xl);
    margin-bottom: var(--space-1);
  }

  .tutor-languages {
    font-size: var(--text-sm);
    margin-bottom: var(--space-2);
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

  .language {
    font-weight: 600;
  }

  .tutor-rating {
    margin-bottom: var(--space-2);
  }

  .stars {
    color: var(--color-primary);
    letter-spacing: 0.1em;
  }

  .review-count {
    font-size: var(--text-sm);
    color: var(--color-gray-600);
    margin-left: var(--space-1);
  }

  .tutor-specialties {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  .specialty {
    display: inline-block;
    padding: var(--space-1);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid var(--color-black);
    background-color: var(--color-gray-100);
  }

  .tutor-action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  .tutor-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .price-label {
    font-size: var(--text-xs);
    text-transform: uppercase;
    font-weight: 700;
  }

  .price-amount {
    font-family: var(--font-mono);
    font-size: var(--text-xl);
    font-weight: 700;
  }

  .view-profile {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .tutor-card {
      grid-template-columns: auto 1fr;
      grid-template-rows: auto auto;
    }

    .tutor-action {
      grid-column: 1 / -1;
      grid-row: 2;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: var(--space-2);
    }
  }

  @media (max-width: 480px) {
    .tutor-action {
      flex-direction: column;
      align-items: stretch;
    }

    .tutor-price {
      align-items: flex-start;
      margin-bottom: var(--space-2);
    }
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .video-chat-btn {
    position: absolute;
    bottom: var(--space-3);
    right: var(--space-3);
    background-color: var(--color-primary);
    z-index: 5;
  }

  @media (max-width: 768px) {
    .buttons-container {
      width: 100%;
    }
  }
</style>
