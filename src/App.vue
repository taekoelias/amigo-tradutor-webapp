<template>
  <div id="app">
    <div class="container">
      
      <div class="jumbotron">
        <h1 class="display-4">{{title}}</h1>
      </div>

      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Home', params:{aba:1}}">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Idioma', params:{aba:2}}">Idioma</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
        </ul>
      </nav>

      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: 'Portal Amigo Tradutor'

    }
  }
}
</script>
