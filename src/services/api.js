import { supabase } from './supabase'

export const api = {
  // Authentication
  auth: {
    signUp: (email, password) => supabase.auth.signUp({ email, password }),
    signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signOut: () => supabase.auth.signOut(),
    getSession: () => supabase.auth.getSession(),
    onAuthStateChange: (callback) => supabase.auth.onAuthStateChange(callback)
  },

  // Categories
  categories: {
    getAll: () => supabase.from('categories').select('*').order('name'),
    create: (data) => supabase.from('categories').insert([data]).select().single(),
    update: (id, data) => supabase.from('categories').update(data).eq('id', id).select().single(),
    delete: (id) => supabase.from('categories').delete().eq('id', id)
  },

  // Transactions
  transactions: {
    getAll: () => supabase
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
      .order('transaction_date', { ascending: false }),
    
    create: (data) => supabase
      .from('transactions')
      .insert([data])
      .select(`
        *,
        categories (
          id,
          name,
          color,
          icon
        )
      `)
      .single(),
    
    update: (id, data) => supabase
      .from('transactions')
      .update(data)
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
      .single(),
    
    delete: (id) => supabase.from('transactions').delete().eq('id', id)
  },

  // Budgets
  budgets: {
    getAll: () => supabase.from('budgets').select('*').order('month_year', { ascending: false }),
    create: (data) => supabase.from('budgets').insert([data]).select().single(),
    update: (id, data) => supabase.from('budgets').update(data).eq('id', id).select().single(),
    delete: (id) => supabase.from('budgets').delete().eq('id', id)
  },

  // Budget Categories
  budgetCategories: {
    getByBudgetId: (budgetId) => supabase
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
      .eq('budget_id', budgetId),
    
    upsert: (data) => supabase
      .from('budget_categories')
      .upsert(data)
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
  }
}