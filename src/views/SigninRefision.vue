<!-- <template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0"
            >
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">
                    Enter your username and password to sign in
                  </p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="mb-3">
                      <ArgonInput
                        id="username"
                        type="username"
                        placeholder="Username"
                        name="username"
                        size="lg"
                        v-model="input.username"
                      />
                    </div>
                    <div class="mb-3">
                      <ArgonInput
                        id="password"
                        type="password"
                        placeholder="Password"
                        addon-left-icon="fas fa-lock"
                        name="password"
                        size="lg"
                        v-model="input.password"
                        :isPassword="true"
                      />
                    </div>
                    <div class="text-center">
                      <ArgonButton
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        @click="handleLogin()"
                      >
                        Sign in
                      </ArgonButton>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link
                      href="javascript:;"
                      class="text-success text-gradient font-weight-bold"
                      to="/signup"
                      >Sign up</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden image"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h3
                  class="mt-5 text-white font-weight-bolder position-relative"
                >
                  "Stechoq Kara Kuri Autonomous Navigation System (SANS)"
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Navbar from "../examples/Navbars/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { useAuthStore } from "../store/auth"; 
import { mapActions } from "pinia";// Import fungsi login dari service auth

const body = document.getElementsByTagName("body")[0];

const initialInput = {
  username: "",
  password: "",
};

export default {
  data: () => ({
    input: { ...initialInput },
  }),
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapActions(useAuthStore, ["login"]),
     
    async handleLogin() {
      try {
        const user = await login({ username: this.username, password: this.password });
        console.log("Login Success:", user);
        this.$router.push('/profile')
        // Setelah login berhasil, lakukan navigasi ke halaman lain jika diperlukan
      } catch (error) {
        console.error("Login Error:", error);
        // Tangani pesan error jika diperlukan
      }
    }
  },

};
</script>

<style scoped>
.image {
  background-size: cover;
  background-image: url("../assets/img/bg-signin.jpg");
}
</style> -->
