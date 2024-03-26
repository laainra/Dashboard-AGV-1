<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <Navbar :isBlur="blur" :darkMode="true" :isBtn="btnClass" />
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
                  <form role="form" @submit.prevent="login" method="post">
                    <div class="mb-3">
                      <ArgonInput
                        v-model="user.username"
                        placeholder="Username"
                        required
                        autocomplete="username"
                      ></ArgonInput>
                    </div>
                    <div class="mb-3">
                      <ArgonInput
                        id="password"
                        type="password"
                        placeholder="Password"
                        addon-left-icon="fas fa-lock"
                        name="password"
                        size="lg"
                        v-model="user.password"
                        :isPassword="true"
                        autocomplete="password"
                      ></ArgonInput>
                    </div>
                    <div class="text-center">
                      <ArgonButton
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        type="submit"
                      >
                        {{ loading ? "Signing in..." : "Sign in" }}
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
import Navbar from "@/examples/PageLayout/Navbar.vue";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { useToast } from "vue-toastification";
import { mapActions } from "pinia"; // tambahkan impor mapActions dari pinia
import useAuthStore from "../store/auth.js";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    Navbar,
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      loading: false,
      blur: "blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow",
      btnClass: "bg-gradient-success",
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["a$login"]),
    async login() {
      this.loading = true;
      const toast = useToast();
      try {
        // Panggil metode login dengan data pengguna
        const isLoggedIn = await this.a$login(this.user);
        console.log("cek")
        if (isLoggedIn) {
          // Redirect setelah login berhasil
          this.$router.push("/dashboard-agv-lidar");
          // Tampilkan notifikasi berhasil
          toast.success("Login berhasil!");
        } else {
          throw new Error("Token akses tidak ditemukan dalam respons");
        }
      } catch (error) {
        // Tangani kesalahan dengan menampilkan pesan kesalahan
        this.loading = false;
        console.log(error);
        toast.error("Login gagal. Silakan coba lagi.");
      }
    },
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
};
</script>

<style scoped>
.image {
  background-size: cover;
  background-image: url("../assets/img/bg-signin.jpg");
}
</style>
