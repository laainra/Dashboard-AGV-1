import { createRouter, createWebHistory } from "vue-router";
import DashboardDefault from "../views/DashboardDefault.vue";
import DashboardSwitch from "../views/DashboardSwitch.vue";
import Tables from "../views/Tables.vue";
import Todo from "../views/Todo.vue";
import EditTodo from "../views/EditTodo.vue";
import ToDoForm from "../views/ToDoForm.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Signin from "../views/Signin.vue";
import Cookies from "js-cookie";
import TableDataAgvLidar from "../views/TableDataAGVLidar.vue";
import TableDataAgvLineFollower from "../views/TableDataAGVLineFollower.vue";
import TableDataStationAgvLidar from '../views/TableDataStationAGVLidar.vue';
import TableDataStationAgvLineFollower from '../views/TableDataStationAGVLineFollower.vue'

// rute-rute yang digunakan untuk mengakses halaman
const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/signin",
  },
  {
    path: "/dashboard-agv-lidar",
    name: "Dashboard Agv Lidar",
    component: DashboardDefault,
  },
  {
    path: "/dashboard-agv-line-follower",
    name: "Dashboard Agv Line Follower",
    component: DashboardSwitch,
  },
  {
    path: "/agv-lidar",
    name: "AGV Lidar",
    component: TableDataAgvLidar,
  },
  {
    path: "/agv-line-follower",
    name: "AGV Line Follower",
    component: TableDataAgvLineFollower,
  },
  {
    path: "/station-agv-lidar",
    name: "Station AGV Lidar",
    component: TableDataStationAgvLidar,
  },
  {
    path: "/station-agv-line-follower",
    name: "Station AGV Line Follower",
    component: TableDataStationAgvLineFollower,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/todo",
    name: "To Do List",
    component: Todo,
  },
  {
    path: "/edit-todo/:id", 
    name: "Edit Todo",
    component: EditTodo,
    props: true, 
  },
  {
    path: "/todo-form",
    name: " To Do Form",
    component: ToDoForm,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

// membuat router 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// Membuat authorizaztion untuk halaman public dan signed user only yang tokennya disimpan di cookies
router.beforeEach((to, from, next) => {
  const publicPages = ["/signin", "/signup", "/dashboard-agv-lidar", "/dashboard-agv-line-follower"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = Cookies.get("user"); 

  // jika mengakses halaman yang butuh authorization maka akan redirect ke halaman sign in
  if (authRequired && !loggedIn) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
