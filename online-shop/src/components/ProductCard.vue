<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <img :src="product.image" :alt="product.title" class="object-cover h-48 w-full" />
    <div class="p-4">
      <h2 class="font-semibold text-lg text-gray-800">{{ product.title }}</h2>
      <p class="text-teal-700 font-bold text-xl mb-2">$ {{ product.price.toFixed(2) }}</p>
      <button
        @click="addToCart"
        class="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  product: {
    id: number
    title: string
    price: number
    image: string
  }
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', id: number): void
}>()

function addToCart() {
  emit('add-to-cart', props.product.id)
}
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>