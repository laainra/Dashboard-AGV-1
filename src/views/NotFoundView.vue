<template>
  <div class="container">
    <div class="number">404</div>
    <div class="text">Oops! Page not found</div>
    <div class="subtext">
      The page you are looking for might have been removed or is temporarily
      unavailable.
    </div>
    <router-link to="/tables" class="back-link">Back to MyToDo</router-link>
  </div>
</template>

<style scoped>
.container {
  background: white;
  text-align: center;
  padding: 9rem;
  border-radius: 10px;
}

.number {
  font-size: 6rem;
  font-weight: bold;
  color: #e74c3c;
}

.text {
  font-size: 2rem;
  font-weight: bold;
  color: #707070;
}

.subtext {
  font-size: 1rem;
  color: #777;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.back-link:hover {
  color: #258cd1;
}
</style>
