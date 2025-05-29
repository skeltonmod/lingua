<script lang="ts">
  import { page } from '$app/stores';
  import { getLanguageById } from '$lib/data/languages';
  import { getTutorsByLanguage } from '$lib/data/tutors';
  import TutorCard from '$lib/components/TutorCard.svelte';
  
  $: language = getLanguageById($page.params.id);
  $: tutors = language ? getTutorsByLanguage(language.name) : [];
</script>

<svelte:head>
  <title>{language ? `${language.name} | LINGUA` : 'Language Not Found'}</title>
</svelte:head>

<div class="container">
  {#if language}
    <section class="language-header">
      <div class="language-banner">
        <img src={language.image} alt={language.name} />
      </div>
      
      <div class="language-intro">
        <h1>{language.name.toUpperCase()}</h1>
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
          
          <div class="stat">
            <span class="stat-tag">{language.difficulty}</span>
            <span class="stat-label">DIFFICULTY</span>
          </div>
        </div>
      </div>
    </section>
    
    <section class="language-content">
      <div class="language-description">
        <h2>ABOUT {language.name.toUpperCase()}</h2>
        
        <p>
          Learning {language.name} opens up a world of opportunities for 
          communication, travel, career advancement, and cultural understanding. 
          Whether you're a beginner or looking to refine your skills, our 
          expert tutors can help you reach your goals.
        </p>
        
        <h3>WHY LEARN {language.name.toUpperCase()}?</h3>
        
        <ul class="benefits-list">
          <li>Connect with {language.studentsCount.toLocaleString()}+ speakers worldwide</li>
          <li>Boost your career prospects</li>
          <li>Enhance your travel experiences</li>
          <li>Gain insight into rich cultural traditions</li>
          <li>Challenge your mind and improve cognitive abilities</li>
        </ul>
        
        <div class="cta-box">
          <h3>READY TO START LEARNING {language.name.toUpperCase()}?</h3>
          <a href="/tutors" class="btn primary">FIND A TUTOR</a>
        </div>
      </div>
      
      <div class="language-tutors">
        <h2>{language.name.toUpperCase()} TUTORS</h2>
        
        {#if tutors.length > 0}
          <div class="tutors-list">
            {#each tutors as tutor (tutor.id)}
              <TutorCard {tutor} />
            {/each}
          </div>
          
          <div class="tutors-cta">
            <a href="/tutors" class="btn">VIEW ALL TUTORS</a>
          </div>
        {:else}
          <p class="no-tutors">
            No tutors available for {language.name} at the moment.
            Please check back soon or explore other languages.
          </p>
        {/if}
      </div>
    </section>
  {:else}
    <div class="not-found">
      <h1>LANGUAGE NOT FOUND</h1>
      <p>The language you're looking for doesn't exist or may have been removed.</p>
      <a href="/languages" class="btn">BACK TO LANGUAGES</a>
    </div>
  {/if}
</div>

<style>
  .language-header {
    padding-bottom: var(--space-5);
    border-bottom: 2px solid var(--color-black);
  }
  
  .language-banner {
    height: 300px;
    overflow: hidden;
    border-bottom: 2px solid var(--color-black);
    margin-bottom: var(--space-4);
  }
  
  .language-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .language-native {
    font-size: var(--text-xl);
    font-style: italic;
    margin-bottom: var(--space-4);
  }
  
  .language-stats {
    display: flex;
    gap: var(--space-5);
  }
  
  .stat {
    display: flex;
    flex-direction: column;
  }
  
  .stat-number, .stat-tag {
    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: 700;
  }
  
  .stat-tag {
    color: var(--color-primary);
  }
  
  .stat-label {
    font-size: var(--text-xs);
    font-weight: 700;
  }
  
  .language-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }
  
  .language-description p {
    font-size: var(--text-lg);
    margin-bottom: var(--space-4);
  }
  
  .benefits-list {
    margin: var(--space-3) 0 var(--space-5) var(--space-4);
  }
  
  .benefits-list li {
    font-size: var(--text-lg);
    margin-bottom: var(--space-2);
  }
  
  .cta-box {
    border: 2px solid var(--color-black);
    padding: var(--space-4);
    margin-top: var(--space-5);
    text-align: center;
  }
  
  .cta-box h3 {
    margin-bottom: var(--space-3);
  }
  
  .tutors-list {
    margin-top: var(--space-3);
  }
  
  .tutors-cta {
    margin-top: var(--space-4);
    text-align: center;
  }
  
  .no-tutors {
    border: 2px solid var(--color-black);
    padding: var(--space-4);
    margin-top: var(--space-3);
    text-align: center;
    font-size: var(--text-lg);
  }
  
  .not-found {
    padding: var(--space-6) 0;
    text-align: center;
  }
  
  .not-found p {
    font-size: var(--text-lg);
    margin-bottom: var(--space-4);
  }
  
  @media (max-width: 768px) {
    .language-content {
      grid-template-columns: 1fr;
    }
    
    .language-description {
      margin-bottom: var(--space-4);
    }
  }
</style>