<template>
    <div class="overflow-x-hidden" :key="$route.fullPath">
        <div class="relative min-h-screen" >
            <div class="absolute  h-full w-screen overlay z-10" v-if="createRoom" @click="createRoom=false"></div>
            <nav class=" w-screen shadow p-4 border-none flex flex-row">
            <p class="ml-10 text-3xl m-auto lobster">Chatify</p>
            <img :src="getImage(user[0].username)" alt="" class="h-10 w-10 rounded-full bg-gray-100 mr-10 cursor-pointer" @click="menu= !menu" v-if="user">
            <img src="#" alt="" class="h-10 w-10 rounded-full bg-gray-100 mr-10" v-else>
            <!-- <a href="#" class="mr-10"><div class="h-10 w-10 rounded-full bg-gray-100"></div></a> -->
            </nav>
            <div class="absolute bg-white shadow p-5 right-0 rounded mr-4 ml-4" v-if="menu">
                <div class="flex flex-row justify-center items-center cursor-pointer" @click="logout">
                    <img src="../../public/logut.svg" alt="" class=" h-4 w-4">
                    <p class="text-xm text-gray-600 ml-4">Logout</p>

                </div>
            </div>
            <!-- <p>{{user}}</p> -->
            <div class="flex flex-row justify-center items-center mb-4 mt-5" v-if="user">
                <div class="h-10 w-10 rounded-full mr-2 image-sign" @click="createRoom=true"></div>
                <p class="ml-2 font-light">Create a new Chatroom</p>
            </div>
            <div class="flex flex-wrap md:mt-10 p-4 w-half min-h-screen m-auto justify-center flex-shrink-0 " id="workspace" v-if="user && rooms">
                <div class="" v-for="(room, index) in rooms.data" :key="index">
                    <div v-if="room.mode" class="h-64 w-64 mt-1 mb-1 border-gray-400  rounded bg-gray-100 md:mr-10 md:ml-10 lg:mt-4 lg:mb-4 flex flex-col justify-around items-center relative ng hover:shadow-lg">
                        <!-- <p class=" h-1 bg-blue-300 w-64 top-0 absolute rounded-t"></p> -->
                        <p class="font-bold text-sm bg-blue-300 absolute top-0 w-64 text-center rounded-t p-2 ">{{room.room}}</p>
                        <div class="h-48 flex flex-col items-center justify-center mt-1 mb-1">
                            <router-link :to="{path: '/chatroom/chat', query: {room: room.room, mode: room.mode}}" v-if="room.users.includes(user[0].username)"><p class=" bg-blue-400 p-1 rounded w-12 font-white text-center mt-2 mb-2" >Enter</p></router-link>
                            <router-link :to="{path: '/chatroom/chat', query: {room: room.room, mode: room.mode}}" v-else-if="room.users.length < room.capacity"><p class=" bg-blue-400 p-1 rounded w-12 font-white text-center mt-2 mb-2" >Join</p></router-link>
                            <p v-else class=" bg-gray-400 p-1 rounded w-12 font-white text-center cursor-pointer">Join</p>
                        <!-- <p class="font-bold text-sm">{{room.room}}</p> -->

                        </div>
                        <div class="bg-white rounded p-4 bottom-0 absolute mb-2 flex flex-col justify-evenly items-center">
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
                    
                    <div v-else class="h-64 w-64  border-gray-400  rounded bg-gray-100 md:mr-10 md:ml-10 mt-1 mb-1 lg:mt-4 lg:mb-4 flex flex-col justify-around items-center relative ng hover:shadow-lg">
                        <!-- <p class=" h-1 bg-green-400 w-64 top-0 absolute rounded-t"></p> -->
                        <p class="font-bold text-sm bg-green-200 absolute top-0 w-64 text-center rounded-t p-2 ">{{room.room}}</p>
                        <!-- <router-link :to="{path: '/chatroom/chat', query: {room: room.room, mode: room.mode}}" v-if="room.users.length < room.capacity"><p class=" bg-green-400 p-1 rounded w-12 font-white text-center" >Join</p></router-link> -->
                        <div class="flex flex-col items-center justify-center h-48 mt-1 mb-1">
                            <!-- <label  class="text-xs font-light mb-1">Enter the secret code</label> -->
                            <input type="text" placeholder="Invitation Code" v-model="joinlink[index]" class="pl-2 pr-2 text-xs p-2 w-56 text-center" >
                            <p  class=" bg-green-400 p-1 rounded  font-white text-center cursor-pointer mt-2 mb-2" @click="goto(index)" v-if="room.users.length < room.capacity">Private Join</p>
                            <p v-else class=" bg-gray-400 p-1 rounded  font-white text-center cursor-pointer mt-2 mb-2">Private Join</p>
                        </div>
                        <div class="bg-white rounded p-4 bottom-0 absolute mb-2 flex flex-col justify-evenly items-center">

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

        </div>
        <div class="w-screen center lg:w-1/2 shadow lg:rounded  border p-10 bg-white z-50" v-if="createRoom">
            <div class="flex flex-row justify-center">
                <input type="text"  placeholder="Enter the name of the room" required class="h-10 w-64 pl-4 pr-4 border-gray-600 border-2 rounded focus:shadow-outline focus:outline-none" v-model="roomName">
            </div>
            <div class="flex flex-col md:flex-row justify-center items-center mt-4 mb-4">
                <p class="font-medium text-lg ml-4 mr-4 text-gray-700">Capacity</p>
                <div class="flex flex-row justify-center items-center">
                    <p @click="counterKeeper('n')" class="image-minus h-10 w-10 rounded ml-2 mr-2"></p>
                    <p class="ml-2 mr-2 text-3xl font-bold text-gray-700">{{counter}}</p>
                    <p @click="counterKeeper('p')" class="image-plus h-10 w-10 rounded ml-2 mr-2"></p>
                </div>
            </div>
            <div class="flex flex-row justify-center items-center mt-4 mb-4">
                <p class="font-medium text-lg ml-4 mr-4 border-gray-700 border-2 p-2 rounded cursor-pointer" id="nocpub" @click="show('public')">Public</p>
                <p class="font-medium text-lg ml-4 mr-4 border-gray-700 border-2 p-2 cursor-pointer rounded" id="nocpri" @click="show('private')">Private</p>
                <p class="font-medium text-lg ml-4 mr-4 border-gray-700  p-4 bg-green-200 cursor-pointer rounded" @click='goToChat()'>Create</p>
            </div>
            <p @click="showinfo = !showinfo" class="text-center text-sm text-blue-600 cursor-pointer mb-2 ">Additional Information</p>
            <ul v-if="showinfo" class="flex flex-col justify-center items-start list-disc">
                <li class="text-sm text-gray-700 ml-4 mr-4 mt-1 mb-1">A new group created is visible to every authenticated user.</li>
                <li class="text-sm text-gray-700 ml-4 mr-4 mt-1 mb-1">A group by default is public.</li>
                <li class="text-sm text-gray-700 ml-4 mr-4 mt-1 mb-1">Anyone can join a public group until the capacity is exhausted. </li>
                <li class="text-sm text-gray-700 ml-4 mr-4 mt-1 mb-1">Private groups can be joined only by sharing the url or using the Invitation Code present at the bottom left corner of the group.</li>
                <li class="text-sm text-gray-700 ml-4 mr-4 mt-1 mb-1">A group is deleted after everyone leaves.</li>
            </ul>
        </div>
    <foot class="overflow-hidden"></foot>
    
    </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
