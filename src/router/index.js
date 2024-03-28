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
import AGVLidar from "../views/agv-lidar/AGV.vue";
import AGVLidarForm from "../views/agv-lidar/AGVForm.vue";
import EditAGVLidar from "../views/agv-lidar/EditAGV.vue";
import AGVLineFollower from "../views/agv-line-follower/AGV.vue";
import AGVLineFollowerForm from "../views/agv-line-follower/AGVForm.vue";
import EditAGVLineFollower from "../views/agv-line-follower/EditAGV.vue";

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

  //AGV Lidar Route
  {
    path: "/add-agv-lidar-form",
    name: "Add AGV Lidar",
    component: AGVLidarForm,
  },
  {
    path: "/edit-agv-lidar/:id", 
    name: "Edit AGV Lidar",
    component: EditAGVLidar,
    props: true, 
  },
  {
    path: "/agv-lidar-form",
    name: "AGV Lidar",
    component: AGVLidar,
  },
  //AGV Line Follower Route
  {
    path: "/add-agv-line-follower-form",
    name: "Add AGV Line Follower",
    component: AGVLineFollowerForm,
  },
  {
    path: "/edit-agv-line-follower/:id", 
    name: "Edit AGV Line Follower",
    component: EditAGVLineFollower,
    props: true, 
  },
  {
    path: "/agv-line-follower-form",
    name: "AGV Line Follower Form",
    component: AGVLineFollower,
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
