<template>
  <div class="budgets">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Budgets</h1>
      <p class="mt-2 text-gray-600">Plan and track your spending</p>
    </div>

    <LoadingSpinner v-if="loading" size="lg" text="Loading budgets..." />
    
    <div v-else>
      <!-- Current Month Budget Overview -->
      <div class="card mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">
              {{ currentMonthName }} Budget
            </h3>
            <button class="btn btn-primary">
              Create Budget
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div v-if="!budgetsStore.currentMonthBudget" class="text-center py-12">
            <p class="text-gray-500 mb-4">No budget set for this month</p>
            <button class="btn btn-primary">Create Monthly Budget</button>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <p class="text-sm text-gray-500">Total Budget</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatCurrency(budgetsStore.currentMonthBudget.total_budget) }}
              </p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500">Spent</p>
              <p class="text-2xl font-bold text-red-600">
                {{ formatCurrency(0) }}
              </p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-500">Remaining</p>
              <p class="text-2xl font-bold text-green-600">
                {{ formatCurrency(budgetsStore.currentMonthBudget.total_budget) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Budget History -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Budget History</h3>
        </div>
        
        <div class="p-6">
          <div v-if="budgetsStore.budgets.length === 0" class="text-center py-8">
            <p class="text-gray-500">No budgets created yet</p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="budget in budgetsStore.budgets" 
              :key="budget.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div>
                <h4 class="font-medium text-gray-900">
                  {{ formatMonthYear(budget.month_year) }}
                </h4>
                <p class="text-sm text-gray-500">
                  Total Budget: {{ formatCurrency(budget.total_budget) }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button class="btn btn-secondary text-sm">
                  View Details
                </button>
                <button class="btn btn-secondary text-sm">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useBudgetsStore } from '../stores/budgets'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const budgetsStore = useBudgetsStore()
const loading = ref(true)

const currentMonthName = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0)
}

const formatMonthYear = (monthYear) => {
  const [year, month] = monthYear.split('-')
  return new Date(year, month - 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    await budgetsStore.fetchBudgets()
  } catch (error) {
    console.error('Error loading budgets:', error)
  } finally {
    loading.value = false
  }
})
</script>