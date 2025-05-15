<template>
  <div class="max-w-7xl mx-auto p-6 flex flex-col">
    <h1 class="text-3xl font-bold mb-6 text-teal-600 text-center">Modern Online Shop</h1>

    <!-- Product List -->
    <section class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <article
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
      >
        <img :src="product.image" :alt="product.title" class="object-cover h-48 w-full" />
        <div class="p-4 flex flex-col flex-grow">
          <h2 class="font-semibold text-lg mb-2 text-gray-800">{{ product.title }}</h2>
          <p class="text-teal-700 font-bold text-xl mb-4">$ {{ product.price.toFixed(2) }}</p>
          <button
            @click="addToCart(product.id)"
            class="mt-auto bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
          >
            Add to cart
          </button>
        </div>
      </article>
    </section>

    <!-- Cart -->
    <aside class="mt-10 bg-white rounded-xl shadow-md p-6 max-w-md self-center w-full">
      <h3 class="font-semibold text-2xl mb-4 text-gray-900">Your Cart</h3>
      <div v-if="cartItems.length === 0" class="text-gray-500 text-center py-6">
        Your cart is empty
      </div>
      <ul v-else class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        <li v-for="item in cartItems" :key="item.id" class="flex justify-between py-3 items-center">
          <div class="flex items-center space-x-4">
            <img :src="item.image" alt="" class="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p class="font-semibold text-gray-800">{{ item.title }}</p>
              <p class="text-gray-500 text-sm">Quantity: {{ item.quantity }}</p>
            </div>
          </div>
          <p class="font-semibold text-teal-700">$ {{ (item.price * item.quantity).toFixed(2) }}</p>
        </li>
      </ul>

      <div v-if="cartItems.length > 0" class="mt-6 flex justify-between items-center">
        <span class="text-xl font-bold text-gray-900">Total:</span>
        <span class="text-xl font-extrabold text-teal-700"> $ {{ totalPrice.toFixed(2) }} </span>
      </div>

      <button
        :disabled="cartItems.length === 0 || checkingOut"
        @click="checkout"
        class="mt-6 w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-300 text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
      >
        <span v-if="!checkingOut">Checkout</span>
        <span v-else>Processing...</span>
      </button>

      <p v-if="checkoutMessage" class="mt-4 text-center text-teal-800 font-semibold">
        {{ checkoutMessage }}
      </p>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type Product = {
  id: number
  title: string
  price: number
  image: string
}

type CartItem = Product & { quantity: number }

const products: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1512499617640-c2f999055064?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Smart Watch',
    price: 144.99,
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'Retro Camera',
    price: 219.5,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'Gaming Mouse',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1580906856274-8a2690b3ee9a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    title: 'Bluetooth Speaker',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=400&q=80',
  },
]

const cart = ref<Record<number, number>>({})

function addToCart(id: number) {
  if (cart.value[id]) {
    cart.value[id]++
  } else {
    cart.value[id] = 1
  }
}

const cartItems = computed<CartItem[]>(() => {
  return Object.entries(cart.value)
    .map(([idStr, qty]) => {
      const id = parseInt(idStr)
      const product = products.find((p) => p.id === id)
      if (!product) return null
      return { ...product, quantity: qty }
    })
    .filter((item): item is CartItem => item !== null)
})

const totalPrice = computed(() =>
  cartItems.value.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0),
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
    Object.keys(cart.value).forEach((key) => delete cart.value[parseInt(key)])
  }, 1500)
}
</script>

<style scoped>
</style>