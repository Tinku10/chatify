<template>
  <div>
    <div class=" bg-gray-200 ">
      <div class="absolute  h-full w-screen overlay z-10 block lg:hidden" v-if="sidemenu" @click="sidemenu=false"></div>
      <div class=" w-screen md:flex md:flex-row relative md:static">
        <!-- <p v-if="message != null">{{message}}</p> -->
        <p class="h-10 w-10 bg-blue-200 fixed right-0 rounded-full lg:hidden block"  @click="sidemenu=true"></p>
        <sidebar  class="w-64 absolute lg:static lg:w-1/3 bg-white min-h-screen z-20 lg:z-0 lg:bg-gray-100 lg:block" v-if="sidemenu"></sidebar>
        {{sidemenu}}
        <div class="w-screen lg:w-2/3 bg-white  border-gray-500">
          <div  class="flex flex-col">
          <div class="height-90 overflow-y-scroll" id="chats"> 
            <div v-for="(message, index) in messages" :key="index" class="mt-2 mb-2" >
              <!-- <div class="p-2 mr-4 ml-4 mt-4 mb-4 text-center" v-if="message.username=='@chatify'">
                <span class="ml-2 mr-2 font-bold text-xs mt-2 mb-2">{{message.username}} </span>
                <span id="chats" class="ml-2 mr-2 font-normal text-base mt-2 mb-2" >{{message.message}}</span>

              </div> -->
              
                <div class="w-2/3 bg-blue-200  rounded float-right mr-4 ml-4 mt-1 mb-1" v-if="message.username == $route.query.username">
                  <p class="ml-4 mr-4 font-bold text-xs mt-2 mb-2">{{message.username}} </p>
                  <p  class="ml-4 mr-4 font-normal text-base mt-2 mb-2" >{{message.message}}</p>

                </div>
                <div class="w-2/3 bg-gray-200  rounded  mr-4 ml-4 mt-1 mb-1 float-left" v-else>
                  <p class="ml-4 mr-4 font-bold text-xs mt-2 mb-2">{{message.username}} </p>
                  <p  class="ml-4 mr-4 font-normal text-base mt-2 mb-2" >{{message.message}}</p>

                </div>

            </div>

            </div>
            <form @submit.prevent="sendmsg">
              <div  class="flex flex-row  mb-2 justify-center items-center mt-2">
                <input type="text" name="msg" class="h-10 w-4/5 ml-6  bg-gray-200  outline-none pl-4 pr-4" v-model="msg" @keydown="isbusy" placeholder="Enter your message..">
                <p class="h-10 w-1/5 mr-6 send outline-none" @click.prevent="sendmsg"></p>
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
      socket: io('localhost:8000/', { transports: ['websocket'] })
    }
  },
  methods: {
    sendmsg(){
      if(this.msg !=null){
        this.socket.emit('chat',  {message: this.msg, username: this.$route.query.username, room: this.$route.query.room});
        this.msg = null;

      }
      
    },
    
    isbusy(){
      this.socket.emit('typing',  {
        message: 'Someone is typing..'
      })
    },
    checkSize(){
      // alert('called');
      if(document.documentElement.clientWidth < 1024){
        return true
      }
      return false
    },
    
    
   
  },
  
  mounted(){
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


    this.socket.on('errormsg', (data) => {
      console.log(data)
      this.$router.push({path: '/chatroom'})
    })

    this.socket.emit('joinRoom', {
      username: this.$route.query.username,
      room: this.$route.query.room
    })

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

    // this.getUsers();
  },
}
</script>

<style>

</style>
