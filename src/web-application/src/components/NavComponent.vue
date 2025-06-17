<template>
<!-- this file is obsolete. Keeping for posterity -->
<!-- Nav Bar now exists as a twig -->
  <div class="nav-bar">
      <ul>
          <li class="left-menu">Home</li>
          <li id="save-workspace" class="left-menu"><a href="#">Save</a><img :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'save.png' : require('@/assets/save.png')" alt="save icon"/></li>
          <li class="left-menu"><a href="#">Notes</a><img :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'edit.png' : require('@/assets/edit.png')" alt="image of a pencil"/></li>
          <li class="right-menu"><a :href= "logoutPage" >Logout</a></li>
          <li class="right-menu"><img :src="$store.state.imagePrefix ? $store.state.imagePrefix + 'user.png' : require('@/assets/user.png')" alt="generic user icon"/>
            <a href="#">{{ username }}</a>
        </li>
      </ul>
      <div class="modal"></div>
  </div>
</template>

<script>

export default {
    name: 'NavComponent',
    data(){
        return{
            username: '',
            logoutPage: '',
            src: '@/assets/edit.png',
        }
    },
    mounted()
    {
        this.username = window["__USER__"] || 'Username';
        this.logoutPage = window["__CONTENT__"] ? '/logout' : '#';
    },
    methods:
    {
    },
    computed: {
    }
}
</script>

<style scoped>
.nav-bar{
    margin: 0px;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #FFFFFF;
}

li img{
    height: 20px;
    width: 20px;
    padding: 0px 5px;
}

li{
    padding: 10px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.left-menu {
    float: left;
}

.right-menu {
    float: right;
}

li a {
    display: block;
    color: black;
    text-align: center;
    text-decoration: none;
}

li:hover {
    background-color: #EAEAEC;
}

.modal {
    display: none;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: black;
}
</style>