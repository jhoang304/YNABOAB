<template>
  <div id="app">
    <AppHeader />
    <AppNavigation />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/common/AppHeader.vue'
import AppNavigation from './components/common/AppNavigation.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-areas: 
    "header"
    "nav"
    "main";
}

.main-content {
  grid-area: main;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 768px) {
  #app {
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
      "nav header"
      "nav main";
  }
  
  .main-content {
    padding: 2rem;
  }
}
</style>