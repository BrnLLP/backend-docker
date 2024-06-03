<script>
import storageManager from '../utils/storage-manager'
import RecycleSvg from '@/assets/Recycle.svg'

export default {
  name: 'Login',
  components: { RecycleSvg },
  data() {
    return {
      form: {
        usuario: '',
        senha: '',
      },
      loading: false,
      user: null,
    }
  },
  methods: {
    async tryToLogIn() {
      try {
        this.loading = true
        const { usuario, senha } = this.form
        if (!usuario || !senha) return

        let { data } = await this.$service.create({
          path: 'login',
          service: 'USER_AUTH',
          data: { usuario, senha },
        })

        this.user = data

        this.storeUserAndNavigate()
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    storeUserAndNavigate(user = this.user) {
      storageManager.setStorage('_rec.user', user)

      this.$nextTick(() => {
        this.$router.push({ name: 'GlassList' })
      })
    },
  },
}
</script>

<template>
  <div class="login">
    <section class="login__illustration">
      <RecycleSvg />
    </section>
    <form class="login__form" @submit.prevent="tryToLogIn">
      <Input
        v-model="form.usuario"
        class="login__form-input"
        autocomplete="off"
        placeholder="Usuário"
      />
      <Input
        v-model="form.senha"
        class="login__form-input"
        autocomplete="current-password"
        type="password"
        placeholder="Senha"
        @keydown.enter="tryToLogIn"
      />
      <Button
        :disabled="!form.usuario || !form.senha || loading"
        class="login__form-button"
        type="submit"
      >
        Entrar
      </Button>
    </form>
  </div>
</template>
<style lang="scss" scoped>
@import '../design/breakpoints';

.login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__illustration {
    width: 30%;
    min-width: 200px;

    @media screen and (min-width: $breakpoint-1024) {
      width: 40%;
    }
  }

  &__form {
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    max-width: 400px;
    min-width: 200px;
  }

  &__form-input {
    width: 100%;
  }

  &__form-button {
    width: 100%;
    min-width: unset;
    margin-top: 10px;
  }
}
</style>
