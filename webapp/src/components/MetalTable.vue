<script>
import PencilIcon from '../assets/PencilIcon.svg'
import TrashIcon from '../assets/TrashIcon.svg'

export default {
  name: 'MetalTable',
  components: { PencilIcon, TrashIcon },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        { name: 'nome', label: 'Descrição', minWidth: 100 },
        { name: 'peso', label: 'Peso', width: 70 },
        { name: 'tipo_metal', label: 'Tipo', width: 140 },
        { name: 'dataReciclagem', label: 'Data', width: 200 },
      ],
    }
  },
}
</script>
<template>
  <Table :columns="columns" :data="data">
    <template v-slot:table-cell-dataReciclagem="{ row }">
      {{
        new Intl.DateTimeFormat('pt-BR', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        }).format(new Date(row.dataReciclagem))
      }}
    </template>
    <template v-slot:table-actions="{ row }">
      <div class="metal-table__actions">
        <span class="metal-table__icon" @click="$emit('edit', row)">
          <PencilIcon />
        </span>
        <span class="metal-table__icon" @click="$emit('remove', row)">
          <TrashIcon />
        </span>
      </div>
    </template>
  </Table>
</template>

<style lang="scss" scoped>
.metal-table {
  &__actions {
    display: flex;
    gap: 8px;
  }

  &__icon {
    cursor: pointer;
    svg {
      stroke: #838383;
      width: 26px;
    }
  }
}
</style>
