<script>
import { d$auth } from '@/stores/auth'
import { mapActions, mapState } from 'pinia'

import BaseInput from '@/components/BaseInput.vue'

const initialInput = {
  username: '',
  password: ''
}

export default {
  data: () => ({
    input: { ...initialInput }
  }),
  components: {
    BaseInput
  },
  computed: {
    ...mapState(d$auth, ['g$user', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(d$auth, ['a$login', 'a$setUser']),
    resetForm() {
      Object.assign(this.input, initialInput)
    },
    async submitForm() {
      try {
        await this.a$login(this.input)

        // set user based on cookie
        this.a$setUser()

        this.resetForm()

        // redirect to profile after input username
        this.$router.replace({
          name: 'Authenticated',
          params: { id: this.g$user.id }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>

    <!-- conditional rendering using v-if directive -->
    <form
      v-if="!isLoggedIn"
      method="post"
      @submit.prevent="() => submitForm()"
      @reset="() => resetForm()"
    >
      <base-input
        class="input"
        v-model="input.username"
        placeholder="input username"
        required
      />
      <br />
      <base-input
        class="input"
        v-model="input.password"
        placeholder="input password"
        type="password"
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>

    <!-- conditional rendering using v-else directive -->
    <h3 v-else>{{ g$user?.id }}</h3>
  </div>
</template>
