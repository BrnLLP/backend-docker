<script>
export default {
  name: 'AddItem',
  props: {
    active: {
      type: Boolean,
      default: false,
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
        nome: '',
        tipo: '',
        peso: 0,
      },
    }
  },
  methods: {
    async addItem() {
      try {
        await this.$service.create({
          service: this.service,
          path: this.endpoint,
          data: {
            ...this.form,
            tipo_metal: this.form.tipo,
            tipo_papel: this.form.tipo,
            tipo_vidro: this.form.tipo,
          },
        })
        this.addItemVisible = false
        this.$emit('item-added')
        this.closeModal()
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
    <div v-if="active" class="add-item">
      <div class="add-item__content">
        <div class="add-item__title">Adicionar registro</div>
        <div class="add-item__form">
          <Input v-model="form.nome" type="text" placeholder="Descrição" />
          <Input v-model="form.peso" type="number" placeholder="Peso" />
          <Input
            v-if="service !== 'PLASTICO'"
            v-model="form.tipo"
            type="text"
            placeholder="Tipo"
          />
        </div>
        <div class="add-item__actions">
          <Button button-type="outline" @click="closeModal"> Cancelar </Button>
          <Button :disabled="!form.peso || !form.nome" @click="addItem">
            Salvar
          </Button>
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

.add-item {
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
