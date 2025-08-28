import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../services/supabase'

export const useBudgetsStore = defineStore('budgets', () => {
  const budgets = ref([])
  const budgetCategories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const currentMonthBudget = computed(() => {
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM format
    return budgets.value.find(b => b.month_year === currentMonth)
  })

  const fetchBudgets = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('budgets')
        .select('*')
        .order('month_year', { ascending: false })
      
      if (fetchError) throw fetchError
      
      budgets.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const fetchBudgetCategories = async (budgetId) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('budget_categories')
        .select(`
          *,
          categories (
            id,
            name,
            color,
            icon
          )
        `)
        .eq('budget_id', budgetId)
      
      if (fetchError) throw fetchError
      
      budgetCategories.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const createBudget = async (monthYear, totalBudget) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: createError } = await supabase
        .from('budgets')
        .insert([{
          month_year: monthYear,
          total_budget: totalBudget
        }])
        .select()
        .single()
      
      if (createError) throw createError
      
      budgets.value.unshift(data)
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBudgetCategory = async (budgetId, categoryId, amount) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: upsertError } = await supabase
        .from('budget_categories')
        .upsert({
          budget_id: budgetId,
          category_id: categoryId,
          amount: amount
        })
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
      
      if (upsertError) throw upsertError
      
      const existingIndex = budgetCategories.value.findIndex(
        bc => bc.budget_id === budgetId && bc.category_id === categoryId
      )
      
      if (existingIndex !== -1) {
        budgetCategories.value[existingIndex] = data
      } else {
        budgetCategories.value.push(data)
      }
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    budgets,
    budgetCategories,
    loading,
    error,
    currentMonthBudget,
    fetchBudgets,
    fetchBudgetCategories,
    createBudget,
    updateBudgetCategory
  }
})