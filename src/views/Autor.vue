<template>
  <div class="autor">
    <page-template title="Autor" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-autor v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-autor>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-autor :autores="autores" @altera="altera" @remove="remove"></list-autor>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue'
import FormAutor from '@/views/autor/FormAutor.vue'
import ListAutor from '@/views/autor/ListAutor.vue'
export default {
  name: 'Autor',
  components: {
        PageTemplate, FormAutor, ListAutor
  },
  data () {
      return {
          addOrEdit: false,
          form : {
              id: 0, nome: ""
          },
          errors: [], messages: [],
          autores: []
      }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/autores")
        .then(function(response){
          vm.autores = response.data;
        })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao recuperar os autores. O sistema pode está apresentando instabilidade.";
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
      this.form = {id:0, nome: ""};
    },
    altera(index){
      this.errors = [];
      this.messages = [];
      this.form = this.autores[index];
      this.addOrEdit = true;
    },
    remove(index){
      this.errors = [];
      var vm = this;

      var i = this.autores[index];
      http.delete("/autores/"+i.id)
        .then(function(response){
            vm.autores.splice(index,1);
          })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao remover o autor. Tente novamente.";
          if (err.response) {
            errorMsg = err.response.data.message;
          }
          vm.errors.push(errorMsg);
        });
    }
  },
  mounted(){
      // Popular a lista de Autors aqui
      this.carregaDados();
  }
}
</script>
