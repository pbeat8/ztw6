import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/books",
      name: "books",
      component: () => import("./components/BooksList")
    },
    {
      path: "/books/:id",
      name: "book-details",
      component: () => import("./components/Book")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddBook")
    }
  ]
});