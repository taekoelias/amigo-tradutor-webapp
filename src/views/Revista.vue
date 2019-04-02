<template>
  <div class="revista">
    <page-template title="Revistas" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-revista v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-revista>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-revista :revistas="revistas" @altera="altera" @remove="remove"></list-revista>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue'
import FormRevista from '@/views/revista/FormRevista.vue'
import ListRevista from '@/views/revista/ListRevista.vue'
export default {
  name: 'Revista',
  components: {
        PageTemplate, FormRevista, ListRevista
  },
  data () {
    return {
      addOrEdit: false,
      form : {
          id: 0, nome: "", editora: 0,
          periodicidade: null, publicos: []
      },
      errors: [], messages: [],
      revistas: []
    }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/revistas")
        .then(function(response){
          vm.revistas = response.data;
        })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao recuperar as revistas. O sistema pode está apresentando instabilidade.";
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
      this.form = {id:0, nome: "", editora: {}, periodicidade: {}, publicos: []};
    },
    altera(index){
      this.errors = [];
      this.messages = [];
      this.form = this.revistas[index];
      this.addOrEdit = true;
    },
    remove(index){
      this.errors = [];
      var vm = this;

      var i = this.revistas[index];
      http.delete("/revistas/"+i.id)
        .then(function(response){
            vm.revistas.splice(index,1);
          })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao remover a revista. Tente novamente.";
          if (err.response) {
            errorMsg = err.response.data.message;
          }
          vm.errors.push(errorMsg);
        });
    }
  },
  mounted(){
      // Popular a lista de Revistas aqui
      this.carregaDados();
  }
}
</script>
