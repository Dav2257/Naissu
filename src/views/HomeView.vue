<script setup lang="ts">
import { reactive, computed, ref } from 'vue'

const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 89.99,
    image:
      'https://images.unsplash.com/photo-1512499617640-c2f999055064?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 144.99,
    image:
      'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Retro Camera',
    price: 219.5,
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Gaming Mouse',
    price: 49.99,
    image:
      'https://images.unsplash.com/photo-1580906856274-8a2690b3ee9a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    title: 'Bluetooth Speaker',
    price: 79.99,
    image:
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
  },
]

const cart = reactive({})

function addToCart(id: number) {
  if (cart[id]) {
    cart[id]++
  } else {
    cart[id] = 1
  }
}

const cartItems = computed(() => {
  return Object.entries(cart).map(([id, qty]) => {
    const product = products.find((p) => p.id === parseInt(id))
    return { ...product, quantity: qty }
  })
})

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
)

const checkoutMessage = ref('')
const checkingOut = ref(false)

function checkout() {
  if (cartItems.value.length === 0) return
  checkingOut.value = true
  checkoutMessage.value = ''
  setTimeout(() => {
    checkingOut.value = false
    checkoutMessage.value = 'Thank you for your purchase! Your order has been processed.'
    for (const id in cart) {
      delete cart[id]
    }
  }, 1500)
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-center">Modern Online Store</h1>

    <!-- Product List -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in products"
        :key="product.id"
        class="border rounded-lg shadow-md p-4 flex flex-col items-center"
      >
        <img :src="product.image" alt="" class="w-full h-48 object-cover rounded-md mb-4" />
        <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-gray-600 mb-4">${{ product.price.toFixed(2) }}</p>
        <button
          @click="addToCart(product.id)"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <!-- Cart -->
    <div class="mt-10">
      <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
      <div v-if="cartItems.length === 0" class="text-gray-500">Your cart is empty.</div>
      <div v-else>
        <ul>
          <li
            v-for="item in cartItems"
            :key="item.id"
            class="flex justify-between items-center border-b py-2"
          >
            <span>{{ item.title }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>
        <div class="mt-4 font-bold text-lg">Total: ${{ totalPrice.toFixed(2) }}</div>
        <button
          @click="checkout"
          :disabled="checkingOut"
          class="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600 disabled:opacity-50"
        >
          Checkout
        </button>
        <p v-if="checkoutMessage" class="mt-4 text-green-600">{{ checkoutMessage }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
