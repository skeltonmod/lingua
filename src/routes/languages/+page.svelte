<script lang="ts">
  import { languages } from '$lib/data/languages';
</script>

<svelte:head>
  <title>Languages | LINGUA</title>
</svelte:head>

<div class="container">
  <section class="languages-header">
    <h1>LANGUAGES</h1>
    <p class="languages-intro">
      Explore all the languages you can learn with our expert tutors.
      From beginner to advanced, we have tutors for every level.
    </p>
  </section>
  
  <section class="languages-grid">
    {#each languages as language}
      <a href={`/languages/${language.id}`} class="language-card">
        <div class="language-image">
          <img src={language.image} alt={language.name} />
          <div class="language-difficulty">{language.difficulty}</div>
        </div>
        
        <div class="language-info">
          <h2 class="language-name">{language.name}</h2>
          <p class="language-native">{language.nativeName}</p>
          
          <div class="language-stats">
            <div class="stat">
              <span class="stat-number">{language.tutorsCount}</span>
              <span class="stat-label">TUTORS</span>
            </div>
            
            <div class="stat">
              <span class="stat-number">{language.studentsCount.toLocaleString()}</span>
              <span class="stat-label">STUDENTS</span>
            </div>
          </div>
          
          <span class="language-link">LEARN MORE</span>
        </div>
      </a>
    {/each}
  </section>
</div>

<style>
  .languages-header {
    padding: var(--space-5) 0;
    border-bottom: 2px solid var(--color-black);
  }
  
  .languages-intro {
    max-width: 700px;
    font-size: var(--text-lg);
  }
  
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-4);
    padding: var(--space-5) 0;
  }
  
  .language-card {
    display: block;
    border: 2px solid var(--color-black);
    overflow: hidden;
    transition: transform var(--transition-fast);
  }
  
  .language-card:hover {
    transform: translateY(-4px);
  }
  
  .language-image {
    height: 200px;
    position: relative;
    overflow: hidden;
    border-bottom: 2px solid var(--color-black);
  }
  
  .language-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .language-difficulty {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    padding: var(--space-1) var(--space-2);
    background-color: var(--color-primary);
    color: var(--color-white);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
  }
  
  .language-info {
    padding: var(--space-3);
  }
  
  .language-name {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-1);
  }
  
  .language-native {
    font-style: italic;
    margin-bottom: var(--space-3);
    color: var(--color-gray-600);
  }
  
  .language-stats {
    display: flex;
    gap: var(--space-4);
    margin-bottom: var(--space-3);
  }
  
  .stat {
    display: flex;
    flex-direction: column;
  }
  
  .stat-number {
    font-family: var(--font-mono);
    font-size: var(--text-xl);
    font-weight: 700;
  }
  
  .stat-label {
    font-size: var(--text-xs);
    font-weight: 700;
  }
  
  .language-link {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 700;
    padding-bottom: var(--space-1);
    border-bottom: 2px solid var(--color-black);
  }
</style>