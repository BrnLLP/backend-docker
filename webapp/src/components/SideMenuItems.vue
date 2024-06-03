<script>
export default {
  name: 'SideMenuItems',
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
<template>
  <nav class="side-menu-items">
    <router-link :to="{ name: 'GlassList' }" @click.native="$emit('navigate')">
      Vidros
    </router-link>
    <router-link
      :to="{ name: 'PlasticList' }"
      @click.native="$emit('navigate')"
    >
      Plásticos
    </router-link>
    <router-link :to="{ name: 'PaperList' }" @click.native="$emit('navigate')">
      Papéis
    </router-link>
    <router-link :to="{ name: 'MetalList' }" @click.native="$emit('navigate')">
      Metais
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
.side-menu-items {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 30px;

  a {
    color: var(-text-color-3);
    text-align: start;
    border-bottom: 1px solid var(--gray-color-1);
    text-decoration: none;
    padding: 15px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--bg-color-1);
      transition: all 0.2s ease;
    }

    &:active {
      color: var(--primary-color);
    }
  }
}
</style>
