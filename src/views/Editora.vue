<template>
  <div class="editora">
    <page-template title="Editora" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-editora v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-editora>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-editora :editoras="editoras" @altera="altera" @remove="remove"></list-editora>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue';
import FormEditora from '@/views/editora/FormEditora.vue';
import ListEditora from '@/views/editora/ListEditora.vue';
export default {
  name: 'Editora',
  components: {
        PageTemplate, FormEditora, ListEditora
    },
  data () {
      return {
          addOrEdit: false,
          form : {
              id: 0, nome: "", sigla: ""
          },
          errors: [], messages: [],
          editoras: []
      }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/editoras")
        .then(function(response){
            vm.editoras = response.data;
          })
        .catch(function(err){
            var errorMsg = "Ocorreu um erro ao recuperar as editoras. O sistema pode está apresentando instabilidade.";
            if (err.response) {
              errorMsg = err.response.data.message;
            }
            vm.errors.push(errorMsg);
        });
    },onComplete(msg){
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
      this.form = this.editoras[index];
      this.addOrEdit = true;
    },
    remove(index){
      var vm = this;

      var i = this.editoras[index];
      http.delete("/editoras/"+i.id)
          .then(function(response){
              vm.idiomas.splice(index,1);
              vm.messages.push("Editora removido com sucesso!");
          })
          .catch(function(err){
            var errorMsg = "Ocorreu um erro ao remover a editora. Tente novamente.";
            if (err.response) {
              errorMsg = err.response.data.message;
            }
            vm.errors.push(errorMsg);
          });
    }
  },
  mounted(){
      // Popular a lista de editoras
      this.carregaDados();
  }
}
</script>