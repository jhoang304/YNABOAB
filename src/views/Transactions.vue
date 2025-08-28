<template>
  <div class="transactions">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Transactions</h1>
      <p class="mt-2 text-gray-600">Track your income and expenses</p>
    </div>

    <LoadingSpinner v-if="loading" size="lg" text="Loading transactions..." />
    
    <div v-else>
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">All Transactions</h3>
            <button class="btn btn-primary">
              Add Transaction
            </button>
          </div>
        </div>
        
        <div class="p-6">
          <div v-if="transactionsStore.transactions.length === 0" class="text-center py-12">
            <p class="text-gray-500 mb-4">No transactions yet</p>
            <button class="btn btn-primary">Add Your First Transaction</button>
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="transaction in transactionsStore.transactions" :key="transaction.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">
                      {{ transaction.description }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div 
                        class="w-3 h-3 rounded-full mr-2"
                        :style="{ backgroundColor: transaction.categories?.color || '#6B7280' }"
                      ></div>
                      <span class="text-sm text-gray-900">
                        {{ transaction.categories?.name || 'No Category' }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(transaction.transaction_date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="text-sm font-medium"
                      :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'"
                    >
                      {{ transaction.type === 'income' ? '+' : '-' }}{{ formatCurrency(Math.abs(transaction.amount)) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="text-primary-600 hover:text-primary-900 mr-3">
                      Edit
                    </button>
                    <button class="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTransactionsStore } from '../stores/transactions'
import { useCategoriesStore } from '../stores/categories'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const transactionsStore = useTransactionsStore()
const categoriesStore = useCategoriesStore()
const loading = ref(true)

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
    console.error('Error loading transactions:', error)
  } finally {
    loading.value = false
  }
})
</script>