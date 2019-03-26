<template>
  <div class="listagem-genero">
  	<div class="table-responsive">
      <table class="table table-striped">
          <thead>
              <tr>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th colspan="2"></th>
              </tr>
          </thead>
          <tbody>
              <tr v-if="!!generos.length" v-for="(i, index) in generos" :key="i.nome">
                  <td>{{i.nome}}</td>
                  <td>{{i.descricao}}</td>
                  <td>
                      <div class="row justify-content-md-center">
                          <button class="btn" @click.prevent.stop="$emit('altera',index)">
                            <span class="oi oi-loop-circular"></span>
                          </button>
                      </div>
                  </td>
                  <td>
                      <div class="row justify-content-md-center">
                          <button class="btn" @click.prevent.stop="$emit('remove',index)">
                            <span class="oi oi-circle-x"></span>
                          </button>
                      </div>
                  </td>
              </tr>
              <tr v-if="!!!generos.length">
                  <td class="text-center" colspan="4">
                      <i>Nenhum gênero encontrado.</i>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list-genero',
    props: {
      generos: {
        type: Array
      }
    }
  }
</script>