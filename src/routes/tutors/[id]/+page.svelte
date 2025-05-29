<script lang="ts">
  import { page } from "$app/stores";
  import { getTutorById } from "$lib/data/tutors";

  $: tutor = getTutorById($page.params.id);

  let selectedDay = 0;
  let selectedSlot = "";
  function selectDay(index: number) {
    selectedDay = index;
    selectedSlot = "";
  }

  function selectSlot(slot: string) {
    selectedSlot = slot;
  }

  function bookLesson() {
    if (!selectedSlot) return;

    alert(
      `Booking confirmed for ${tutor?.name} on ${tutor?.availability[selectedDay].day} at ${selectedSlot}`
    );
    // In a real app, this would send data to the server
  }

  function getStars(rating: number) {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  }
</script>

<svelte:head>
  <title>{tutor ? `${tutor.name} | LINGUA` : "Tutor Not Found"}</title>
</svelte:head>

<div class="container">
  {#if tutor}
    <section class="tutor-profile">
      <div class="tutor-header">
        <div class="tutor-avatar">
          <img src={tutor.avatar} alt={`${tutor.name} profile picture`} />
        </div>

        <div class="tutor-intro">
          <h1>{tutor.name}</h1>

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
            <span class="review-count">({tutor.reviews} reviews)</span>
          </div>

          <div class="tutor-price">
            <span class="price-amount">${tutor.hourlyRate}/hr</span>
          </div>
        </div>
      </div>

      <div class="tutor-body">
        <div class="tutor-details">
          <div class="tutor-description">
            <h2>ABOUT</h2>
            <p>{tutor.description}</p>
          </div>

          <div class="tutor-specialties">
            <h2>SPECIALTIES</h2>
            <div class="specialty-tags">
              {#each tutor.specialties as specialty}
                <span class="specialty-tag">{specialty}</span>
              {/each}
            </div>
          </div>
        </div>

        <div class="tutor-booking">
          <h2>BOOK A LESSON</h2>

          <div class="booking-days">
            {#each tutor.availability as day, i}
              <button
                class="day-btn"
                class:active={selectedDay === i}
                on:click={() => selectDay(i)}
              >
                {day.day}
              </button>
            {/each}
          </div>

          <div class="booking-slots">
            <h3>AVAILABLE TIMES</h3>

            {#if tutor.availability[selectedDay].slots.length > 0}
              <div class="time-slots">
                {#each tutor.availability[selectedDay].slots as slot}
                  <button
                    class="slot-btn"
                    class:active={selectedSlot === slot}
                    on:click={() => selectSlot(slot)}
                  >
                    {slot}
                  </button>
                {/each}
              </div>
            {:else}
              <p class="no-slots">No available times for this day.</p>
            {/if}
          </div>

          <button
            class="btn primary book-btn"
            disabled={!selectedSlot}
            on:click={bookLesson}
          >
            BOOK LESSON
          </button>
        </div>
      </div>
    </section>
  {:else}
    <div class="not-found">
      <h1>TUTOR NOT FOUND</h1>
      <p>
        The tutor you're looking for doesn't exist or may have been removed.
      </p>
      <a href="/tutors" class="btn">BACK TO TUTORS</a>
    </div>
  {/if}
</div>

<style>
  .tutor-profile {
    padding: var(--space-5) 0;
  }

  .tutor-header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--space-5);
    padding-bottom: var(--space-5);
    border-bottom: 2px solid var(--color-black);
  }

  .tutor-avatar {
    width: 150px;
    height: 150px;
    border: 2px solid var(--color-black);
    overflow: hidden;
  }

  .tutor-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .tutor-languages {
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
  }

  .language {
    font-weight: 600;
  }

  .tutor-rating {
    margin-bottom: var(--space-2);
  }

  .stars {
    color: var(--color-primary);
    font-size: var(--text-xl);
    letter-spacing: 0.1em;
  }

  .review-count {
    font-size: var(--text-base);
    color: var(--color-gray-600);
    margin-left: var(--space-1);
  }

  .tutor-price .price-amount {
    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: 700;
  }

  .tutor-body {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: var(--space-5);
    margin-top: var(--space-5);
  }

  .tutor-description {
    margin-bottom: var(--space-4);
  }

  .tutor-description p {
    font-size: var(--text-lg);
  }

  .specialty-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin-top: var(--space-2);
  }

  .specialty-tag {
    display: inline-block;
    padding: var(--space-2) var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 700;
    text-transform: uppercase;
    border: 2px solid var(--color-black);
  }

  .tutor-booking {
    border: 2px solid var(--color-black);
    padding: var(--space-4);
  }

  .booking-days {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    margin: var(--space-3) 0;
  }

  .day-btn {
    padding: var(--space-2);
    font-size: var(--text-sm);
    background-color: var(--color-primary);
    border-color: var(--color-black);
  }

  .day-btn.active {
    background-color: var(--color-primary);
    color: var(--color-black);
    border-color: var(--color-black);
  }

  .booking-slots {
    margin-bottom: var(--space-4);
  }

  .booking-slots h3 {
    font-size: var(--text-base);
    margin-bottom: var(--space-2);
  }

  .time-slots {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-2);
  }

  .slot-btn {
    padding: var(--space-2);
    font-size: var(--text-sm);
    text-align: center;
    background-color: var(--color-primary);
    border-color: var(--color-black);
  }

  .slot-btn.active {
    background-color: var(--color-primary);
    color: var(--color-black);
    border-color: var(--color-black);
  }

  .book-btn {
    width: 100%;
  }

  .book-btn[disabled] {
    background-color: var(--color-gray-300);
    border-color: var(--color-gray-300);
    color: var(--color-gray-600);
    cursor: not-allowed;
  }

  .not-found {
    padding: var(--space-6) 0;
    text-align: center;
  }

  @media (max-width: 768px) {
    .tutor-header {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .tutor-avatar {
      margin: 0 auto var(--space-3);
    }

    .tutor-body {
      grid-template-columns: 1fr;
    }
  }
</style>
