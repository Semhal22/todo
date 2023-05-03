import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex);
axios.defaults.baseURL = 'http://localhost:3000/api';

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: [],
        token: localStorage.getItem('access_token') || null,
        loggedUserId: localStorage.getItem('id') || null
    },
    getters: {
        isLogged(state){
            return state.token !== null;
        },
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length;
        },
        filteredTodos(state) {
            if (state.filter == 'all') return state.todos
            else if (state.filter == 'active') return state.todos.filter(todo => !todo.completed)
            else if (state.filter == 'completed') return state.todos.filter(todo => todo.completed)
            return state.todos
        },
        oneCompleted(state) {
            return state.todos.filter(todo => todo.completed).length > 0;
        },
        thereAreTodos(state) {
            return state.todos.length > 0;
        }
    },
    mutations: {
        login(state, token){
            state.token = token;
        },
        logout(state){
            if(state.token != null){
                state.token = null;
                state.id = null;
                localStorage.removeItem('access_token');
                localStorage.removeItem('id');
            }
            return state.token
        },
        getTodos(state,todos){
            state.todos = todos;
        },
        addTodo(state,todo){
            state.todos.push(todo)
        },
        deleteTodo(state,id){
            state.todos = state.todos.filter(todo => todo._id !== id);
        },
        updateTodo(state, todo){
            const index = state.todos.findIndex(item => item._id == todo._id);
            state.todos.splice(index, 1, todo)
        },
        changeFilter(state,filter){
            state.filter = filter
        },
        checkTodos(state,checked){
            state.todos.forEach(todo => todo.completed = checked)

        },
        clearCompleted(state){
            state.todos= state.todos.filter(todo => !todo.completed);
        }
    },
    actions: {
        login(context,user){
            return new Promise((resolve,reject) => {
                axios.post('/login',{
                    email: user.email,
                    password: user.password
                })
                    .then((response)=> {
                        const user = response.data;
                        localStorage.setItem('access_token',user.access_token);
                        localStorage.setItem('id', user.id);
                        context.commit('login', user.access_token);
                        resolve(user.access_token);
                    })
                    .catch((error) => {
                        console.error(error.message);
                        reject(error);
                    })
            })
        },
        register(context,user){
            return new Promise((resolve,reject)=> {
                axios.post('/users',{
                    name: user.name,
                    email: user.email,
                    password: user.password 
                })
                    .then((response)=> {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.error(error.message);
                        reject(error.message);
                    })
            })
        },
        retrieveTodos(context){
            axios.defaults.headers.common['id'] = context.state.loggedUserId;
            axios.defaults.headers.common['auth'] = context.state.token;
  
            axios.get('/todos')
                .then((response)=> {
                    context.commit('getTodos', response.data);
                })
                .catch((error) => {
                    console.error(error.message);
                })
        },
        addTodo(context,todo){
            axios.post('/todos',{
                task: todo.task,
                completed: false,
                editing: false,
                user: context.state.loggedUserId
            })
                .then((response)=> {
                    console.log(response);
                    context.commit('addTodo', response.data);
                })
                .catch((error) => {
                    console.error(error.message);
                })
        },
        deleteTodo(context,id){
            axios.delete(`/todos/${id}`)
                .then((response)=> {
                    console.log(response);
                    context.commit('deleteTodo', id);
                })
                .catch((error) => {
                    console.error(error.message);
                })
        },
        updateTodo(context,todo){
            console.log('updating');
            axios.put(`/todos/${todo._id}`,{
                task: todo.task,
                completed: todo.completed
            })
            .then(response => {
                console.log(response.data);
                context.commit('updateTodo', response.data)
            })
            .catch((error) => {
                console.log(error.message);
            })
        },
        changeFilter(context,filter){
            setTimeout(()=> {
                context.commit('changeFilter',filter)
            },500)
        },
        checkTodos(context,checked){
            axios.patch('/todos/checkAll',{
                completed: checked
            })
            .then(response => {
                console.log(response.data);
                context.commit('checkTodos', checked)
            })
            .catch((error) => {
                console.log(error.message);
            })
        },
        clearCompleted(context){
            setTimeout(()=> {
                context.commit('clearCompleted')
            },1000)
        }
    }
});