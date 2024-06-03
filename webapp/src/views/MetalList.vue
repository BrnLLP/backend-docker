<script>
import MetalTable from '../components/MetalTable.vue'
import UpdateItem from '../components/UpdateItem.vue'
import AddItem from '../components/AddItem.vue'

export default {
  name: 'MetalList',
  components: { MetalTable, UpdateItem, AddItem },
  data() {
    return {
      data: [],
      storage: {},
      updateItemVisible: false,
      addItemVisible: false,
      itemOnUpdate: null,
    }
  },
  mounted() {
    this.loadItems()
    this.loadStorage()
  },
  methods: {
    async loadItems() {
      try {
        const data = await this.$service.load({
          service: 'METAL',
          path: '/metais',
        })
        this.data = data
      } catch (error) {
        console.error(error)
      }
    },
    async loadStorage() {
      try {
        const [data] = await this.$service.load({
          service: 'METAL',
          path: '/metais/estoque',
        })
        this.storage = data
      } catch (error) {
        console.error(error)
      }
    },
    async removeItem(row) {
      try {
        await this.$service.remove({
          service: 'METAL',
          path: '/metais',
          id: row._id,
        })
        await this.loadItems()
      } catch (error) {
        console.error(error)
      }
    },
    editItem(row) {
      this.updateItemVisible = true
      this.itemOnUpdate = row
    },
  },
}
</script>

<template>
  <div class="metal-list">
    <Button class="metal-list__add" @click="addItemVisible = true">
      Adicionar registro
    </Button>

    <div class="metal-list__storage">
      Peso total: <strong>{{ storage.total }}</strong>
    </div>

    <MetalTable :data="data" @edit="editItem" @remove="removeItem" />

    <AddItem
      :active="addItemVisible"
      service="METAL"
      endpoint="/metais"
      @close="addItemVisible = false"
      @item-added="loadItems"
    />

    <UpdateItem
      :active="updateItemVisible"
      service="METAL"
      endpoint="/metais"
      :item-id="itemOnUpdate ? itemOnUpdate._id : null"
      :item="itemOnUpdate"
      @close="
        updateItemVisible = false
        itemOnUpdate = null
      "
      @update-data="loadItems"
    />
  </div>
</template>

<style scoped lang="scss">
.metal-list {
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  margin-top: 60px;
  overflow: auto;

  &__add {
    margin-bottom: 16px;
    align-self: flex-end;
    width: fit-content;
  }

  &__storage {
    background-color: var(--bg-color-1);
    padding: 8px;
    margin-bottom: 16px;
    text-align: left;
    border-radius: 6px;
  }
}
</style>
