<template>
  <div class="submit-form">
    <div v-if="!submitted">
        <div class="form-group">
            <label for="title">Title</label>
            <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="Book.title"
            name="title"
            />
        </div>

        <div class="form-group">
            <label for="author-id">Author ID</label>
            <input
            class="form-control"
            id="author-id"
            required
            v-model="Book.authorId"
            name="author"
            />
        </div>

        <div class="form-group">
            <label for="pages">Pages</label>
            <input
            class="form-control"
            id="pages"
            required
            v-model="Book.pages"
            name="pages"
            />
        </div>
        <br>
      <button @click="saveBook" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newBook">Add another book</button>
    </div>
  </div>
</template>

<script>
import BookDataService from "../services/BookDataService";

export default {
  name: "add-book",
  data() {
    return {
      Book: {
        id: null,
        title: "",
        authorId: 0,
        pages: 0,
        published: false
      },
      submitted: false
    };
  },
  methods: {
    async saveBook() {
        const response = await fetch("http://localhost:8080/authors/"+this.Book.authorId);
        const authorResponse = await response.json();
        var authorData=authorResponse;
        console.log(authorData);
        var data = {
            id: this.Book.id,
            title: this.Book.title,
            author: authorData,
            pages: this.Book.pages,
        };

        BookDataService.create(data)
            .then(response => {
            this.Book.id = response.data.id;
            console.log(response.data);
            this.submitted = true;
            })
            .catch(e => {
            console.log(e);
            });
    },
    
    newBook() {
      this.submitted = false;
      this.Book = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>