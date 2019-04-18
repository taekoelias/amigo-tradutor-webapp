import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Idioma from '@/views/Idioma'
import Genero from '@/views/Genero'
import Periodicidade from '@/views/Periodicidade'
import Publico from '@/views/Publico'
import Autor from '@/views/Autor'
import Editora from '@/views/Editora'
import Revista from '@/views/Revista'
import Artigo from '@/views/Artigo'
import Volume from '@/views/Volume'
import Capitulo from '@/views/Capitulo'
import BaseContainer from '@/components/container/BaseContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'Conteúdo',
      component: BaseContainer,
      children:[
        {
          path: '/home',
          name: 'Início',
          component: Home
        }
      ]
    },
    {
      path: '/admin',
      name: 'Administração',
      component: BaseContainer,
      children:[
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
        },
        {
          path: '/capitulo',
          name: 'Capitulo',
          component: Capitulo
        }
      ]
    }
  ]
})
