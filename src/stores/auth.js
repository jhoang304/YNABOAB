import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../services/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)

  const signUp = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password
      })
      
      if (authError) throw authError
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (authError) throw authError
      
      user.value = data.user
      session.value = data.session
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signOut = async () => {
    loading.value = true
    error.value = null
    
    try {
      const { error: authError } = await supabase.auth.signOut()
      
      if (authError) throw authError
      
      user.value = null
      session.value = null
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const initializeAuth = async () => {
    loading.value = true
    
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      
      if (currentSession) {
        user.value = currentSession.user
        session.value = currentSession
      }
      
      supabase.auth.onAuthStateChange((event, session) => {
        user.value = session?.user || null
        session.value = session
      })
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    initializeAuth
  }
})