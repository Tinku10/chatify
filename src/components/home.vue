<template>
  <div class="home">
    <nav class="flex flex-row justify-end items-center mr-4 ml-4 mt-4 mb-4">
      <router-link :to="{path: '/login'}" class="ml-4 mr-4 text-base font-semibold text-blue-600">Log in</router-link>
      <router-link :to="{path: '/register'}"  class="ml-4 mr-4 text-base font-semibold text-blue-600">Sign up</router-link>
    </nav>
    <div class="center flex flex-col justify-center items-center" >
      <img src="../../public/chat.svg" class=" h-40 w-40  opacity-75">
      <h1 class="lobster text-large text-gray-700  z-10">Chatify</h1>

    </div>
  </div>
</template>

<script>
// .. imports removed for brevity

export default {
  name: "home",
  
  
};
</script>

<style scoped>
  /* html, body{
    background-image: url('../../public/hannah-wright-GIijSw25I5w-unsplash.jpg')
  } */
</style>