<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ isSignUp ? 'Create your account' : 'Sign in to your account' }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ isSignUp ? 'Start tracking your finances today' : 'Welcome back to YNABOAB' }}
        </p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div v-if="authStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {{ authStore.error }}
        </div>
        
        <div class="space-y-4">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="form.email"
              class="input"
              placeholder="Email address"
            />
          </div>
          
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="form.password"
              class="input"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <LoadingSpinner v-if="authStore.loading" size="sm" color="white" />
            <span v-else>{{ isSignUp ? 'Sign up' : 'Sign in' }}</span>
          </button>
        </div>

        <div class="text-center">
          <button
            type="button"
            @click="isSignUp = !isSignUp"
            class="text-blue-600 hover:text-blue-500"
          >
            {{ isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const router = useRouter()
const authStore = useAuthStore()

const isSignUp = ref(false)
const form = reactive({
  email: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    if (isSignUp.value) {
      await authStore.signUp(form.email, form.password)
      // For demo purposes, sign in immediately after signup
      // In production, you might want to verify email first
      await authStore.signIn(form.email, form.password)
    } else {
      await authStore.signIn(form.email, form.password)
    }
    
    router.push('/')
  } catch (error) {
    // Error is already handled in the auth store
    console.error('Authentication error:', error)
  }
}
</script>