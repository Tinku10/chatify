<template>
    <div>
      <!-- {{room.data.owner}} {{mode}} -->
      <div v-if=" mode == 'false'" class="bottom-0 fixed w-64 lg:w-1/3">
        <slot name="id"></slot>
      </div>
      
      <div class="flex flex-row justify-center items-center">
        <p class="ml-4 mr-4 mt-6 mb-6 text-center">Users</p>
        <div v-if="mode == 'false'" class="bg-gray-600 rounded-full pl-2 pr-2 p-1">
          <p class="text-xs font-bold text-white">PRIVATE</p>
        </div>

      </div>
      <div v-for="user in room.data.users" :key="user" > 
        <div class="flex flex-row items-center justify-start ml-6 mr-6 mt-4 mb-4"> 
          <img :src="getImage(user)" alt="" class="h-10 w-10 rounded-full mr-2">
          <div class="flex flex-row justify-start items-center">
            <p>{{user}}</p>
            <p class=" text-xs font-bold bg-blue-400 font-white rounded-full pl-1 pr-1 p-1 ml-4" v-if="user==room.data.owner">Admin</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['owner', 'mode'],
    data(){
        return{
            room: null

        }
    },
    methods: {
        getUsers(){
      axios.get('http://localhost:8000/api/' + this.$route.query.room, {headers: { "content-type": "application/json",Authorization: "Bearer " + localStorage.getItem('token')}}).then((res) => {
        this.room = res
      }).catch((err) => {
        console.log(err)
      })
      setInterval(() => {
        axios.get('http://localhost:8000/api/' + this.$route.query.room, {headers: { "content-type": "application/json",Authorization: "Bearer " + localStorage.getItem('token')}}).then((res) => {
        this.room = res
        }).catch((err) => {
          console.log(err)
        })
        }, 10000)
    },
    getImage(data){
            return 'https://api.adorable.io/avatars/285/'+ data +'@adorable.png'
    },
    
    },
    
    mounted(){
        this.getUsers();
    }
}
</script>

<style lang="stylus" scoped>

</style>