import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../services/supabase'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      
      if (fetchError) throw fetchError
      
      categories.value = data || []
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addCategory = async (categoryData) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: addError } = await supabase
        .from('categories')
        .insert([categoryData])
        .select()
        .single()
      
      if (addError) throw addError
      
      categories.value.push(data)
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCategory = async (id, updates) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: updateError } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (updateError) throw updateError
      
      const index = categories.value.findIndex(c => c.id === id)
      if (index !== -1) {
        categories.value[index] = data
      }
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCategory = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)
      
      if (deleteError) throw deleteError
      
      categories.value = categories.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    addCategory,
    updateCategory,
    deleteCategory
  }
})