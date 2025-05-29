<script lang="ts">
  import { page } from '$app/stores';

  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  // Close mobile menu when route changes
  $: {
    if ($page.url.pathname) {
      isMenuOpen = false;
    }
  }
</script>

<header class="header">
  <div class="container">
    <div class="header-content">
      <a href="/" class="logo" aria-label="Go to homepage">
        <span class="logo-text">LINGUA</span>
      </a>
      
      <button class="menu-toggle" aria-label="Toggle menu" on:click={toggleMenu}>
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      
      <nav class="nav" class:is-open={isMenuOpen}>
        <ul class="nav-list">
          <li class="nav-item">
            <a 
              href="/tutors" 
              class="nav-link"
              class:active={$page.url.pathname === '/tutors'}
            >
              FIND TUTORS
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/languages" 
              class="nav-link"
              class:active={$page.url.pathname === '/languages'}
            >
              LANGUAGES
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/pricing" 
              class="nav-link"
              class:active={$page.url.pathname === '/pricing'}
            >
              PRICING
            </a>
          </li>
          <li class="nav-item">
            <a 
              href="/how-it-works" 
              class="nav-link"
              class:active={$page.url.pathname === '/how-it-works'}
            >
              HOW IT WORKS
            </a>
          </li>
        </ul>
        
        <div class="auth-buttons">
          <a href="/login" class="btn login">LOG IN</a>
          <a href="/signup" class="btn signup primary">SIGN UP</a>
        </div>
      </nav>
    </div>
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--color-white);
    border-bottom: 2px solid var(--color-black);
    z-index: 100;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }
  
  .logo {
    display: block;
    border-bottom: none;
  }
  
  .logo-text {
    font-family: var(--font-mono);
    font-size: var(--text-2xl);
    font-weight: 700;
    letter-spacing: -0.05em;
    color: var(--color-black);
  }
  
  .nav {
    display: flex;
    align-items: center;
  }
  
  .nav-list {
    display: flex;
    list-style: none;
    margin-right: var(--space-4);
  }
  
  .nav-item {
    margin-right: var(--space-4);
  }
  
  .nav-link {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-black);
    text-transform: uppercase;
    border-bottom: none;
    position: relative;
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background-color: var(--color-primary);
    transition: width var(--transition-normal);
  }
  
  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }
  
  .auth-buttons {
    display: flex;
    gap: var(--space-3);
  }
  
  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    background: transparent;
    border: none;
    padding: 0;
  }
  
  .menu-toggle:hover {
    background: transparent;
  }
  
  .bar {
    width: 100%;
    height: 2px;
    background-color: var(--color-black);
    transition: transform var(--transition-normal);
  }
  
  @media (max-width: 768px) {
    .menu-toggle {
      display: flex;
      z-index: 101;
    }
    
    .nav {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 300px;
      background-color: var(--color-white);
      border-left: 2px solid var(--color-black);
      display: flex;
      flex-direction: column;
      padding: 100px var(--space-4) var(--space-4);
      transform: translateX(100%);
      transition: transform var(--transition-normal);
      z-index: 100;
    }
    
    .nav.is-open {
      transform: translateX(0);
    }
    
    .nav-list {
      flex-direction: column;
      margin-right: 0;
      margin-bottom: var(--space-5);
    }
    
    .nav-item {
      margin-right: 0;
      margin-bottom: var(--space-3);
    }
    
    .auth-buttons {
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .is-open ~ .menu-toggle .bar:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    
    .is-open ~ .menu-toggle .bar:nth-child(2) {
      opacity: 0;
    }
    
    .is-open ~ .menu-toggle .bar:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  }
</style>