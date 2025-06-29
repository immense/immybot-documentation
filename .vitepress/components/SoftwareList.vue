<script setup>
import { ref, onMounted } from 'vue'

const softwareList = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('https://corsproxy.io/?https://immybot.azurewebsites.net/api/software')
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)
    const data = await response.json()
    softwareList.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; padding: 10px;">
    <div v-if="loading">Loading…</div>
    <div v-if="error" style="color: red;">❌ Error: {{ error }}</div>

    <ul v-if="!loading && !error" style="list-style: none; padding: 0; margin: 0;">
      <li
        v-for="item in softwareList"
        :key="item.name"
        style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;"
      >
        <img
          v-if="item.icon"
          :src="item.icon"
          alt="icon"
          style="width: 24px; height: 24px; object-fit: contain;"
        />
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>