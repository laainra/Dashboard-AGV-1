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
  disabled: {
    type: Boolean, // Tentukan tipe properti sebagai Boolean
    default: false // Atur nilai default menjadi false
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="label" :for="name">{{ name }}</label>
  <input
    class="input"
    :id="id"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :value="modelValue"
    :required="required"
    :disabled="disabled"
    @input="(e) => $emit('update:modelValue', e.target.value)"
  />
</template>

<style scoped>
.label {
  color: #000000;
  font-size: 14px;
}

.input {
  padding: 0.5rem;
  outline: none;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 1px solid #177BDB;
  background-color: transparent;
  width: 100%;
}
</style>
