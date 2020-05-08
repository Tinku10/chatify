<template>
    <div>
        
        <div class="relative" v-if="user != null">
            <div class="absolute  h-full w-screen overlay z-10" v-if="createRoom" @click="createRoom=false"></div>
            <nav class=" w-screen shadow mb-5 p-4 border-none flex flex-row">
            <p class="ml-10 text-3xl m-auto lobster">Chatify</p>
            <img :src="getImage(user[0].username)" alt="" class="h-10 w-10 rounded-full bg-gray-100 mr-10">
            <!-- <a href="#" class="mr-10"><div class="h-10 w-10 rounded-full bg-gray-100"></div></a> -->
            </nav>
            <!-- <p>{{user}}</p> -->
            <div class="flex flex-row justify-center items-center mb-4" v-if="user">
                <div class="h-10 w-10 rounded-full mr-2 image-sign" @click="createRoom=true"></div>
                <p class="ml-2 font-light">Create a new Chatroom</p>
            </div>
            <div class="flex flex-wrap md:mt-10 p-4 w-half min-h-screen m-auto justify-evenly flex-shrink-0 " id="workspace" v-if="user">
                <div class="h-64 w-64  border-gray-400  rounded bg-gray-100 md:mr-10 md:ml-10 lg:mt-4 lg:mb-4 flex flex-col justify-around items-center relative ng" v-for="room in rooms.data" :key="room.id">
                    <p class=" h-1 bg-blue-300 w-64 top-0 absolute rounded-t"></p>
                    <p class="font-bold text-sm">{{room.room}}</p>
                    <router-link :to="{path: '/chatroom/chat', query: {username: user[0].username, room: room.room}}" v-if="room.users.length < room.capacity"><p class=" bg-blue-400 p-1 rounded w-12 font-white text-center" >Join</p></router-link>
                    <p v-else class=" bg-gray-400 p-1 rounded w-12 font-white text-center cursor-pointer">Join</p>
                    <div class="bg-white rounded p-4">

                        <div class="flex flex-row">
                            <p class="font-medium text-xs mr-2">Users</p>
                            <p class="font-thin text-xs ml-2">{{room.users.length}} / {{room.capacity}}</p>
                        </div>
                        <div class="flex flex-row">
                            <p class="font-medium text-xs mr-2">Admin</p>
                            <p class="font-thin text-xs ml-2">{{room.owner}}</p>
                        </div>
                    </div>
                </div>
                

            </div>

        </div>
        <div class="w-screen center lg:w-1/2 shadow lg:rounded  border p-10 bg-white z-50" v-if="createRoom">
            <div class="flex flex-row justify-center">
                <input type="text"  placeholder="Enter the name of the room" required class="h-10 w-2/3 pl-4 pr-4 border-gray-700 border-2 rounded focus:border-2 focus:bg-gray-100 focus:border-blue-500" v-model="roomName">
            </div>
            <div class="flex flex-col md:flex-row justify-center items-center mt-4 mb-4">
                <p class="font-medium text-lg ml-4 mr-4">Number of People</p>
                <div class="flex flex-row justify-center items-center">
                    <p @click="counterKeeper('n')" class="image-minus h-10 w-10 rounded ml-2 mr-2"></p>
                    <p class="ml-2 mr-2 text-3xl font-bold">{{counter}}</p>
                    <p @click="counterKeeper('p')" class="image-plus h-10 w-10 rounded ml-2 mr-2"></p>
                </div>
            </div>
            <div class="flex flex-row justify-center items-center mt-4 mb-4">
                <p class="font-medium text-lg ml-4 mr-4 border-gray-700 border-2 p-4 rounded cursor-pointer" id="nocpub" @click="show('public')">Public</p>
                <p class="font-medium text-lg ml-4 mr-4 border-gray-700 border-2 p-4 cursor-pointer rounded" id="nocpri" @click="show('private')">Private</p>
                <p class="font-medium text-lg ml-4 mr-4 border-gray-700  p-4 bg-green-200 cursor-pointer rounded" @click='goToChat()'>Create</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
export default {
    data(){
        return{
            user: null,
            createRoom: false,
            counter: 2,
            roomName: null,
            socket: io('localhost:8000', { transports: ['websocket'] }),
            rooms: []
        }
    },
    
    methods: {
        getUser(){
            axios.get('http://localhost:8000/api/user', {headers: { "content-type": "application/json",Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
                // console.log(response)
                this.user = response.data;
            }).catch((error) => {
                console.log(error)
            })
        },
        counterKeeper(res){
            if(res == 'p' && this.counter <10){
                this.counter++
            }else if(res == 'n'){
                if(this.counter >= 2){
                    this.counter--
                }
            }
        },
        show(data){
            if(data == 'public'){
                document.getElementById('nocpri').classList.remove('col')
                document.getElementById('nocpub').classList.add('col')
                
            }
            if(data == 'private'){
                document.getElementById('nocpub').classList.remove('col')
                document.getElementById('nocpri').classList.add('col')
                
            }
        },
        goToChat(){
            if(this.roomName != null){
                this.socket.emit('createRoom', {'room': this.roomName, 'username': this.user[0].username, 'capacity': this.counter});

                
                this.$router.push({path: '/chatroom/chat', query: {username: this.user[0].username, room: this.roomName }})

            }
        },
        getRooms(){
            axios.get('http://localhost:8000/api/rooms').then((response) => {
                    this.rooms = response;
                }).catch((error) => {
                    console.log(error);
                })
            setInterval(() => {
                axios.get('http://localhost:8000/api/rooms').then((response) => {
                    this.rooms = response;
                }).catch((error) => {
                    console.log(error);
                })

            }, 10000)
        },
        getLink(name){
            return '/chatroom/chat?u=' + btoa(this.user[0].username)+ '&r='+ btoa(name)
            // return '/chatroom/chat?username=' + this.user[0].username + '&room=' + name;

        },
        getImage(data){
            return 'https://api.adorable.io/avatars/285/'+ data +'@adorable.png'
        }
    },
    mounted(){
        this.getUser();
        this.getRooms();
        // alert(btoa('username=abc&room=xyz'))
    }
}
</script>

<style lang="stylus" scoped>

</style>