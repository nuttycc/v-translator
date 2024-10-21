<template>
  <div>
    <h2>Translation Form</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="token">Token:</label>
        <input type="text" id="token" v-model="token" required />
      </div>
      <div>
        <label for="text">Text to Translate:</label>
        <textarea id="text" v-model="text" required></textarea>
      </div>
      <button type="submit">Translate</button>
    </form>
    <div v-if="translation">
      <h3>Translation Result:</h3>
      <p>{{ translation }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const token = ref('')
const text = ref('')
const translation = ref('')

const handleSubmit = async () => {
  // Placeholder for translation logic
  translation.value = `Translated: ${text.value}`
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  align-self: flex-start;
}
</style>
