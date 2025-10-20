<template>
  <div>
    <Header />
    <div class="container">
      <Sidebar />
      <main class="content">
        <router-view />
      </main>
    </div>
    <footer>
      <p>Facebook SPA - Simulación</p>
    </footer>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style src="../CSS/Style.css"></style>