import foot from '../components/footer'
export default {
    components: {
        foot
    },
    data(){
        return{
            user: null,
            createRoom: false,
            counter: 2,
            roomName: null,
            socket: io('http://localhost:8000', { transports: ['websocket'] }),
            // socket: io('localhost:8000', { transports: ['websocket'] }),
            rooms: [],
            menu: false,
            joinlink: new Array().fill(null),
            showinfo: false,
            publicgr: 'true'
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
                this.publicgr = 'false'
                
            }
        },
        goToChat(){
            if(this.roomName != null){
                let secret = null
                if(this.publicgr =='false'){
                    secret = this.generateId();
                }
                console.log(secret)
                this.socket.emit('createRoom', {'room': this.roomName, 'username': this.user[0].username, 'capacity': this.counter, mode: this.publicgr, key: secret});
                if(secret){
                    this.$router.push({path: '/chatroom/chat', query: {room: this.roomName, mode: this.publicgr, k: secret }})

                }else{
                    this.$router.push({path: '/chatroom/chat', query: {room: this.roomName, mode: this.publicgr}})
                }

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

            }, 5000)
        },
        getLink(name){
            return '/chatroom/chat?u=' + btoa(this.user[0].username)+ '&r='+ btoa(name)
            // return '/chatroom/chat?username=' + this.user[0].username + '&room=' + name;

        },
        getImage(data){
            data = data.slice(0, 5)
            return 'https://api.adorable.io/avatars/285/'+ data +'@adorable.png'
        },
        goto(index){
            // let p = atob(this.$refs.index)
            // alert(p);
            let p = atob(this.joinlink[index])
            this.$router.push({path: p})
        },
        randomStr(len, arr) { 
            var ans = ''; 
            for (var i = len; i > 0; i--) { 
                ans += arr[Math.floor(Math.random() * arr.length)]; 
            } 
            return ans; 
        }, 
        generateId(){
            let key = this.randomStr(20, '1234567890abcfdgddKhTBSJS');
            return key;
        },
        logout(){
            localStorage.removeItem('token');
            this.$router.push({path: '/'})
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