<template>
  <div id="home">
      <div class="list row">
        <div class="buttons-container">
            <button @click="$router.push({
            name: 'books'})">Get Books</button>  
            <button @click="$router.push({
            name: 'add'})">Add Book</button> 
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style scoped>
.buttons-container {
  max-width: 680px;
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
}
</style>