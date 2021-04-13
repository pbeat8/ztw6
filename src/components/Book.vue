<template>
  <div v-if="currentBook" class="edit-form">
    <h4>Book</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title"
          v-model="currentBook.title"
        />
      </div>
      <div class="form-group">
        <label for="author-id">Author ID</label>
        <input type="text" class="form-control" id="author-id"
          v-model="currentBook.author.id"
        />
      </div>

      <div class="form-group">
        <label for="pages">Pages</label>
        <input type="text" class="form-control" id="pages"
          v-model="currentBook.pages"
        />
      </div>
    </form>

    <br>
    <div class="buttons-container">
        <button class="badge badge-danger mr-2"
        @click="deleteBook"
        >
        Delete
        </button>

        <button type="submit" class="badge badge-success"
        @click="updateBook"
        >
        Update
        </button>
    </div>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an option...</p>
  </div>
</template>

<script>
import BookDataService from "../services/BookDataService";

export default {
  name: "Book",
  data() {
    return {
      currentBook: null,
      message: ''
    };
  },
  methods: {
    async getBook(id) {
        try {
        const response = await fetch("http://localhost:8080/books/"+id);
        const data = await response.json();
        this.currentBook = data;
        console.log("Books list fetch finished");
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },

    async updateBook() {
        const response = await fetch("http://localhost:8080/authors/"+this.currentBook.author.id);
        const authorResponse = await response.json();
        var authorData=authorResponse;
        var data = {
            id: this.currentBook.id,
            title: this.currentBook.title,
            author: authorData,
            pages: this.currentBook.pages,
        };
        BookDataService.update(this.currentBook.id, data)
            .then(response => {
            console.log(response.data);
            this.message = 'The Book was updated successfully!';
            })
            .catch(e => {
            console.log(e);
            });
    },

    deleteBook() {
    BookDataService.delete(this.currentBook.id)
        .then(response => {
        console.log(response.data);
        this.$router.push({ name: "Books" });
        })
        .catch(e => {
        console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getBook(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}

.buttons-container {
  max-width: 680px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
}
</style>