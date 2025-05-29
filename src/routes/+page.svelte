<script lang="ts">
  import { languages } from '$lib/data/languages';
  
  // Select top 4 languages for the featured section
  const featuredLanguages = languages.slice(0, 4);
</script>

<svelte:head>
  <title>LINGUA - Learn Any Language with Expert Tutors</title>
</svelte:head>

<section class="hero">
  <div class="container">
    <div class="hero-content">
      <h1>
        LEARN<br>
        ANY LANGUAGE<br>
        <span class="highlight">YOUR WAY.</span>
      </h1>
      
      <p class="hero-description">
        Connect with expert language tutors for personalized 1-on-1 lessons.
        Learn at your own pace, on your own schedule.
      </p>
      
      <div class="hero-buttons">
        <a href="/tutors" class="btn primary">FIND A TUTOR</a>
        <a href="/signup" class="btn">GET STARTED</a>
      </div>
      
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">10+</span>
          <span class="stat-label">LANGUAGES</span>
        </div>
        <div class="stat">
          <span class="stat-number">1,000+</span>
          <span class="stat-label">TUTORS</span>
        </div>
        <div class="stat">
          <span class="stat-number">50,000+</span>
          <span class="stat-label">STUDENTS</span>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="featured">
  <div class="container">
    <h2>POPULAR LANGUAGES</h2>
    
    <div class="language-grid">
      {#each featuredLanguages as language}
        <a href={`/languages/${language.id}`} class="language-card">
          <div class="language-image">
            <img src={language.image} alt={language.name} />
          </div>
          
          <div class="language-info">
            <h3 class="language-name">{language.name}</h3>
            <p class="language-native">{language.nativeName}</p>
            <div class="language-meta">
              <span class="tutors-count">{language.tutorsCount} tutors</span>
            </div>
          </div>
        </a>
      {/each}
    </div>
    
    <div class="featured-cta">
      <a href="/languages" class="btn">VIEW ALL LANGUAGES</a>
    </div>
  </div>
</section>

<section class="how-it-works">
  <div class="container">
    <h2>HOW IT WORKS</h2>
    
    <div class="steps-grid">
      <div class="step">
        <div class="step-number">01</div>
        <h3 class="step-title">CHOOSE A LANGUAGE</h3>
        <p class="step-description">
          Select from over 10 languages to start your learning journey.
        </p>
      </div>
      
      <div class="step">
        <div class="step-number">02</div>
        <h3 class="step-title">FIND A TUTOR</h3>
        <p class="step-description">
          Browse profiles and reviews to find the perfect tutor for your needs.
        </p>
      </div>
      
      <div class="step">
        <div class="step-number">03</div>
        <h3 class="step-title">BOOK A LESSON</h3>
        <p class="step-description">
          Schedule a lesson at a time that works for you.
        </p>
      </div>
      
      <div class="step">
        <div class="step-number">04</div>
        <h3 class="step-title">START LEARNING</h3>
        <p class="step-description">
          Connect with your tutor and start making progress immediately.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="testimonials">
  <div class="container">
    <h2>WHAT OUR STUDENTS SAY</h2>
    
    <div class="testimonial-grid">
      <div class="testimonial">
        <div class="testimonial-rating">★★★★★</div>
        <p class="testimonial-text">
          "I've tried many language learning apps, but nothing compares to learning
          with a real tutor. My Spanish has improved dramatically in just a few months."
        </p>
        <div class="testimonial-author">SARAH K.</div>
      </div>
      
      <div class="testimonial">
        <div class="testimonial-rating">★★★★★</div>
        <p class="testimonial-text">
          "The flexibility of scheduling lessons around my busy work schedule
          has made it possible for me to finally learn Japanese."
        </p>
        <div class="testimonial-author">MICHAEL T.</div>
      </div>
      
      <div class="testimonial">
        <div class="testimonial-rating">★★★★★</div>
        <p class="testimonial-text">
          "I love how my tutor customizes each lesson to focus on what I need
          most. My French has improved more in 2 months than in 2 years of classes."
        </p>
        <div class="testimonial-author">JAMES L.</div>
      </div>
    </div>
  </div>
</section>

<section class="cta">
  <div class="container">
    <div class="cta-content">
      <h2>READY TO START YOUR LANGUAGE JOURNEY?</h2>
      <p>Join thousands of students learning languages their way.</p>
      <a href="/signup" class="btn primary">GET STARTED NOW</a>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: var(--space-6) 0;
    border-bottom: 2px solid var(--color-black);
  }
  
  .hero-content {
    max-width: 800px;
  }
  
  h1 {
    font-size: var(--text-6xl);
    line-height: 1.1;
    margin-bottom: var(--space-4);
  }
  
  .highlight {
    color: var(--color-primary);
  }
  
  .hero-description {
    font-size: var(--text-xl);
    max-width: 600px;
    margin-bottom: var(--space-5);
  }
  
  .hero-buttons {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-5);
  }
  
  .hero-stats {
    display: flex;
    gap: var(--space-5);
  }
  
  .stat {
    display: flex;
    flex-direction: column;
  }
  
  .stat-number {
    font-family: var(--font-mono);
    font-size: var(--text-3xl);
    font-weight: 700;
  }
  
  .stat-label {
    font-size: var(--text-xs);
    font-weight: 700;
  }
  
  section {
    padding: var(--space-6) 0;
    border-bottom: 2px solid var(--color-black);
  }
  
  .language-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: var(--space-4);
    margin: var(--space-4) 0;
  }
  
  .language-card {
    display: block;
    border: 2px solid var(--color-black);
    overflow: hidden;
    transition: transform var(--transition-fast);
    border-bottom-width: 2px;
  }
  
  .language-card:hover {
    transform: translateY(-4px);
  }
  
  .language-image {
    height: 160px;
    overflow: hidden;
    border-bottom: 2px solid var(--color-black);
  }
  
  .language-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .language-info {
    padding: var(--space-3);
  }
  
  .language-name {
    margin-bottom: var(--space-1);
  }
  
  .language-native {
    font-style: italic;
    margin-bottom: var(--space-2);
    color: var(--color-gray-600);
  }
  
  .language-meta {
    font-size: var(--text-sm);
    color: var(--color-gray-700);
  }
  
  .featured-cta {
    text-align: center;
    margin-top: var(--space-5);
  }
  
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-4);
    margin: var(--space-4) 0;
  }
  
  .step {
    padding: var(--space-4);
    border: 2px solid var(--color-black);
  }
  
  .step-number {
    font-family: var(--font-mono);
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--space-2);
  }
  
  .step-title {
    margin-bottom: var(--space-2);
  }
  
  .testimonial-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--space-4);
    margin: var(--space-4) 0;
  }
  
  .testimonial {
    padding: var(--space-4);
    border: 2px solid var(--color-black);
  }
  
  .testimonial-rating {
    color: var(--color-primary);
    font-size: var(--text-xl);
    margin-bottom: var(--space-2);
  }
  
  .testimonial-text {
    font-size: var(--text-lg);
    margin-bottom: var(--space-3);
  }
  
  .testimonial-author {
    font-family: var(--font-mono);
    font-weight: 700;
  }
  
  .cta {
    background-color: var(--color-black);
    color: var(--color-white);
    padding: var(--space-7) 0;
    text-align: center;
  }
  
  .cta h2 {
    color: var(--color-white);
    margin-bottom: var(--space-3);
  }
  
  .cta p {
    font-size: var(--text-xl);
    margin-bottom: var(--space-4);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: var(--text-5xl);
    }
    
    .hero-buttons {
      flex-direction: column;
    }
    
    .hero-stats {
      flex-direction: column;
      gap: var(--space-3);
    }
  }
  
  @media (max-width: 480px) {
    h1 {
      font-size: var(--text-4xl);
    }
    
    .hero-description {
      font-size: var(--text-lg);
    }
  }
</style>