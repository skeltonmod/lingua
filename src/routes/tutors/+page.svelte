<script lang="ts">
  import { tutors, getTutorsByLanguage } from "$lib/data/tutors";
  import TutorCard from "$lib/components/TutorCard.svelte";
  import LanguageFilter from "$lib/components/LanguageFilter.svelte";

  let filteredTutors = tutors;
  let selectedLanguage = "";

  function handleFilter(event: CustomEvent) {
    selectedLanguage = event.detail.language;
    filteredTutors = getTutorsByLanguage(selectedLanguage);
  }
</script>

<svelte:head>
  <title>Find Tutors | LINGUA</title>
</svelte:head>

<div class="container">
  <section class="tutors-header">
    <h1>FIND A TUTOR</h1>
    <p class="tutors-intro">
      Browse our selection of qualified language tutors. Filter by language and
      find the perfect match for your learning goals.
    </p>
  </section>

  <section class="tutors-content">
    <div class="tutors-grid">
      <div class="tutors-filters">
        <LanguageFilter {selectedLanguage} on:filter={handleFilter} />
      </div>

      <div class="tutors-list">
        <div class="tutors-count">
          <p><strong>{filteredTutors.length}</strong> tutors available</p>
        </div>

        {#if filteredTutors.length > 0}
          {#each filteredTutors as tutor (tutor.id)}
            <div class="tutor-card-container">
              <TutorCard {tutor} />
            </div>
          {/each}
        {:else}
          <div class="no-results">
            <p>No tutors found for the selected filters.</p>
            <button
              class="btn reset-filters"
              on:click={() => {
                selectedLanguage = "";
                filteredTutors = tutors;
              }}
            >
              RESET FILTERS
            </button>
          </div>
        {/if}
      </div>
    </div>
  </section>
</div>

<style>
  .tutors-header {
    padding: var(--space-5) 0;
    border-bottom: 2px solid var(--color-black);
  }

  .tutors-intro {
    max-width: 700px;
    font-size: var(--text-lg);
  }

  .tutors-content {
    padding: var(--space-5) 0;
  }

  .tutors-grid {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: var(--space-5);
  }

  .tutors-count {
    margin-bottom: var(--space-3);
    font-size: var(--text-lg);
  }

  .tutor-card-container {
    position: relative;
    margin-bottom: var(--space-3);
  }

  .no-results {
    border: 2px solid var(--color-black);
    padding: var(--space-5);
    text-align: center;
  }

  .no-results p {
    font-size: var(--text-lg);
    margin-bottom: var(--space-3);
  }

  .reset-filters {
    margin-top: var(--space-3);
  }

  @media (max-width: 768px) {
    .tutors-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
