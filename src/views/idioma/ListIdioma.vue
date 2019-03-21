<template>
  <div class="listagem-idioma">
  	<div class="table-responsive">
      <table class="table table-striped">
          <thead>
              <tr>
                  <th>Nome</th>
                  <th>Sigla</th>
                  <th colspan="2"></th>
              </tr>
          </thead>
          <tbody>
              <tr v-if="!!idiomas.length" v-for="(i, index) in idiomas" :key="i.nome">
                  <td>{{i.nome}}</td>
                  <td>{{i.sigla}}</td>
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
              <tr v-if="!!!idiomas.length">
                  <td class="text-center" colspan="4">
                      <i>Nenhum idioma encontrado.</i>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'list-idioma',
    props: {
      idiomas: {
        type: Array
      }
    }
  }
</script>