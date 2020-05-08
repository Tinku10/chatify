<template>
    <div class="relative h-max">
        <div  class="w-half middle bg-green-100 rounded p-4 flex ">
            <form class="containers">
                <input class="input w-64 h-1 bg-white " type="text" name="username" v-model="username">
                <input class="input w-64 h-1 bg-white " type="password" name="password" v-model="password">
                <input  class="input w-64 h-1 " id="submit" type="submit" value="Log in" @click.prevent="login">
            </form>
            <!-- <a href="http://localhost:8000/auth/google"><button>login</button></a> -->
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            username: null,
            password: null
        }
    },
    methods: {
        login(){
            let data = {
                username: this.username,
                password: this.password 
            }
            axios.post('http://localhost:8000/auth/login', data)
            .then((response) => {
                console.log(response);
                localStorage.setItem('token', response.data.token)
                this.$router.push({path: '/chatroom'})
                // this.$router.push({path: '/'});
            })
            .catch((errors) => {
                console.log(errors);
                // this.$router.push({path: '/'})
            })
        }
    }
}
</script>

<style scoped>
.main{
    color: rgb(141, 223, 228);
    font-size: 1.5rem;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: lighter;
    margin: 0px;
    padding: 2rem;
    text-align: center;
    align-content: center;
    
    /* border-radius: 0.2rem;
    border: 1px solid rgb(216, 213, 213); */
    
    /* border: 1px rgb(170, 168, 168) solid; 
    border-radius: 0.2rem; */
}

#first{
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    position: fixed;
}
.containers{
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    

}
p{
    font-size: 1rem;
    font-family: "Source Sans Pro", sans-serif;
    color: rgb(173, 170, 170);
    font-weight: lighter;
    width: 50vw;
    text-align: center;
}
input{
    /* width: 30rem;
    height: 1rem; */
    padding: 1.2rem;
    /* border: 1px solid rgb(184, 182, 182); */
    border-radius: 0.2rem;
    margin-top: 10px;
    /* box-shadow: 0 20px 30px -16px rgba(66, 66, 66, 0.2); */
    border: none;
    outline: none;

}

textarea{
    /* width: 50vw;
    height: 4vw; */
    border: 1px solid rgb(184, 182, 182);
    font: "Source Sans Pro", sans-serif;
    padding: 1.5vw;
    font-size: 1vw;
    font-weight: lighter;
    color:rgb(164, 165, 165);
    border-radius: 0.2rem;
    margin-top: 5px;
    box-shadow: 0 20px 30px -16px rgba(9,9,16,.2);
    border: none;
    outline: none;

}
#submit{
    margin-top: 3rem;
    /* width: 10rem;
    height: 3rem;; */
    font-size: 0.8rem;
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
    outline: none;
    color: rgb(243, 244, 245);
    margin-bottom: 4vw;
    border-radius: 0.2rem;
    background-color: rgb(141, 223, 228);
    border: none;

}
#submit:hover{
    margin-top: 3rem;
    /* width: 10rem;
    height: 3rem;; */
    font-size: 0.8rem;
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
    outline: none;
    color: rgb(141, 223, 228);
    margin-bottom: 4vw;
    border-radius: 0.2rem;
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(141, 223, 228);

}
.input{
    font: "Source Sans Pro", sans-serif;
    font-size: 0.8rem;
    /* font-weight: lighter; */
    color:rgb(164, 165, 165);
    /* border: solid 1px rgb(221, 218, 218); */
    outline: none;

}
input:hover{
    background-color: rgb(245, 243, 243);
    outline: none;
}
#bottom{
    font-family: 'Source Code Pro', sans-serif;
    font-size: 0.8rem;
    text-align: center;
    text-decoration: none;
    margin-right: 6px;
    margin-left: 6px;
    color: rgb(80, 78, 78);
}
.message{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
nav a{
    /* font-family: 'Playfair Display', serif; */
    font-family: 'La Belle Aurore', cursive;
    color: rgb(113, 212, 212);
    font-weight: lighter;
    padding: 1vw;
    font-size: 1.5vw;
}
#image{
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    filter: grayscale(100%)

}
.error{
    font-size: 0.8rem;
    color: rgba(245, 119, 97, 0.815);
}
.load{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    filter: opacity(60%);
}

</style>
