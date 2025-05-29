<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 
    'Portuguese', 'Russian', 'Japanese', 'Chinese', 'Korean'
  ];
  
  const resources = [
    { name: 'Blog', url: '/blog' },
    { name: 'Help Center', url: '/help' },
    { name: 'Terms of Service', url: '/terms' },
    { name: 'Privacy Policy', url: '/privacy' }
  ];
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <span class="logo-text">LINGUA</span>
        <p class="tagline">Learn any language with expert tutors.</p>
        <p class="copyright">&copy; {currentYear} LINGUA. All rights reserved.</p>
      </div>
      
      <div class="footer-col">
        <h4>Languages</h4>
        <ul class="footer-list">
          {#each languages as language}
            <li><a href={`/languages/${language.toLowerCase()}`}>{language}</a></li>
          {/each}
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Company</h4>
        <ul class="footer-list">
          <li><a href="/about">About Us</a></li>
          <li><a href="/careers">Careers</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/become-tutor">Become a Tutor</a></li>
        </ul>
      </div>
      
      <div class="footer-col">
        <h4>Resources</h4>
        <ul class="footer-list">
          {#each resources as resource}
            <li><a href={resource.url}>{resource.name}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-black);
    color: var(--color-white);
    padding: var(--space-6) 0;
    margin-top: var(--space-8);
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: var(--space-5);
  }
  
  .logo-text {
    display: block;
    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: 700;
    letter-spacing: -0.05em;
    color: var(--color-white);
    margin-bottom: var(--space-3);
  }
  
  .tagline {
    font-size: var(--text-lg);
    margin-bottom: var(--space-4);
  }
  
  .copyright {
    font-size: var(--text-sm);
    color: var(--color-gray-400);
  }
  
  .footer h4 {
    font-size: var(--text-lg);
    color: var(--color-white);
    margin-bottom: var(--space-3);
    border-bottom: 2px solid var(--color-primary);
    padding-bottom: var(--space-2);
    display: inline-block;
  }
  
  .footer-list {
    list-style: none;
  }
  
  .footer-list li {
    margin-bottom: var(--space-2);
  }
  
  .footer-list a {
    color: var(--color-gray-300);
    border-bottom: none;
    transition: color var(--transition-fast);
  }
  
  .footer-list a:hover {
    color: var(--color-white);
  }
  
  @media (max-width: 768px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
    }
    
    .footer-col:first-child {
      grid-column: 1 / -1;
    }
  }
  
  @media (max-width: 480px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }
  }
</style>