<script lang="ts">
  let email = '';
  let password = '';
  let confirmPassword = '';
  let name = '';
  let agreeTerms = false;
  
  let passwordError = '';
  let formError = '';
  
  function validatePasswords() {
    if (password !== confirmPassword) {
      passwordError = 'Passwords do not match';
      return false;
    }
    
    if (password.length < 8) {
      passwordError = 'Password must be at least 8 characters';
      return false;
    }
    
    passwordError = '';
    return true;
  }
  
  function handleSubmit() {
    // Reset errors
    formError = '';
    
    // Validate passwords
    if (!validatePasswords()) {
      return;
    }
    
    // Check terms agreement
    if (!agreeTerms) {
      formError = 'You must agree to the Terms of Service';
      return;
    }
    
    // In a real application, this would register the user
    console.log('Signup attempt:', { email, password, name });
    
    // Mock successful registration and redirect
    if (email && password && name) {
      window.location.href = '/';
    }
  }
</script>

<svelte:head>
  <title>Sign Up | LINGUA</title>
</svelte:head>

<div class="container">
  <div class="auth-container">
    <div class="auth-header">
      <h1>SIGN UP</h1>
      <p>Create an account and start your language learning journey today.</p>
    </div>
    
    <form class="auth-form" on:submit|preventDefault={handleSubmit}>
      {#if formError}
        <div class="error-message">
          {formError}
        </div>
      {/if}
      
      <div class="form-group">
        <label for="name">FULL NAME</label>
        <input 
          type="text" 
          id="name" 
          bind:value={name}
          required
          autocomplete="name"
        />
      </div>
      
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
          autocomplete="new-password"
          on:blur={validatePasswords}
        />
      </div>
      
      <div class="form-group">
        <label for="confirm-password">CONFIRM PASSWORD</label>
        <input 
          type="password" 
          id="confirm-password" 
          bind:value={confirmPassword}
          required
          autocomplete="new-password"
          on:blur={validatePasswords}
        />
        
        {#if passwordError}
          <div class="input-error">
            {passwordError}
          </div>
        {/if}
      </div>
      
      <div class="form-group terms-checkbox">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            bind:checked={agreeTerms}
          />
          <span>I AGREE TO THE <a href="/terms" target="_blank">TERMS OF SERVICE</a></span>
        </label>
      </div>
      
      <button type="submit" class="btn primary signup-btn">SIGN UP</button>
      
      <div class="auth-switch">
        <p>Already have an account? <a href="/login">Log in</a></p>
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
  
  .error-message {
    background-color: rgba(255, 0, 0, 0.1);
    border: 2px solid var(--color-error);
    color: var(--color-error);
    padding: var(--space-3);
    margin-bottom: var(--space-4);
    font-weight: 700;
  }
  
  .input-error {
    color: var(--color-error);
    font-size: var(--text-sm);
    margin-top: var(--space-1);
    font-weight: 700;
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
  
  .signup-btn {
    width: 100%;
    margin-top: var(--space-3);
  }
  
  .auth-switch {
    margin-top: var(--space-4);
    text-align: center;
  }
</style>