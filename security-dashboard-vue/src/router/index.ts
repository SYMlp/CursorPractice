import DataAssetMonitoring from '@/views/DataAssetMonitoring.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AssetMonitoring from '../views/AssetMonitoring.vue'
import InterfaceMonitoring from '../views/InterfaceMonitoring.vue'
import PlatformOverview from '../views/PlatformOverview.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: PlatformOverview,
    },
    {
      path: '/platform-overview',
      name: 'platform-overview',
      component: PlatformOverview,
    },
    {
      path: '/asset-monitoring',
      name: 'asset-monitoring',
      component: AssetMonitoring,
    },
    {
      path: '/data-asset-monitoring',
      name: 'data-asset-monitoring',
      component: DataAssetMonitoring,
    },
    {
      path: '/interface-monitoring',
      name: 'interface-monitoring',
      component: InterfaceMonitoring,
    },
  ],
})

export default router
