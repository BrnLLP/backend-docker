<script>
import GlassTable from '../components/GlassTable.vue'
import UpdateItem from '../components/UpdateItem.vue'
import AddItem from '../components/AddItem.vue'

export default {
  name: 'GlassList',
  components: { GlassTable, UpdateItem, AddItem },
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
          service: 'VIDRO',
          path: '/vidros',
        })
        this.data = data
      } catch (error) {
        console.error(error)
      }
    },
    async loadStorage() {
      try {
        const [data] = await this.$service.load({
          service: 'VIDRO',
          path: '/vidros/estoque',
        })
        this.storage = data
      } catch (error) {
        console.error(error)
      }
    },
    async removeItem(row) {
      try {
        await this.$service.remove({
          service: 'VIDRO',
          path: '/vidros',
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
  <div class="glass-list">
    <Button class="glass-list__add" @click="addItemVisible = true">
      Adicionar registro
    </Button>

    <div class="glass-list__storage">
      Peso total: <strong>{{ storage.total }}</strong>
    </div>

    <GlassTable :data="data" @edit="editItem" @remove="removeItem" />

    <AddItem
      :active="addItemVisible"
      service="VIDRO"
      endpoint="/vidros"
      @close="addItemVisible = false"
      @item-added="loadItems"
    />

    <UpdateItem
      :active="updateItemVisible"
      service="VIDRO"
      endpoint="/vidros"
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
.glass-list {
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
