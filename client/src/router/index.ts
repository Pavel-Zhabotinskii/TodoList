import Login from "../pages/Login";
import Registration from "../pages/Registration";
import TodoList from "../pages/TodoList";

export const routes = [
    { path: '/login', component: Login},
    { path: '/', component: Login},
    { path: '/registration', component: Registration},
    { path: '/to-do-list', component: TodoList}
]