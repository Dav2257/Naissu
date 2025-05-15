<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const place = ref('')
const time = ref('')

const saveData = async () => {
  const newEvent = JSON.stringify({
    name: name.value,
    place: place.value,
    time: Date.parse(time.value) / 1000,
  })

  const response = await fetch('/api/naissu', {
    method: 'POST',
    body: newEvent,
  })
  const data = await response.json()

  router.push('/')
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    <h1 class="text-3xl font-bold mb-6 text-teal-600 text-center">Create New Event</h1>
    <form @submit.prevent="saveData" class="space-y-6">
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Name</label>
        <input
          type="text"
          v-model="name"
          class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Place</label>
        <input
          type="text"
          v-model="place"
          class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <label class="block text-gray-700 font-semibold mb-2">Time</label>
        <input
          type="datetime-local"
          v-model="time"
          class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>
      <div>
        <button
          type="submit"
          class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-teal-300 transition"
        >
          Create Event
        </button>
      </div>
    </form>
  </div>
</template>
