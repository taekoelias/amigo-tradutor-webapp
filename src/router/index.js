import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Idioma from '@/components/Idioma'
import Genero from '@/components/Genero'
import Periodicidade from '@/components/Periodicidade'
import Publico from '@/components/Publico'
import Autor from '@/components/Autor'
import Editora from '@/components/Editora'
import Revista from '@/components/Revista'
import Artigo from '@/components/Artigo'
import Volume from '@/components/Volume'

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
    },
    {
      path: '/publicoAlvo',
      name: 'Publico',
      component: Publico
    },
    {
      path: '/autor',
      name: 'Autor',
      component: Autor
    },
    {
      path: '/editora',
      name: 'Editora',
      component: Editora
    },
    {
      path: '/revista',
      name: 'Revista',
      component: Revista
    },
    {
      path: '/artigo',
      name: 'Artigo',
      component: Artigo
    },
    {
      path: '/volume',
      name: 'Volume',
      component: Volume
    }
  ]
})
