<template>
  <header class="bg-teal-600 text-white py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center px-6">
      <h1 class="text-2xl font-bold">Naissu Shop</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><router-link to="/" class="hover:underline">Home</router-link></li>
          <li><router-link to="/about" class="hover:underline">About</router-link></li>
          <li><router-link to="/create" class="hover:underline">Create</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// No additional script needed for this component
</script>
