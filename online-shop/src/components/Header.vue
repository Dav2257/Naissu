<template>
  <header class="bg-teal-600 text-white p-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">Online Shop</h1>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/" class="hover:underline">Home</router-link>
          </li>
          <li>
            <router-link to="/about" class="hover:underline">About</router-link>
          </li>
          <li>
            <router-link to="/create" class="hover:underline">Create Event</router-link>
          </li>
          <li>
            <router-link to="/edit/:id" class="hover:underline">Edit Event</router-link>
          </li>
        </ul>
      </nav>
      <div class="relative">
        <router-link to="/cart" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18l-1.5 9H5.25L3 3z" />
          </svg>
          <span class="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">{{ cartItemCount }}</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const cartItemCount = computed(() => {
  return Object.values(store.state.cart).reduce((total, qty) => total + qty, 0)
})
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>