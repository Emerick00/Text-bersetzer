<template>
  <div class="my-grid">
    <div class="grid-els">
      <TacheCadre
        :todoId="todoId"
        v-for="todo in todos"
        :key="todo._id"
        :isEdicted="isEdicted"
        :descr="todo.description"
        :title="todo.title"
        :date="todo.date"
        :createdAt="todo.createdAt"
        :todo="todo"
        :userInfo="user"
        :deleteTodoHandler="deleteTodoHandler"
        :edictHandlerPost="edictHandlerPost"
      />
    </div>
    <div class="my-form-container">
      <div class="my-form-bg">
        <div v-if="isloading" class="my-loading">
          <span>lädt...</span>
        </div>
        <form @submit.prevent="submitHandler" class="my-form">
          <input
            v-if="user && user.token"
            v-model="username"
            type="text"
            placeholder="Benutzername"
            class="my-input"
          />
          <input
            v-if="!islogin"
            v-model="username"
            type="text"
            placeholder="Benutzername"
            class="my-input"
          />
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="my-input"
          />
          <input
            v-model="password"
            type="password"
            placeholder="passwort"
            class="my-input"
          />
          <input
            v-if="!islogin"
            v-model="Bestätigen Sie das passwort"
            type="password"
            placeholder="Bestätigen Sie das passwort"
            class="my-input"
          />
          <p v-if="islogin && !user.token" class="mess-log">
            Haben Sie schon ein Konto?
            <span class="log-hand" @click="changeHadler">Créer un compte</span>
          </p>
          <p v-if="!islogin && !user.token" class="mess-log">
            Haben Sie schon ein Konto ?
            <span class="log-hand" @click="changeHadler">Connectez-vous</span>
          </p>
          <p v-if="user && user.token">
            <button @click="EdictHandler" class="my-button">
               Profil bearbeiten
            </button>
          </p>
          <p v-else-if="!islogin">
            <button @click="submitHandler" class="my-button">Sich registrieren</button>
          </p>
          <p v-else>
            <button @click="submitHandler" class="my-button">Connexion</button>
          </p>
        </form>
      </div>
      <div v-if="user && user.token" class="add-contaner">
        <form @submit.prevent="todoHanlder" class="submit-form">
          <input
            v-model="title"
            type="text"
            placeholder="Title"
            class="my-input"
          />
          <input
            v-model="date"
            type="date"
            placeholder="Bearbeitungsdatum"
            class="my-input"
          />
          <textarea
            v-model="description"
            rows="6"
            placeholder="Beschreibung"
            class="my-input"
          ></textarea>
          <button type="submit" class="my-button">
            {{ isEdict ? 'Aufgabe bearbeiten' : 'Aufgabe hinzufügen' }}
          </button>
        </form>
      </div>
      <div v-if="user && user.token" class="my-operation-bg">
        <div class="my-header">
          <h2 class="my-title">Operationsprotokoll</h2>
        </div>
        <div v-for="opera in operation" :key="opera._id" class="my-operation">
          <div class="my-opera-details">
            <div class="my-opera-detail">
              <span class="my-opera-label">Arten Arten von Operationen::</span>
              <span>{{ opera.operation }}</span>
            </div>
            <div class="my-opera-detail">
              <span class="my-opera-label">Date:</span>
              <span>{{ convertDateFormat(opera.timestamp) }}</span>
            </div>
            <div class="my-opera-detail">
              <span class="my-opera-label">Benutzer:</span>
              <span>{{ opera.user.username }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TacheCadre from '../components/Utilities/TacheCadre.vue';

export default {
  components: {
    TacheCadre,
  },

  data() {
    return {
      image: null,
      uploading: false,
      islogin: true,
      isloading: false,
      loading: true,
      createLoading: false,
      todos: [],
      todoid: null,
      operation: [],
      description: null,
      title: null,
      date: null,
      email: null,
      username: '',
      password: null,
      confirmPassword: null,
      isEdict: false,
      user: {},
      url: 'http://127.0.0.1:5000',
    };
  },
  methods: {
    changeHadler() {
      this.islogin = !this.islogin;
    },
    handleImageChange(e) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      this.uploading = true;

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      axios
        .post(this.url + '/api/upload', formData, config)
        .then(({ data }) => {
          this.image = data;
          this.uploading = false;
        })
        .catch((error) => {
          console.log(error);
          this.uploading = false;
        });
    },
    submitHandler(e) {
      e.preventDefault();

      if (this.islogin) {
        const user = {
          email: this.email,
          password: this.password,
        };

        this.isloading = true;
        axios
          .post(this.url + '/api/users/login', user)
          .then(({ data }) => {
            localStorage.setItem('user', JSON.stringify(data));
            this.isloading = false;
            window.location.reload();
            this.isloading = false;
          })
          .catch((error) => {
            this.isloading = false;
            console.log(error);
          });
      } else {
        const newUser = {
          email: this.email,
          username: this.username,
          password: this.password,
        };

        if (this.confirmPassword !== this.password) {
          alert('passwort ist nicht richtig');
        } else {
          this.isloading = true;
          axios
            .post(this.url + '/api/users/', newUser)
            .then(({ data }) => {
              localStorage.setItem('user', JSON.stringify(data));
              this.isloading = false;
              window.location.reload();
            })
            .catch((error) => {
              this.isloading = false;
              console.log(error);
            });
        }
      }
    },
    todoHanlder(e) {
      e.preventDefault();

      const newTodo = {
        description: this.description,
        title: this.title,
        date: this.date,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      };

      if (!this.isEdict) {
        this.createLoading = true;
        axios
          .post(this.url + '/api/todos', newTodo, config)
          .then(({ data }) => {
            this.todos.unshift(data);
            this.description = '';
            this.title = '';
            this.date = '';
            this.createLoading = false;
          })
          .catch((error) => {
            this.createLoading = false;
            console.log(error);
          });
      } else {
        this.createLoading = true;
        axios
          .put(`${this.url}/api/todos/${this.todoid}`, newTodo, config)
          .then(() => {
            this.isEdict = false;
            this.getTodoList();
            this.description = '';
            this.todoid = '';
            this.title = '';
            this.date = '';
            this.createLoading = false;
          })
          .catch((error) => {
            this.createLoading = false;
            console.log(error);
          });
      }
    },
    deleteTodoHandler(id) {
      if (window.confirm('Möchten Sie wirklich löschen?')) {
        const config = {
          headers: {
            Authorization: `Bearer ${this.user.token}`,
          },
        };

        axios
          .delete(`${this.url}/api/todos/${id}`, config)
          .then(() => {
            this.getTodoList();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    convertDateFormat(inputDate) {
      const date = new Date(inputDate);
      const day = date.getUTCDate().toString().padStart(2, '0');
      const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = date.getUTCFullYear().toString().slice(2);
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    },

    edictHandlerPost(post) {
      this.isEdict = true;
      this.todoid = post._id;
      this.description = post.description;
      this.title = post.title;
      this.date = post.date;
    },
    EdictHandler(e) {
      e.preventDefault();

      const config = {
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      };

      const user = {
        email: this.email,
        username: this.username,
        password: this.password,
      };

      this.isloading = true;
      axios
        .put(this.url + '/api/users', user, config)
        .then(({ data }) => {
          localStorage.setItem('user', JSON.stringify(data));
          this.isloading = false;
          window.location.reload();
          this.isloading = false;
        })
        .catch((error) => {
          this.isloading = false;
          console.log(error);
        });
    },
    getTodoList() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axios
        .get(this.url + '/api/todos', config)
        .then(({ data }) => {
          this.todos = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOperation() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axios
        .get(this.url + '/api/operation', config)
        .then(({ data }) => {
          this.operation = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {},
  created() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.password = this.user.password;
    this.email = this.user.email;
    this.username = this.user.name;
    this.loading = false;
    this.getTodoList();
    this.getOperation();
  },
};
</script>

<style scoped>
.my-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin: 2rem 0;
}

.grid-els {
  grid-column: span 5;
  display: grid;
  gap: 1rem;
  grid-auto-rows: 350px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.my-form-container {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.my-form-bg {
  background-color: #ffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.22),
    -3px -2px 7px rgba(72, 69, 69, 0.241);
}

.my-loading {
  text-align: center;
  font-weight: bold;
  margin: 1rem 0;
}

.my-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.my-input {
  padding: 0.75rem;
  border: 2px solid #c7b2b2;
  background-color: transparent;
  border-radius: 0.25rem;
  outline: none;
  margin: 5px 0px;
  resize: none;
}

.my-button {
  font-size: 1.2rem;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  color: white;
  background-color: #334693;
  cursor: pointer;
}

.my-operation-bg {
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.22),
    -3px -2px 7px rgba(72, 69, 69, 0.241);
}

.add-contaner {
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.22),
    -3px -2px 7px rgba(72, 69, 69, 0.241);
}

.submit-form {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.mess-log {
  padding: 0px;
  margin: 0px;
}
.log-hand {
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  color: #334693;
}

.my-header {
  background-color: #6600af;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.my-title {
  margin: 0;
}

.my-operation {
  padding: 1rem;
  margin-top: 1rem;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.my-opera-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.my-opera-label {
  font-weight: bold;
  font-size: 1.1rem;
}
</style>
