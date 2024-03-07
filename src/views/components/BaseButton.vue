<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    :disabled="disabled || loading"
    class="btn base-button"
    :class="[
      { 'rounded-circle': round },
      { 'btn-block': block },
      { 'btn-wd': wide },
      { 'btn-icon btn-fab': icon },
      { [`btn-${type}`]: type && !outline },
      { [`btn-${size}`]: size },
      { [`btn-outline-${type}`]: outline && type },
      { 'btn-link': link },
      { disabled: disabled && tag !== 'button' },
    ]"
    @click="handleClick"
  >
    <slot name="loading">
      <i v-if="loading" class="fas fa-spinner fa-spin"></i>
    </slot>
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: String,
      default: 'button',
      description: 'Button html tag',
    },
    round: Boolean,
    icon: Boolean,
    block: Boolean,
    loading: Boolean,
    wide: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: 'default',
      description: 'Button type (primary|secondary|danger etc)',
    },
    nativeType: {
      type: String,
      default: 'button',
      description: 'Button native type (e.g button, input etc)',
    },
    size: {
      type: String,
      default: 'sm',
      description: 'Button size (sm|md|lg)',
    },
    outline: {
      type: Boolean,
      description: 'Whether button is outlined (only border has color)',
    },
    link: {
      type: Boolean,
      description: 'Whether button is a link (no borders or background)',
    },
  },
  emits: ['click'],
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>
<style lang="scss">
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  i {
    padding: 0 3px;
  }
}
</style>
