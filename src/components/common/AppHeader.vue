<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-900">
            YNABOAB
          </h1>
        </div>
        
        <div class="flex items-center space-x-4" v-if="authStore.isAuthenticated">
          <span class="text-sm text-gray-500">
            {{ authStore.user?.email }}
          </span>
          <button
            @click="handleSignOut"
            class="btn btn-secondary text-sm"
            :disabled="authStore.loading"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleSignOut = async () => {
  try {
    await authStore.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Sign out error:', error)
  }
}
</script>