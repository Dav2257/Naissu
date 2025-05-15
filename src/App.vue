<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <main class="min-h-screen bg-gray-50">
    <RouterView />
  </main>
  <Footer />
</template>
