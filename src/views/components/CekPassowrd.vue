<template>
    <div class="form-group">
      <slot name="label">
        <label v-if="label" :class="labelClasses">
          {{ label }}
          <span v-if="required" class="text-danger">*</span>
        </label>
      </slot>
  
      <div
        :class="[
          {
            'has-danger': !!errorMessage,
            'input-group': hasIcon,
            'input-group-alternative': alternative,
            focused: focused,
            'has-label': label || $slots.label,
          },
          inputGroupClasses,
        ]"
      >
        <div v-if="addonLeftIcon || $slots.addonLeft" class="input-group-prepend">
          <span class="input-group-text">
            <slot name="addonLeft">
              <i :class="addonLeftIcon"></i>
            </slot>
          </span>
        </div>
        <slot>
          <input
            :id="name"
            class="form-control"
            :class="inputClasses"
            :name="name"
            :type="password ? toggling : type"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :value="inputValue"
            autocomplete="off"
            @input="handleChange"
            @blur="focused = false"
            @focus="focused = true"
          />
        </slot>
        <div
          v-if="addonRightIcon || $slots.addonRight || password"
          class="input-group-append"
          :class="[password ? 'cursor-pointer' : '']"
        >
          <template v-if="password">
            <span class="input-group-text" @click="togglePassword">
              <slot name="addonRight">
                <i :class="[toggling === 'password' ? 'fas fa-eye-slash' : 'fas fa-eye']"></i>
              </slot>
            </span>
          </template>
          <template v-else>
            <span class="input-group-text">
              <slot name="addonRight">
                <i :class="addonRightIcon"></i>
              </slot>
            </span>
          </template>
        </div>
      </div>
      <slot name="infoBlock"></slot>
      <slot name="helpBlock">
        <div
          v-show="errorMessage"
          class="text-danger invalid-feedback"
          style="display: block"
          :class="{ 'mt-2': hasIcon }"
        >
          {{ errorMessage }}
        </div>
      </slot>
    </div>
  </template>
  
  <script>
  import { useField } from 'vee-validate';
  
  export default {
    name: 'BaseInput',
    props: {
      addonRightIcon: {
        type: String,
        default: '',
      },
      addonLeftIcon: {
        type: String,
        default: '',
      },
      append: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: 'text',
      },
      value: {
        type: [String, Number],
        default: '',
      },
      placeholder: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        default: '',
      },
      required: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
      alternative: {
        type: Boolean,
        description: 'Whether input is of alternative layout',
      },
      labelClasses: {
        type: String,
        description: 'Input label css classes',
        default: 'form-control-label',
      },
      inputGroupClasses: {
        type: String,
        default: '',
      },
      group: {
        type: String,
        default: '',
      },
      inputClasses: {
        type: String,
        default: '',
      },
      password: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const {
        value: inputValue,
        errorMessage,
        handleChange,
        meta,
      } = useField(props.name, undefined, {
        initialValue: props.value,
      });
  
      return {
        handleChange,
        errorMessage,
        inputValue,
        meta,
      };
    },
    data: () => ({
      focused: false,
      toggling: 'password',
    }),
    computed: {
      hasIcon() {
        const { addonRight, addonLeft } = this.$slots;
        return (
          addonRight !== undefined || addonLeft !== undefined || this.addonRightIcon !== undefined || this.addonLeftIcon !== undefined || this.group
        );
      },
    },
    methods: {
      togglePassword() {
        this.toggling = this.toggling === 'password' ? 'text' : 'password';
      },
    },
  };
  </script>
  
  <style>
  .cursor-pointer {
    cursor: pointer;
  }
  </style>
  