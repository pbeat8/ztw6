<template>
  <div id="app" class="small-container">
    <home />
    <router-view />
  </div>
</template>

<script>
 import Home from '@/components/Home.vue'
 
  export default {
    name: "app",
    components: {
      Home,
    },
  };
</script>

<style>

.small-container {
  max-width: 680px;
  margin: auto;
  align-content: center;
}
</style>

