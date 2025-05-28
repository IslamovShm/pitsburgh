<script setup>
import chevronDown from '@/assets/icons/fi_chevron-down.svg'
import Icon from './UI/Icon.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link v-if="!item.down" :to="item.route" active-class="active" class="nav__link">
    <Icon :name="item.icon" class="nav__icon" />
    <span>{{ item.title }}</span>
  </router-link>

  <button v-else type="button" class="nav__link nav__btn">
    <Icon :name="item.icon" class="nav__icon" />
    <span>{{ item.title }}</span>
    <img :src="chevronDown" alt="chevron-down" class="nav__chevron" />
  </button>
</template>

<style scoped>
.nav__link {
    padding: 9px 8px 9px 12px;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
}

.nav__link span {
    display: inline-block;
    width: 100%;
    text-align: left;
    font-weight: 500;
    font-size: 16px;
    color: var(--color-text);
}

.active {
    background-color: var(--color-purple);
}

.active span {
    color: var(--base-white);
}


.nav__icon {
  min-width: 22px;
  color: var(--icon-gray);
}

.active .nav__icon {
  color: var(--base-white);
}

</style>
