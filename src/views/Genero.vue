<template>
  <div class="genero">
    <page-template title="Gêneros" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-genero v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-genero>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-genero :generos="generos" @altera="altera" @remove="remove"></list-genero>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue';
import FormGenero from '@/views/genero/FormGenero.vue';
import ListGenero from '@/views/genero/ListGenero.vue';
export default {
  name: 'Genero',
  components: {
        PageTemplate, FormGenero, ListGenero
    },
  data () {
      return {
          addOrEdit: false,
          form : {
              id: 0, nome: "", descricao: ""
          },
          errors: [], messages: [],
          generos: []
      }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/generosArtigo")
        .then(function(response){
            vm.generos = response.data;
          })
        .catch(function(err){
            var errorMsg = "Ocorreu um erro ao recuperar os gêneros. O sistema pode está apresentando instabilidade.";
            if (err.response) {
              errorMsg = err.response.data.message;
            }
            vm.errors.push(errorMsg);
        });
    },
    onComplete(msg){
      this.messages.push(msg);
      this.addOrEdit = false;

      this.carregaDados();
    },
    adiciona(){
      this.addOrEdit = true;
      this.form = {id:0, nome: "", descricao:""};
    },
    altera(index){
      this.errors = [];
      this.messages = [];
      this.form = this.generos[index];
      this.addOrEdit = true;
    },
    remove(index){
      var vm = this;

      var i = this.generos[index];
      http.delete("/generosArtigo/"+i.id)
          .then(function(response){
              vm.generos.splice(index,1);
              vm.messages.push("Gênero removido com sucesso!");
            }
          )
          .catch(function(err){
            var errorMsg = "Ocorreu um erro ao remover o gênero. Tente novamente.";
            if (err.response) {
              errorMsg = err.response.data.message;
            }
            vm.errors.push(errorMsg);
          });
    }
  },
  mounted(){
      // Popular a lista de gêneros aqui
      this.carregaDados();
  }
}
</script>
