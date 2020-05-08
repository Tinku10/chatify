<template>
    <div>
          <p class="ml-4 mr-4 mt-4 mb-10 text-center">Users</p>
          <div v-for="user in room.data.users" :key="user"> 
            <div class="flex flex-row items-center justify-start ml-4 mr-4 mt-4 mb-4"> 
              <img :src="getImage(user)" alt="" class="h-10 w-10 rounded-full mr-2">
              <p>{{user}}</p>
            </div>
          </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
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
        }, 20000)
    },
    getImage(data){
            return 'https://api.adorable.io/avatars/285/'+ data +'@adorable.png'
    }
    },
    mounted(){
        this.getUsers();
    }
}
</script>

<style lang="stylus" scoped>

</style>