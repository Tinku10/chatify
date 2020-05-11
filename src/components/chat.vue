<template>
  <div>
    <div class=" bg-gray-200 ">
      <div class="absolute  h-full w-screen overlay z-10 block lg:hidden" v-if="sidemenu" @click="sidemenu=false"></div>
      <div class=" w-screen md:flex md:flex-row relative md:static">
        <!-- <p v-if="message != null">{{message}}</p> -->
        <!-- {{sidemenu}} -->
        <p class="h-8 fixed w-8  lg:hidden block z-20  arrow  "  @click="makeSidemenu()"></p>
        <sidebar  class="w-64 absolute lg:static lg:w-1/3 bg-white min-h-screen z-20 lg:z-0 lg:bg-gray-100 lg:block" v-show="sidemenu"  v-bind:mode="$route.query.mode ">
          <template v-slot:id >
            <div class="flex flex-col justify-around bg-gray-200 p-1 " >
              <p class="bg-blue-400 text-sm font-white p-1 pl-1 pr-1 text-center ml-2 mr-2 rounded cursor-pointer" @click="showcode= !showcode">Invitation Code</p>
              <!-- <p class="text-xs font-sans mr-1 ml-1 text-center">Invitation Code</p> -->
              <p class="text-xs text-gray-700 mr-1 ml-1 break-words  ml-2 mr-2" v-show="showcode">{{code()}}</p>
            </div>
          </template>
        </sidebar>
        <div class="w-screen lg:w-2/3 bg-white  border-gray-500">
          <div  class="flex flex-col">
          <div class="height-90 overflow-y-scroll relative" id="chats"> 
              
            <div v-for="(message, index) in messages" :key="index" class="mt-4 mb-2 flex flex-col" >
              <!-- <div class="p-2 mr-4 ml-4 mt-4 mb-4 text-center" v-if="message.username=='@chatify'">
                <span class="ml-2 mr-2 font-bold text-xs mt-2 mb-2">{{message.username}} </span>
                <span id="chats" class="ml-2 mr-2 font-normal text-base mt-2 mb-2" >{{message.message}}</span>

              </div> -->
              
                <div class=" max-w-xs bgblue font-white rounded float-right mr-4 ml-4 mt-1 mb-1 self-end" v-if="message.username == user[0].username">
                  <p class="ml-4 mr-4 font-bold text-xs mt-1 mb-1">@{{message.username}} </p>
                  <p  class="ml-4 mr-4 font-normal text-base mt-1 mb-1 break-words" >{{message.message}}</p>
                </div>
                <div v-else-if="message.username == '@chatify'" class="self-center  mt-1 mb-1 bg-gray-100 rounded-full p-1">
                  <p class="ml-4 mr-4 font-normal text-xs break-words">{{message.message}}</p>
                </div>
                <div class="max-w-xs bggray  rounded  mr-4 ml-4 mt-1 mb-1 float-left self-start" v-else>
                  <p class="ml-4 mr-4 font-bold text-xs mt-1 mb-1">@{{message.username}} </p>
                  <p  class="ml-4 mr-4 font-normal text-base mt-1 mb-1 break-words" >{{message.message}}</p>

                </div>

            </div>

            <div v-if="busy" class="mt-1 mb-1 bg-gray-100 rounded-r-full p-1  max-w-xs absolute bottom-0 text-center m-auto">
                <p class="ml-4 mr-4 font-normal text-xs text-teal-400">{{busy.message}}</p>
            </div>
            </div>
            <form @submit.prevent="sendmsg">
              <div  class="flex flex-row  mb-2 justify-center items-center mt-2">
                <input type="text" name="msg" class="h-10 w-4/5 ml-6 mr-1 bg-gray-200  outline-none pl-4 pr-4 bre" v-model="msg" @keydown="isbusy" placeholder="Enter your message..">
                <p class="h-10 w-6 mr-6 ml-1 send outline-none" @click.prevent="sendmsg"></p>
              </div>
          </form>

          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import sidebar from '../components/sidebar'
import axios from 'axios'

export default {
  components: {
    sidebar
  },
  data(){
    return {
      msg: null,
      messages: [],
      me: false,
      sidemenu: false,
      busy: null,
      showcode: false,
      socket: io('https://chatify-back.herokuapp.com', { transports: ['websocket'] })
    }
  },
  methods: {
    sendmsg(){
      if(this.msg !=null && this.msg != ''){
        this.socket.emit('chat',  {message: this.msg, username: this.user[0].username, room: this.$route.query.room});
        this.msg = null;

      }
      this.busy = null;
      
    },
    
    isbusy(){
      this.socket.emit('typing',  {
        message: this.user[0].username+ ' is typing..',
        room: this.$route.query.room
      })
    },
    checkSize(){
      // alert('called');
      if(document.documentElement.clientWidth < 1024){
        return true
      }
      return false
    },
    getUser(){
          axios.get('https://chatify-back.herokuapp.com/api/user', {headers: { "content-type": "application/json",Authorization: "Bearer " + localStorage.getItem('token')}}).then((response) => {
              this.user = response.data;
              this.socket.emit('joinRoom', {
                username: this.user[0].username,
                room: this.$route.query.room
              })
          }).catch((error) => {
              console.log(error)
          })

      },
      code(){
        let s = '/chatroom/chat?room=' + this.$route.query.room + '&mode=' + this.$route.query.mode + '&k=' + this.$route.query.k
        // let s = this.$route.query.k
        return btoa(s)
      },
      makeSidemenu(){
        this.sidemenu = true;
        console.log(this.sidemenu)
      }
    
    
   
  },
  created(){
    
  },
  
  mounted(){
    this.getUser();

    window.addEventListener("resize", () => {
	// Get screen size (inner/outerWidth, inner/outerHeight)
        if(document.documentElement.clientWidth >= 1024){
          // console.log(this.sidemenu, 'first')
          this.sidemenu = true;
          // console.log(this.sidemenu)
        }else{
          this.sidemenu = false;
        }
    }, false);

    if(document.documentElement.clientWidth >=1024){
      this.sidemenu = true;
    }else{
      this.sidemenu = false;
    }


    this.socket.on('errormsg', (data) => {
      console.log(data)
      this.$router.push({path: '/chatroom'})
    })

    // this.socket.emit('joinRoom', {
    //   username: this.user[0].username,
    //   room: this.$route.query.room
    // })

    this.socket.on('chatMessage', (data) => {
      this.messages.push(data);
      this.busy = null;
      let element = document.getElementById('chats');
      element.scrollTop = element.scrollHeight;
    });
    
    this.socket.on('message', (data)=>{
      this.messages.push(data);
      let element = document.getElementById('chats');
      element.scrollTop = element.scrollHeight;
    })

    this.socket.on('busy', (data) => {
      this.busy = data;
    })

    

    // this.getUsers();
  },
}
</script>

<style>

</style>
