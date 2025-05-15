<template>
  <li class="flex justify-between py-3 items-center">
    <div class="flex items-center space-x-4">
      <img :src="item.image" alt="" class="w-12 h-12 rounded-lg object-cover" />
      <div>
        <p class="font-semibold text-gray-800">{{ item.title }}</p>
        <p class="text-gray-500 text-sm">Quantity: {{ item.quantity }}</p>
      </div>
    </div>
    <p class="font-semibold text-teal-700">$ {{ (item.price * item.quantity).toFixed(2) }}</p>
    <button @click="removeItem" class="ml-4 text-red-600 hover:text-red-800">
      Remove
    </button>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  item: {
    id: number
    title: string
    price: number
    image: string
    quantity: number
  }
}>()

function removeItem() {
  // Emit an event to remove the item from the cart
  // This function should be implemented in the parent component
  // to handle the removal logic
}
</script>

<style scoped>
/* Add any specific styles for the CartItem component here */
</style>