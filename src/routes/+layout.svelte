<script lang="ts">
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import initWorker from '$lib/data/sqlite/loadWorker';
  import { onMount } from 'svelte';

  onMount(() => {
    initWorker();
  });
</script>

<Header />

<main class="main-content">
  <slot />
</main>

<Footer />

<style>
  .main-content {
    padding-top: 80px; /* Same as header height */
    min-height: calc(100vh - 80px);
  }
</style>