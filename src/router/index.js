import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Idioma from '@/components/Idioma'
import Genero from '@/components/Genero'
import Periodicidade from '@/components/Periodicidade'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'Home' }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/idioma',
      name: 'Idioma',
      component: Idioma
    },
    {
      path: '/generoArtigo',
      name: 'Genero',
      component: Genero
    },
    {
      path: '/periodicidadePublicacao',
      name: 'Periodicidade',
      component: Periodicidade
    }
  ]
})
