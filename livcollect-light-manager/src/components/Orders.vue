<template>
  <div>
    <nav class="navbar">
      <img src="../assets/logo-liv.png" alt="Logo" class="logo" />
      <div class="profile">
        <img src="../assets/profile.png" alt="Profile" class="profile-icon" />
      </div>
    </nav>
    <div class="status-tabs d-flex justify-content-center my-3">
      <div
        class="tab px-3 py-2 mx-1"
        :class="{ active: selectedTab === 'new' }"
        @click="selectTab('new')"
      >
        <span>Nouvelles commandes</span>
        <span class="badge">{{ counts.new }}</span>
      </div>
      <div
        class="tab px-3 py-2 mx-1"
        :class="{ active: selectedTab === 'in-preparation' }"
        @click="selectTab('in-preparation')"
      >
        <span>En préparation</span>
        <span class="badge">{{ counts.inPreparation }}</span>
      </div>
      <div
        class="tab px-3 py-2 mx-1"
        :class="{ active: selectedTab === 'delivered' }"
        @click="selectTab('delivered')"
      >
        <span>Livrée</span>
        <span class="badge">{{ counts.delivered }}</span>
      </div>
      <div
        class="tab px-3 py-2 mx-1"
        :class="{ active: selectedTab === 'scheduled' }"
        @click="selectTab('scheduled')"
      >
        <span>Programmée</span>
        <span class="badge">{{ counts.scheduled }}</span>
      </div>
      <div
        class="tab px-3 py-2 mx-1"
        :class="{ active: selectedTab === 'history' }"
        @click="selectTab('history')"
      >
        <span>Historique</span>
        <span class="badge">{{ counts.history }}</span>
      </div>
    </div>
    <div class="orders-table">
      <div class="table-header d-flex justify-content-between align-items-center">
        <h3 class="mb-0">LISTE DES COMMANDES</h3>
        <div class="impression-options">
          <span>Impression :</span>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="impressionOptions"
              id="impressionDesactivee"
              value="desactivee"
              checked
            />
            <label class="form-check-label" for="impressionDesactivee">Désactivée</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="impressionOptions"
              id="impressionNormale"
              value="normale"
            />
            <label class="form-check-label" for="impressionNormale">Normale</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              name="impressionOptions"
              id="impressionMultiple"
              value="multiple"
            />
            <label class="form-check-label" for="impressionMultiple">Multiple</label>
          </div>
        </div>
      </div>
      <table class="table table-bordered mt-3 table-shadow">
        <thead class="bg-primary text-white">
          <tr>
            <th>Annuler</th>
            <th>Order N°</th>
            <th>Date</th>
            <th>Nom du client</th>
            <th>Type</th>
            <th>Montant</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td><button class="btn btn-danger">Annuler</button></td>
            <td>{{ order.id }}</td>
            <td>{{ order.created_at }}</td>
            <td>{{ order.customer.firstName }} {{ order.customer.lastName }}</td>
            <td>{{ order.type }}</td>
            <td>{{ order.total_amount }} €</td>
            <td><button class="btn btn-accept" @click="showAcceptDialog(order)">Accepter</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <AcceptDialog
      :visible="isAcceptDialogVisible"
      @confirm="acceptOrder"
      @cancel="isAcceptDialogVisible = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { getOrders } from '../api'
import AcceptDialog from './AcceptDialog.vue'

interface Customer {
  firstName: string
  lastName: string
}

interface Order {
  id: number
  created_at: string
  customer: Customer
  type: string
  total_amount: number
  status?: string
  planified?: number
}

export default defineComponent({
  name: 'Orders',
  components: { AcceptDialog },
  setup() {
    const selectedTab = ref<string>('new')
    const orders = ref<Order[]>([])
    const counts = ref({
      new: 0,
      inPreparation: 0,
      delivered: 0,
      scheduled: 0,
      history: 0
    })
    const isAcceptDialogVisible = ref(false)
    const currentOrder = ref<Order | null>(null)

    const selectTab = (tab: string) => {
      selectedTab.value = tab
    }

    const fetchOrders = async () => {
      try {
        const response = await getOrders()
        const { pending, accepted, delivered } = response.data

        orders.value = [...pending.CAC, ...accepted.CAC, ...delivered.CAC]

        counts.value.new = pending.CAC.length
        counts.value.inPreparation = accepted.CAC.length
        counts.value.delivered = delivered.CAC.length
        counts.value.scheduled = pending.CAC.filter((order: Order) => order.planified === 1).length
        counts.value.history = delivered.CAC.length
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    const filteredOrders = computed(() => {
      if (selectedTab.value === 'new')
        return orders.value.filter((order) => order.status === 'pending' && order.planified === 0)
      if (selectedTab.value === 'in-preparation')
        return orders.value.filter((order) => order.status === 'in-preparation')
      if (selectedTab.value === 'delivered')
        return orders.value.filter((order) => order.status === 'delivered')
      if (selectedTab.value === 'scheduled')
        return orders.value.filter((order) => order.planified === 1)
      if (selectedTab.value === 'history')
        return orders.value.filter((order) => order.status === 'delivered')
      return []
    })

    const showAcceptDialog = (order: Order) => {
      currentOrder.value = order
      isAcceptDialogVisible.value = true
    }

    const acceptOrder = () => {
      if (currentOrder.value) {
        // Perform the order acceptance logic here
        console.log('Order accepted:', currentOrder.value.id)
        isAcceptDialogVisible.value = false
      }
    }

    onMounted(() => {
      fetchOrders()
      const interval = setInterval(fetchOrders, 5000)
      onBeforeUnmount(() => clearInterval(interval))
    })

    return {
      selectedTab,
      selectTab,
      counts,
      filteredOrders,
      isAcceptDialogVisible,
      showAcceptDialog,
      acceptOrder
    }
  }
})
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.logo {
  height: 40px;
}

.profile {
  display: flex;
  align-items: center;
}

.profile-icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.status-tabs .tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.status-tabs .tab.active {
  background-color: #740274;
  color: white;
}

.status-tabs .badge {
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  margin-left: 10px;
}

.orders-table {
  padding: 20px;
}

.table-header {
  margin-bottom: 10px;
}

.table-shadow {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.bg-primary {
  background-color: #740274 !important;
}

.btn-accept {
  display: block;
  width: 100px;
  padding: 10px;
  margin: 10px 0;
  background-color: #78c679;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.btn-accept:hover {
  background-color: #66b367;
}

.btn-accept:active {
  transform: scale(0.95);
}
</style>
