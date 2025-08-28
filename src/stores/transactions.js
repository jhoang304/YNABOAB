import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../services/supabase'

export const useTransactionsStore = defineStore('transactions', () => {
  const transactions = ref([])
  const loading = ref(false)
  const error = ref(null)

  const totalIncome = computed(() => 
    transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0)
  )

  const totalExpenses = computed(() =>
    transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0)
  )

  const balance = computed(() => totalIncome.value - totalExpenses.value)

  const fetchTransactions = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select(`
          *,
          categories (
            id,
            name,
            color,
            icon
          )
        `)
        .order('transaction_date', { ascending: false })
      
      if (fetchError) throw fetchError
      
      transactions.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addTransaction = async (transactionData) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: addError } = await supabase
        .from('transactions')
        .insert([transactionData])
        .select(`
          *,
          categories (
            id,
            name,
            color,
            icon
          )
        `)
        .single()
      
      if (addError) throw addError
      
      transactions.value.unshift(data)
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTransaction = async (id, updates) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: updateError } = await supabase
        .from('transactions')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          categories (
            id,
            name,
            color,
            icon
          )
        `)
        .single()
      
      if (updateError) throw updateError
      
      const index = transactions.value.findIndex(t => t.id === id)
      if (index !== -1) {
        transactions.value[index] = data
      }
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTransaction = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const { error: deleteError } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
      
      transactions.value = transactions.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    transactions,
    loading,
    error,
    totalIncome,
    totalExpenses,
    balance,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  }
})