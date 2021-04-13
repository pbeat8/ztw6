<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Books List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(Book, index) in Books"
          :key="index"
          @click="setActiveBook(Book, index)"
        >
          {{ Book.title }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentBook">
          <div id="books-table">
            <table>
            <thead>
                <th>Book ID</th>
                <th>Title</th>
                <th>Pages</th>
                <th>Author ID</th>
                <th>Author </th>
                <th></th>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                <td>{{ book.id }}</td>
                <td>{{ book.title }}</td>
                <td>{{ book.pages }}</td>
                <td>{{ book.author.id }}</td>
                <td>{{ book.author.name }} {{ book.author.surname }}</td>
                <td><a class="badge badge-warning" :href="'/books/' + book.id"> Edit </a></td>
                </tr>
            </tbody>
            </table>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Books-list",
  data() {
    return {
      Books: [],
      currentBook: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    async retrieveBooks() {
      try {
        const response = await fetch("http://localhost:8080/books");
        const data = await response.json();
        this.books = data;
        console.log("Books list fetch finished");
        console.log(data);
        this.currentBook=data[0];
      } catch (error) {
        console.error(error);
      }
    },

    refreshList() {
      this.retrieveBooks();
      this.currentBook = null;
      this.currentIndex = -1;
    },

    setActiveBook(Book, index) {
      this.currentBook = Book;
      this.currentIndex = index;
    }
  },
  mounted() {
    this.retrieveBooks();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>