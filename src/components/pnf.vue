<template>
    <div class="center flex flex-col justify-center items-center">
        <div class="flex flex-wrap">
            <p class="text-large text-gray-600  ml-4 mr-4 lobster">4</p>
            <p class="text-large text-gray-600  ml-4 mr-4 lobster">0</p>
            <p class="text-large text-gray-600  ml-4 mr-4 lobster">4</p>
        </div>
        <p class="text-2xl text-gray-800 mt-4 mb-10">You are lost</p>
        <div class="flex flex-row ">
            <router-link :to="{path: '/chatroom'}"><button class="shadow rounded h-8 w-40 text-gray-600 ml-2 mr-2 bg-white">Go back Home</button></router-link>
            <router-link :to="{path: '/login'}"><button class="shadow rounded h-8 w-40  text-gray-600 bg-white  ml-2 mr-2">Log in</button></router-link>

        </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>