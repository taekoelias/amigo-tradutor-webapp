<template>
  <div class="idioma">
    <page-template title="Idiomas" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-idioma v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-idioma>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-idioma :idiomas="idiomas" @altera="altera" @remove="remove"></list-idioma>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue';
import FormIdioma from '@/views/idioma/FormIdioma.vue';
import ListIdioma from '@/views/idioma/ListIdioma.vue';
export default {
  name: 'Idioma',
  components: {
        PageTemplate, FormIdioma, ListIdioma
    },
  data () {
      return {
          addOrEdit: false,
          form : {
              id: 0, nome: "", sigla: ""
          },
          errors: [], messages: [],
          idiomas: []
      }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/idiomas")
        .then(function(response){
            vm.idiomas = response.data;
          })
        .catch(function(err){
            var errorMsg = "Ocorreu um erro ao recuperar os idiomas. O sistema pode está apresentando instabilidade.";
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
      this.form = {id:0, nome: "", sigla:""};
    },
    altera(index){
      this.errors = [];
      this.messages = [];
      this.form = this.idiomas[index];
      this.addOrEdit = true;
    },
    remove(index){
      var vm = this;

      var i = this.idiomas[index];
      http.delete("/idiomas/"+i.id)
          .then(function(response){
              vm.idiomas.splice(index,1);
              vm.messages.push("Idioma removido com sucesso!");
            }
          )
          .catch(function(err){
            var errorMsg = "Ocorreu um erro ao remover o idioma. Tente novamente.";
            if (err.response) {
              errorMsg = err.response.data.message;
            }
            vm.errors.push(errorMsg);
          });
    }
  },
  mounted(){
      // Popular a lista de idiomas aqui
      this.carregaDados();
  }
}
</script>
