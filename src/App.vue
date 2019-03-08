<template>
  <div id="app">
    <div class="container">

      <div class="jumbotron">
        <h1 class="display-4">{{title}}</h1>
      </div>

      <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'Home', params:{aba:'home'}}">Home</router-link>
          </li>
        </ul>
      </nav>

      <br>
      <router-view/>

      <br>

      <nav class="navbar navbar-expand-sm bg-dark navbar-dark" >
        <span class="navbar-brand mb-0 h1">Amigo Tradutor</span>
      </nav>
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
