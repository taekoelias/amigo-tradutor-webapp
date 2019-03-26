<template>
  <div class="listagem-periodicidade">
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
              <tr v-if="!!periodicidades.length" v-for="(i, index) in periodicidades" :key="i.nome">
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
              <tr v-if="!!!periodicidades.length">
                  <td class="text-center" colspan="4">
                      <i>Nenhuma periodicidade de publicação encontrado.</i>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list-periodicidade',
    props: {
      periodicidades: {
        type: Array
      }
    }
  }
</script>