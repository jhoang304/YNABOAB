<template>
  <div class="dashboard">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-2 text-gray-600">Overview of your financial status</p>
    </div>

    <LoadingSpinner v-if="loading" size="lg" text="Loading dashboard..." />
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Balance Card -->
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500">Current Balance</p>
            <p class="text-2xl font-bold" :class="balanceColorClass">
              {{ formatCurrency(transactionsStore.balance) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Income Card -->
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500">Total Income</p>
            <p class="text-2xl font-bold text-green-600">
              {{ formatCurrency(transactionsStore.totalIncome) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Expenses Card -->
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500">Total Expenses</p>
            <p class="text-2xl font-bold text-red-600">
              {{ formatCurrency(transactionsStore.totalExpenses) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Transactions Count Card -->
      <div class="card p-6">
        <div class="flex items-center">
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-500">Transactions</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ transactionsStore.transactions.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="card">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Transactions</h3>
      </div>
      <div class="p-6">
        <div v-if="recentTransactions.length === 0" class="text-center py-8">
          <p class="text-gray-500">No transactions yet</p>
          <RouterLink to="/transactions" class="btn btn-primary mt-4">
            Add First Transaction
          </RouterLink>
        </div>
        <div v-else class="space-y-4">
          <div 
            v-for="transaction in recentTransactions" 
            :key="transaction.id"
            class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <div class="flex items-center">
              <div class="w-2 h-2 rounded-full mr-3" 
                   :style="{ backgroundColor: transaction.categories?.color || '#6B7280' }"></div>
              <div>
                <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                <p class="text-sm text-gray-500">
                  {{ transaction.categories?.name }} • {{ formatDate(transaction.transaction_date) }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-medium" :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
                {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(Math.abs(transaction.amount)) }}
              </p>
            </div>
          </div>
          <div class="pt-4">
            <RouterLink to="/transactions" class="btn btn-secondary">
              View All Transactions
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useTransactionsStore } from '../stores/transactions'
import { useCategoriesStore } from '../stores/categories'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const transactionsStore = useTransactionsStore()
const categoriesStore = useCategoriesStore()
const loading = ref(true)

const balanceColorClass = computed(() => {
  const balance = transactionsStore.balance
  if (balance > 0) return 'text-green-600'
  if (balance < 0) return 'text-red-600'
  return 'text-gray-900'
})

const recentTransactions = computed(() => 
  transactionsStore.transactions.slice(0, 5)
)

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    await Promise.all([
      transactionsStore.fetchTransactions(),
      categoriesStore.fetchCategories()
    ])
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    loading.value = false
  }
})
</script>