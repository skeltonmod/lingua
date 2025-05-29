<script lang="ts">
  let email = '';
  let password = '';
  let rememberMe = false;
  
  function handleSubmit() {
    // In a real application, this would validate and send credentials to a server
    console.log('Login attempt:', { email, password, rememberMe });
    
    // Mock successful login and redirect
    if (email && password) {
      window.location.href = '/';
    }
  }
</script>

<svelte:head>
  <title>Log In | LINGUA</title>
</svelte:head>

<div class="container">
  <div class="auth-container">
    <div class="auth-header">
      <h1>LOG IN</h1>
      <p>Welcome back! Log in to continue your language learning journey.</p>
    </div>
    
    <form class="auth-form" on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="email">EMAIL</label>
        <input 
          type="email" 
          id="email" 
          bind:value={email}
          required
          autocomplete="email"
        />
      </div>
      
      <div class="form-group">
        <label for="password">PASSWORD</label>
        <input 
          type="password" 
          id="password" 
          bind:value={password}
          required
          autocomplete="current-password"
        />
      </div>
      
      <div class="form-group remember-me">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            bind:checked={rememberMe}
          />
          <span>REMEMBER ME</span>
        </label>
        <a href="/forgot-password" class="forgot-link">Forgot password?</a>
      </div>
      
      <button type="submit" class="btn primary login-btn">LOG IN</button>
      
      <div class="auth-switch">
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </form>
  </div>
</div>

<style>
  .auth-container {
    max-width: 500px;
    margin: 0 auto;
    padding: var(--space-5) 0;
  }
  
  .auth-header {
    margin-bottom: var(--space-5);
    text-align: center;
  }
  
  .auth-header p {
    font-size: var(--text-lg);
  }
  
  .auth-form {
    border: 2px solid var(--color-black);
    padding: var(--space-5);
  }
  
  .form-group {
    margin-bottom: var(--space-4);
  }
  
  .remember-me {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .checkbox-label input {
    width: auto;
    margin-right: var(--space-2);
  }
  
  .forgot-link {
    font-size: var(--text-sm);
  }
  
  .login-btn {
    width: 100%;
    margin-top: var(--space-3);
  }
  
  .auth-switch {
    margin-top: var(--space-4);
    text-align: center;
  }
</style>