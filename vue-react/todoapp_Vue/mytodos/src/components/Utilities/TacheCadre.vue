<template>
  <div class="single-els" :key="todo._id">
    <div class="els">
      <div class="els-header">
        <p class="els-name">
          {{ user.username }}
        </p>
        <span class="els-date1">{{ convertDateFormat(date) }}</span>
      </div>
      <div>
        <h1 class="els-title">{{ title }}</h1>
      </div>
      <p class="els-descr">{{ descr }}</p>
      <div class="els-footer">
        <span class="footer-date">{{ convertDateFormat(createdAt) }}</span>
        <div v-if="user._id === userInfo._id" class="footer-btn">
          <button class="btn-red" @click="deleteTodoHandler(todo._id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              :stroke-width="1.5"
              stroke="currentColor"
              class="svg-els"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
          <button class="btn-green" @click="edictHandlerPost(todo)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              :stroke-width="1.5"
              stroke="currentColor"
              class="svg-els"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    descr: String,
    title: String,
    todo: Object,
    userInfo: Object,
    deleteTodoHandler: Function,
    edictHandlerPost: Function,
    isEdicted: Function,
    todoId: String,
    date: Date,
    createdAt: Date,
  },
  computed: {
    user() {
      return this.todo.user;
    },
  },

  methods: {
    convertDateFormat(inputDate) {
      const date = new Date(inputDate);
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = date.getUTCFullYear().toString().slice(2);
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped>
.single-els {
  display: grid;
  border-radius: 10px;
  background: #fff;
  box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.22),
    -3px -2px 7px rgba(72, 69, 69, 0.241);
  grid-auto-rows: auto;
  /* height: 400px; */
}

.els {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  flex-direction: column;
}

.els-header {
  display: flex;
  flex-direction: column;
}

.els-name {
  font-size: 1.2rem;
  color: #1e2f41;
  font-weight: 600;
  text-transform: capitalize;
}
.els-date1 {
  color: #b15a38;
}
.els-title {
  font-size: 1.8rem;
  font-weight: 600;
}

.els-descr {
  font-size: 1rem;
}

.els-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.footer-date {
  color: #0061b2;
}
.footer-btn {
  /* flex items-center space-x-2 */
  display: flex;
  align-items: center;
}

.btn-red {
  color: red;
  margin: 0px 4px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.btn-green {
  color: green;
  margin: 0px 4px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.svg-els {
  height: 20px;
  width: 20px;
}
</style>
