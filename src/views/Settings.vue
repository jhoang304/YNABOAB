<template>
  <div class="settings">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
      <p class="mt-2 text-gray-600">Manage your account and preferences</p>
    </div>

    <div class="space-y-6">
      <!-- Account Information -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Account Information</h3>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                :value="authStore.user?.email" 
                readonly
                class="input bg-gray-50"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input 
                type="text" 
                :value="authStore.user?.id" 
                readonly
                class="input bg-gray-50 font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Management -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">Categories</h3>
            <button class="btn btn-primary">
              Add Category
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <LoadingSpinner v-if="categoriesStore.loading" text="Loading categories..." />
          
          <div v-else-if="categoriesStore.categories.length === 0" class="text-center py-8">
            <p class="text-gray-500 mb-4">No categories created yet</p>
            <button class="btn btn-primary">Create Your First Category</button>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div 
              v-for="category in categoriesStore.categories" 
              :key="category.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center">
                <div 
                  class="w-4 h-4 rounded-full mr-3"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <span class="font-medium text-gray-900">{{ category.name }}</span>
              </div>
              <div class="flex space-x-2">
                <button class="text-primary-600 hover:text-primary-900 text-sm">
                  Edit
                </button>
                <button class="text-red-600 hover:text-red-900 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- App Preferences -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Preferences</h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-900">Default Currency</h4>
              <p class="text-sm text-gray-500">Choose your default currency for transactions</p>
            </div>
            <select class="input w-32">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-900">Date Format</h4>
              <p class="text-sm text-gray-500">Choose how dates are displayed</p>
            </div>
            <select class="input w-40">
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-900">Dark Mode</h4>
              <p class="text-sm text-gray-500">Switch to dark theme</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-red-900">Danger Zone</h3>
        </div>
        
        <div class="p-6 space-y-4">
          <div class="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 class="font-medium text-red-900">Delete Account</h4>
              <p class="text-sm text-red-700">Permanently delete your account and all data</p>
            </div>
            <button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Delete Account
            </button>
          </div>
          
          <div class="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
            <div>
              <h4 class="font-medium text-orange-900">Export Data</h4>
              <p class="text-sm text-orange-700">Download all your data as JSON</p>
            </div>
            <button class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCategoriesStore } from '../stores/categories'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()

onMounted(async () => {
  try {
    await categoriesStore.fetchCategories()
  } catch (error) {
    console.error('Error loading categories:', error)
  }
})
</script>