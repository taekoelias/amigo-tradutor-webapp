<template>
  <div class="home">
      <div class="row">
          <div class="col">

            <h1>Página Inicial</h1>
            <p>Mussum Ipsum, cacilds vidis litro abertis.
                A ordem dos tratores não altera o pão duris.
                Interagi no mé, cursus quis, vehicula ac nisi.
                Interessantiss quisso pudia ce receita de bolis,
                mais bolis eu num gostis. Nec orci ornare consequat.
                Praesent lacinia ultrices consectetur.
                Sed non ipsum felis.</p>
            <p>Mussum Ipsum, cacilds vidis litro abertis.
                A ordem dos tratores não altera o pão duris.
                Interagi no mé, cursus quis, vehicula ac nisi.
                Interessantiss quisso pudia ce receita de bolis,
                mais bolis eu num gostis. Nec orci ornare consequat.
                Praesent lacinia ultrices consectetur.
                Sed non ipsum felis.</p>
          </div>
      </div>
      <div class="row">
        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Idioma', params:{aba:'idioma'}}">
            <span class="oi oi-globe"></span>
            <div class="text-center">
                Idiomas
            </div>
          </router-link>
        </div>

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Genero', params:{aba:'Genero'}}">
            <span class="oi oi-tags"></span>
            <div class="text-center">
                Gênero
            </div>
          </router-link>
        </div>

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Publico', params:{aba:'publico'}}">
            <span class="oi oi-people"></span>
            <div class="text-center">
                Público-Alvo
            </div>
          </router-link>
        </div>

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Autor', params:{aba:'autor'}}">
            <span class="oi oi-person"></span>
            <div class="text-center">
                Autor
            </div>
          </router-link>
        </div>

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Revista', params:{aba:'revista'}}">
            <span class="oi oi-book"></span>
            <div class="text-center">
                Revista
            </div>
          </router-link>
        </div>

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Editora', params:{aba:'Editora'}}">
            <span class="oi oi-bookmark"></span>
            <div class="text-center">
                Editora
            </div>
          </router-link>
        </div>
      </div>
      <br>
      <div class="row">

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Artigo', params:{aba:'Artigo'}}">
            <span class="oi oi-document"></span>
            <div class="text-center">
                Artigo
            </div>
          </router-link>
        </div>

        <div class="col-2">
          <button class="btn btn-lg" style="background-color:#D2CFCF;">
            <span class="oi oi-file"></span>
            <div class="text-center">
                Capítulo
            </div>
          </button>
        </div>

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Volume', params:{aba:'volume'}}">
            <span class="oi oi-layers"></span>
            <div class="text-center">
                Volume
            </div>
          </router-link>
        </div>

        <div class="col-2">
          <router-link class="btn btn-lg" style="background-color:#D2CFCF;"
            :to="{name:'Periodicidade', params:{aba:'Periodicidade'}}">
            <span class="oi oi-clock"></span>
            <div class="text-center">
                Publicação
            </div>
          </router-link>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
