<template>
  <nav v-if="authStore.isAuthenticated" class="bg-white border-r border-gray-200">
    <div class="h-full flex flex-col">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div class="flex-1 px-3 space-y-1">
          <RouterLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="nav-item"
            :class="{ 'nav-item-active': $route.name === item.name }"
          >
            <component :is="item.icon" class="w-5 h-5 mr-3" />
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth'
import {
  HomeIcon,
  CreditCardIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()

const navigation = [
  { name: 'dashboard', href: '/', label: 'Dashboard', icon: HomeIcon },
  { name: 'transactions', href: '/transactions', label: 'Transactions', icon: CreditCardIcon },
  { name: 'budgets', href: '/budgets', label: 'Budgets', icon: ChartBarIcon },
  { name: 'reports', href: '/reports', label: 'Reports', icon: DocumentChartBarIcon },
  { name: 'settings', href: '/settings', label: 'Settings', icon: Cog6ToothIcon }
]
</script>

<style scoped>
.nav-item {
  @apply flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150;
}

.nav-item-active {
  @apply bg-blue-50 text-blue-700;
}

@media (max-width: 767px) {
  nav {
    @apply flex overflow-x-auto border-b border-r-0;
  }
  
  .h-full {
    @apply h-auto;
  }
  
  .flex-col {
    @apply flex-row;
  }
  
  .overflow-y-auto {
    @apply overflow-y-visible overflow-x-auto;
  }
  
  .space-y-1 {
    @apply space-y-0 space-x-1 flex;
  }
  
  .nav-item {
    @apply whitespace-nowrap;
  }
}
</style>