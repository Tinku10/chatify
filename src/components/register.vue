<template>
    <div class="relative h-max">
        <div class=" w-fixed middle bg-green-100 rounded p-4">
            <!-- <nav v-if="!off" class="h-30 w-full p-2 navbar-color">
                <router-link  to="/" style="text-decoration: none" >
                    <span  id="image" class="bg-no-repeat p-4 mr-4 ml-2"></span>
                </router-link>
            </nav> -->
            <div id="first flex items-center  mb-8">
                    <h1 class="main " v-if="!off">Sign Up</h1>
            
                    <div v-if="!off">
                        <ValidationObserver v-slot="{invalid}">
                        <form v-on:submit.prevent="mutate(); off=true" class="containers">
                            <ValidationProvider rules="required" v-slot="{errors}" class="grid-flow-col" >
                                <input class="input w-64 h-1 bg-white " type="text" placeholder="Name"  name="name" v-model="name">
                                <div class="error">{{errors[0]}}</div>
                            </ValidationProvider>
                            <ValidationProvider rules="required" v-slot="{errors}">
                                <input class="input w-64 h-1 bg-white " type="text" placeholder="Username"   name="username" v-model="username">
                                <div class="error">{{errors[0]}}</div>
                            </ValidationProvider>
                            <ValidationProvider rules="email|required" v-slot="{errors}">
                                <input class="input w-64 h-1 bg-white " type="email" placeholder="Email ID"  name="email" v-model="email">
                                <div class="error">{{errors[0]}}</div>
                            </ValidationProvider>
                            <!-- <ValidationObserver class="flex-col"> -->
                                <ValidationProvider  rules="minCh|upperCase|lowerCase|number|password:@confirm|required" v-slot="{errors}">
                                    <input class="input w-64 h-1 bg-white " type="password" placeholder="Password" name="password" v-model="password">
                                    <div class="error">{{errors[0]}}</div>
                                </ValidationProvider>
                                <ValidationProvider name="confirm" rules="required" v-slot="{ errors }">
                                    <input class="input w-64 h-1 bg-white " type="password" placeholder="Confirm Password" name="repassword" v-model="repassword">
                                    <div class="error">{{errors[0]}}</div>
                                </ValidationProvider>
                            <!-- </ValidationObserver> -->
                            <button id="submit" class="w-24 h-10" :disabled="invalid">REGISTER</button>
                        </form>
                        </ValidationObserver>
                    </div>
                    <div v-else class="flex flex-row justify-center bg-white">
                        <p v-if="error">{{error}}</p>
                        <p v-else>Creating your account..</p>
                    </div>
                        
                    <!-- <input id="submit" type="submit" value="REGISTER"> -->
                <div class="message flex flex-wrap" v-if="!off">
                    <h4 id="bottom">Already have an account?</h4>
                    <h4 id="bottom"><router-link to="/login" style="text-decoration: none; color: rgb(113, 212, 212)">Log In</router-link></h4>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            name: "",
            username: "",
            email: "",
            password: "",
            repassword: "", 
            user: [],
            off: false
        }
    }, 
    methods: {
        onDone(){
            // this.user = val
            this.$router.push({path: '/login'});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    background: url('../../public/quote-gray.svg');
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
