<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let languages = [
    { id: 'english', name: 'English' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'french', name: 'French' },
    { id: 'german', name: 'German' },
    { id: 'italian', name: 'Italian' },
    { id: 'portuguese', name: 'Portuguese' },
    { id: 'russian', name: 'Russian' },
    { id: 'japanese', name: 'Japanese' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'korean', name: 'Korean' }
  ];
  
  export let selectedLanguage = '';
  
  const dispatch = createEventDispatcher();
  
  function handleLanguageChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedLanguage = target.value;
    dispatch('filter', { language: selectedLanguage });
  }
  
  let isFilterExpanded = false;
  
  function toggleFilter() {
    isFilterExpanded = !isFilterExpanded;
  }
</script>

<div class="filter-container">
  <button class="filter-toggle" on:click={toggleFilter}>
    FILTER BY LANGUAGE
    <span class="toggle-icon">{isFilterExpanded ? '−' : '+'}</span>
  </button>
  
  <div class="filter-content" class:is-expanded={isFilterExpanded}>
    <div class="select-container">
      <label for="language-select">Language</label>
      <select 
        id="language-select" 
        bind:value={selectedLanguage}
        on:change={handleLanguageChange}
      >
        <option value="">All Languages</option>
        {#each languages as language}
          <option value={language.id}>{language.name}</option>
        {/each}
      </select>
    </div>
    
    <div class="language-grid">
      {#each languages as language}
        <button 
          class="language-btn"
          class:active={selectedLanguage === language.id}
          on:click={() => {
            selectedLanguage = language.id;
            dispatch('filter', { language: language.id });
          }}
        >
          {language.name}
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .filter-container {
    margin-bottom: var(--space-4);
    border: 2px solid var(--color-black);
  }
  
  .filter-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: var(--space-3);
    text-align: left;
    border: none;
    border-bottom: 2px solid transparent;
  }
  
  .filter-toggle:hover {
    background-color: var(--color-gray-100);
  }
  
  .toggle-icon {
    font-size: var(--text-2xl);
    line-height: 1;
  }
  
  .filter-content {
    height: 0;
    overflow: hidden;
    transition: height var(--transition-normal);
  }
  
  .filter-content.is-expanded {
    height: auto;
    padding: var(--space-3);
    border-top: 2px solid var(--color-black);
  }
  
  .select-container {
    margin-bottom: var(--space-3);
  }
  
  .language-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: var(--space-2);
  }
  
  .language-btn {
    padding: var(--space-2);
    text-align: center;
    font-size: var(--text-sm);
    background-color: var(--color-white);
    border: 1px solid var(--color-black);
    color: var(--color-black);
  }
  
  .language-btn:hover {
    background-color: var(--color-gray-100);
  }
  
  .language-btn.active {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-color: var(--color-primary);
  }
  
  .language-btn.active:hover {
    background-color: var(--color-primary-hover);
  }
  
  @media (max-width: 480px) {
    .language-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>