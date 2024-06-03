<script>
export default {
  name: 'UpdateItem',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    itemId: {
      type: String,
      default: null,
    },
    item: {
      type: Object,
      default: () => ({}),
    },
    service: {
      type: String,
      default: '',
    },
    endpoint: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      form: {
        peso: 0,
      },
    }
  },
  watch: {
    active(val) {
      if (val) this.form.peso = this.item.peso
    },
  },
  methods: {
    async saveUpdate() {
      try {
        await this.$service.patch({
          path: this.endpoint,
          id: this.itemId,
          service: this.service,
          data: { peso: this.form.peso },
        })
        this.closeModal()
        this.$emit('update-data')
      } catch (error) {
        console.error(error)
      }
    },
    closeModal() {
      this.$emit('close')
      this.form = {
        peso: 0,
      }
    },
  },
}
</script>

<template>
  <transition name="fade">
    <div v-if="active" class="update-item">
      <div class="update-item__content">
        <div class="update-item__title">Atualizar quantidade em estoque</div>
        <div class="update-item__form">
          <Input
            v-model="form.peso"
            type="number"
            placeholder="Código do produto"
          />
        </div>
        <div class="update-item__actions">
          <Button button-type="outline" @click="closeModal"> Cancelar </Button>
          <Button :disabled="!form.peso" @click="saveUpdate"> Salvar </Button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.update-item {
  position: fixed;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 7998;
  background: rgba(0, 0, 0, 0.25);

  &__title {
    text-align: start;
    font-size: 14px;
    color: #838383;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: white;
    padding: 16px;
    border-radius: 4px;
    width: 100%;
    max-width: 450px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    border-top: 1px solid #e0e0e0;
    padding-top: 16px;
  }
}
</style>
