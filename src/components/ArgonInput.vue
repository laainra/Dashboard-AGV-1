<script setup>
defineProps({
  id: {
    type: String,
    default: 'id'
  },
  name: {
    type: String,
    default: 'name'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  modelValue: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  type: {
    type: String, // Tambahkan properti type
    default: 'text' // Atur nilai default sesuai kebutuhan
  },
  disable: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
<div class="form-group">
  <!-- Binding (:) from defineProps then the data will be use in Parent Component -->
  <!-- After componenet send the new property, then the child component will binding directly -->
  <input
    class="form-control"
    :id="id"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="modelValue"
    :required="required"
    @input="(e) => $emit('update:modelValue', e.target.value)"
    :disabled="disable"
  />
</div>
</template>