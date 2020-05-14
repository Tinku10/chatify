<template>
    <div class="relative min-h-screen">
        <div  class=" bg-white-100 border-2 border-gray-100 rounded p-4 pl-8 pr-8 max-w-xs flex flex-col items-center r-center shadow">
            <router-link :to="{path: '/'}"><h1 class="lobster text-3xl text-gray-700 font-medium mb-2 mt-2">Chatify</h1></router-link>
            <form class="flex flex-col justify-center items-start">
                <label class="font-bold text-xs mt-2 mb-1 text-gray-500">Username</label>
                <input class="input w-64 h-8 bg-white border-2 border-gray-200 rounded font-normal text-sm pl-2 pr-2   focus:outline-none  focus:shadow-outline" type="text" name="username" v-model="username" placeholder="Type your username">
                <label for="" class="font-bold text-gray-500 text-xs mt-2 mb-1">Password</label>
                <input class="input w-64 h-8 bg-white border-2 border-gray-200 rounded font-normal text-sm pl-2 pr-2  focus:outline-none  focus:shadow-outline" type="password" name="password" v-model="password" placeholder="Type your password">
                <input  class="input w-64 h-10 bg-blue-600 text-white rounded mt-6 mb-2 cursor-pointer shadow outline-none border-none" id="submit" type="submit" value="Log in" @click.prevent="login">
            </form>
            <p v-if="error" class="text-xs text-red-400 mt-2 mb-2">Either Username or Password is incorrect</p>

            <div class="flex flex-col mt-4 mb-4 justify-center items-center cursor-pointer">
                <div class="flex flex-row justify-around items-center">
                    <p class=" border-t-2 border-gray-300 w-16 h-5 mr-2 ml-2"></p>
                    <p class="text-center font-bold text-xs mb-4 text-gray-500">OR</p>
                    <p class=" border-t-2 border-gray-300 w-16 h-5 mr-2 ml-2"></p>
                </div>
                <a href="https://chatify-back.herokuapp.com/auth/google/">
                    <div class="flex flex-row shadow rounded h-10 w-64 justify-center items-center" @click="google()">
                        <p class="google p-3 bg-white rounded-sm ml-1 mr-2 h-10 w-10 mt-1 mb-1"></p>
                        <p class="font-medium text-sm">Sign in with Google</p>
                    </div>
                </a>
                
            </div>
            <div class="flex flex-col justify-center items-center mt-6 mb-2">
                <p class="text-xm">Don't have an account?</p>
                <router-link :to="{path: '/register'}" class="text-base font-bold text-blue-600">Sign up</router-link>

            </div>
            <!-- <a href="https://chatify-back.herokuapp.com//auth/google"><button>login</button></a> -->
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            username: null,
            password: null,
            error: false
        }
    },
    methods: {
        login(){
            let data = {
                username: this.username,
                password: this.password 
            }
            axios.post('https://chatify-back.herokuapp.com/auth/login', data)
            .then((response) => {
                if(response){
                    localStorage.setItem('token', response.data.token)
                    this.$router.push({path: '/chatroom'})

                }
                // this.$router.push({path: '/'});
            })
            .catch((errors) => {
                // console.log(errors);
                if(errors){
                    this.error = true

                }
                // this.$router.push({path: '/'})
            })
        },
       
    },
    mounted(){
        if(this.$route.query.token){
            localStorage.setItem('token', this.$route.query.token);
            this.$router.push({path: '/chatroom'})
        }
    }
}
</script>

<style scoped>


</style>
