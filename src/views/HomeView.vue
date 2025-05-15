<template>
  <div class="max-w-7xl mx-auto p-6">
    <h1 class="text-4xl font-bold text-teal-600 mb-6 text-center">Welcome to Naissu Shop</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img :src="product.image" alt="Product Image" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ product.name }}</h2>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-teal-600 font-bold mt-2">{{ product.price }}</p>
          <button class="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a great product.',
    price: '$20.00',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is another great product.',
    price: '$30.00',
    image: 'https://via.placeholder.com/150',
  },
  // Add more products as needed
])
</script>
