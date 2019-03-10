<template>
  <div class="app">
    <nav v-bind:class="menuSmall ? 'side-navbar shrink show-sm' : 'side-navbar'">
      <div class="side-navbar-wrapper">
        <!-- Sidebar Header    -->
        <div class="sidenav-header d-flex align-items-center justify-content-center">
          <!-- User Info-->
          <div class="sidenav-header-inner text-center">
            <img src="img/avatar-7.jpg" alt="person" class="img-fluid rounded-circle">
            <h2 class="h5">{{user_name}}</h2><span>{{user_profile}}</span>
          </div>
          <!-- Small Brand information, appears on minimized sidebar-->
          <div class="sidenav-header-logo">
            <a href="index.html" class="brand-small text-center">
              <strong>A</strong>
              <strong class="text-primary">T</strong>
            </a>
          </div>
        </div>
        <!-- Sidebar Navigation Menus-->
        <div class="main-menu">
          <h5 class="sidenav-heading" title="Conteúdo">Conteúdo</h5>
          <ul id="side-main-menu" class="side-menu list-unstyled">
            <li><router-link :to="{name:'Home'}"><i class="icon-home"></i>Início</router-link></li>
          </ul>
        </div>
        <div class="admin-menu">
          <h5 class="sidenav-heading" title="Administração">Administração</h5>
          <ul id="side-admin-menu" class="side-menu list-unstyled">
            <li>
              <router-link :to="{name:'Idioma', params:{aba:'idioma'}}">
                <i class="oi oi-globe"></i>Idiomas</router-link>
            </li>
            <li>
              <router-link :to="{name:'Genero', params:{aba:'Genero'}}">
                <i class="oi oi-tags"></i>Gênero</router-link>
            </li>
            <li>
              <router-link :to="{name:'Publico', params:{aba:'publico'}}">
                <i class="oi oi-people"></i>Público-Alvo</router-link>
            </li>
            <li>
              <router-link :to="{name:'Autor', params:{aba:'autor'}}">
                <i class="oi oi-person"></i>Autor</router-link>
            </li>
            <li>
              <router-link :to="{name:'Revista', params:{aba:'revista'}}">
                <i class="oi oi-book"></i>Revista</router-link>
            </li>
            <li>
              <router-link :to="{name:'Editora', params:{aba:'Editora'}}">
                <i class="oi oi-bookmark"></i>Editora</router-link>
            </li>
            <li>
              <router-link :to="{name:'Artigo', params:{aba:'Artigo'}}">
                <i class="oi oi-document"></i>Artigo</router-link>
            </li>
            <li>
              <router-link :to="{name:'Capitulo', params:{aba:'capitulo'}}">
                <i class="oi oi-file"></i>Capítulo</router-link>
            </li>
            <li>
              <router-link :to="{name:'Volume', params:{aba:'volume'}}">
                <i class="oi oi-layers"></i>Volume</router-link>
            </li>
            <li>
              <router-link :to="{name:'Periodicidade', params:{aba:'Periodicidade'}}">
                <i class="oi oi-clock"></i>Publicação</router-link>
            </li>
          </ul>
        </div>

      </div>
    </nav>

    <div v-bind:class="menuSmall ? 'page active active-sm' : 'page'">
      <!-- navbar-->
      <header class="header">
        <nav class="navbar">
          <div class="container-fluid">
            <div class="navbar-holder d-flex align-items-center justify-content-between">
              <div class="navbar-header">
                <a id="toggle-btn" href="#" v-on:click="menuToggle" class="menu-btn">
                  <i class="oi oi-menu"></i>
                </a>

                <router-link :to="{name:'Home'}">
                  <div class="brand-text d-none d-md-inline-block">
                    <strong class="text-primary">{{title}}</strong>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div class="breadcrumb-holder">
        <div class="container-fluid">
          <ul class="breadcrumb">
            <li class="breadcrumb-item" v-for="bc in listBreadcrumb" :key="bc.name">{{bc.name}}</li>
          </ul>
        </div>
      </div>

      <section class="section-padding">
        <div class="container-fluid">
          <router-view/>
        </div>
      </section>

      <footer class="main-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <p>Taeko Elias &copy; 2018</p>
            </div>
            <div class="col-sm-6 text-right">
              <p>Design by <a href="https://bootstrapious.com/p/bootstrap-4-dashboard" class="external">Bootstrapious</a></p>
              <!-- Please do not remove the backlink to us unless you support further theme's development at https://bootstrapious.com/donate. It is part of the license conditions and it helps me to run Bootstrapious. Thank you for understanding :)-->
            </div>
          </div>
        </div>
      </footer>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultContainer',
  data () {
    return {
      title: 'Amigo Tradutor',
      menuSmall : false
    }
  },
  methods:{
    menuToggle(){
      this.menuSmall = !this.menuSmall;
    }
  },
  computed: {
    user_name () {
      return 'USUARIO GENERICO'
    },
    user_profile () {
      return 'ADMINISTRADOR'
    },
    listBreadcrumb () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>
