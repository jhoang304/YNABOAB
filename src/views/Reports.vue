<template>
  <div class="reports">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Reports</h1>
      <p class="mt-2 text-gray-600">Analyze your spending patterns</p>
    </div>

    <LoadingSpinner v-if="loading" size="lg" text="Loading reports..." />
    
    <div v-else class="space-y-6">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card p-6">
          <h3 class="text-sm font-medium text-gray-500">This Month Income</h3>
          <p class="text-2xl font-bold text-green-600">
            {{ formatCurrency(monthlyIncome) }}
          </p>
        </div>
        
        <div class="card p-6">
          <h3 class="text-sm font-medium text-gray-500">This Month Expenses</h3>
          <p class="text-2xl font-bold text-red-600">
            {{ formatCurrency(monthlyExpenses) }}
          </p>
        </div>
        
        <div class="card p-6">
          <h3 class="text-sm font-medium text-gray-500">Monthly Net</h3>
          <p class="text-2xl font-bold" :class="monthlyNet >= 0 ? 'text-green-600' : 'text-red-600'">
            {{ formatCurrency(monthlyNet) }}
          </p>
        </div>
        
        <div class="card p-6">
          <h3 class="text-sm font-medium text-gray-500">Average Transaction</h3>
          <p class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(averageTransaction) }}
          </p>
        </div>
      </div>

      <!-- Spending by Category -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Spending by Category</h3>
        </div>
        
        <div class="p-6">
          <div v-if="categorySpending.length === 0" class="text-center py-8">
            <p class="text-gray-500">No expense data available</p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="category in categorySpending" 
              :key="category.id"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <div 
                  class="w-4 h-4 rounded-full mr-3"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <span class="font-medium text-gray-900">{{ category.name }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex-1 bg-gray-200 rounded-full h-2 w-32">
                  <div 
                    class="bg-primary-600 h-2 rounded-full"
                    :style="{ width: `${category.percentage}%` }"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-900 w-20 text-right">
                  {{ formatCurrency(category.amount) }}
                </span>
                <span class="text-sm text-gray-500 w-12 text-right">
                  {{ category.percentage.toFixed(1) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Monthly Trends</h3>
        </div>
        
        <div class="p-6">
          <p class="text-gray-500 text-center py-8">
            Charts and trends coming soon...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useTransactionsStore } from '../stores/transactions'
import { useCategoriesStore } from '../stores/categories'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const transactionsStore = useTransactionsStore()
const categoriesStore = useCategoriesStore()
const loading = ref(true)

const monthlyTransactions = computed(() => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  return transactionsStore.transactions.filter(transaction => {
    const transactionDate = new Date(transaction.transaction_date)
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear
  })
})

const monthlyIncome = computed(() =>
  monthlyTransactions.value
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0)
)

const monthlyExpenses = computed(() =>
  monthlyTransactions.value
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)
)

const monthlyNet = computed(() => monthlyIncome.value - monthlyExpenses.value)

const averageTransaction = computed(() => {
  if (monthlyTransactions.value.length === 0) return 0
  const total = monthlyTransactions.value.reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0)
  return total / monthlyTransactions.value.length
})

const categorySpending = computed(() => {
  const expenses = monthlyTransactions.value.filter(t => t.type === 'expense')
  const categoryTotals = {}
  
  expenses.forEach(transaction => {
    const categoryId = transaction.category_id
    const categoryName = transaction.categories?.name || 'Uncategorized'
    const categoryColor = transaction.categories?.color || '#6B7280'
    
    if (!categoryTotals[categoryId]) {
      categoryTotals[categoryId] = {
        id: categoryId,
        name: categoryName,
        color: categoryColor,
        amount: 0
      }
    }
    
    categoryTotals[categoryId].amount += Math.abs(Number(transaction.amount))
  })
  
  const categories = Object.values(categoryTotals)
  const totalExpenses = categories.reduce((sum, cat) => sum + cat.amount, 0)
  
  return categories
    .map(category => ({
      ...category,
      percentage: totalExpenses > 0 ? (category.amount / totalExpenses) * 100 : 0
    }))
    .sort((a, b) => b.amount - a.amount)
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0)
}

onMounted(async () => {
  try {
    await Promise.all([
      transactionsStore.fetchTransactions(),
      categoriesStore.fetchCategories()
    ])
  } catch (error) {
    console.error('Error loading reports data:', error)
  } finally {
    loading.value = false
  }
})
</script>