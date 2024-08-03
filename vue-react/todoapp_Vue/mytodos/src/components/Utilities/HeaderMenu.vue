<template>
  <div class="header-menu">
    <ul class="menu-list">
      <li class="menu-els">
        <router-link class="logo-link" to="/">ToDoApp</router-link>
      </li>
      <li class="menu-els">
        <button
          v-if="user && user.token"
          @click="logOutHandler"
          class="logout-button"
        >
          Ausloggen
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    logOutHandler() {
      localStorage.removeItem('user');
      window.location.reload();
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
  },
};
</script>

<style scoped>
.header-menu {
  padding: 1rem 1.75rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #ffff;
}

.menu-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-els {
  list-style: none;
}

.logo-link {
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
}

.logout-button {
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.375rem;
  background-color: #ce0078;
  color: #fff;
  padding: 0.5rem 2rem;
  cursor: pointer;
  border: none;
}
</style>
