<template>
  <div class="periodicidade">
    <page-template title="Periodicidades de Publicação" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-periodicidade v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-periodicidade>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-periodicidade :periodicidades="periodicidades" @altera="altera" @remove="remove"></list-periodicidade>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue';
import FormPeriodicidade from '@/views/periodicidade/FormPeriodicidade.vue';
import ListPeriodicidade from '@/views/periodicidade/ListPeriodicidade.vue';
export default {
  name: 'Periodicidade',
  components: {
        PageTemplate, FormPeriodicidade, ListPeriodicidade
    },
  data () {
      return {
          addOrEdit: false,
          form : {
              id: 0, nome: "", descricao: ""
          },
          errors: [], messages: [],
          periodicidades: []
      }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/periodicidadesPublicacao")
        .then(function(response){
            vm.periodicidades = response.data;
          })
        .catch(function(err){
            var errorMsg = "Ocorreu um erro ao recuperar as periodicidades de publicação. O sistema pode está apresentando instabilidade.";
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
      this.form = this.periodicidades[index];
      this.addOrEdit = true;
    },
    remove(index){
      var vm = this;

      var i = this.periodicidades[index];
      http.delete("/periodicidadesPublicacao/"+i.id)
          .then(function(response){
              vm.periodicidades.splice(index,1);
              vm.messages.push("Periodicidade de publicação removida com sucesso!");
            }
          )
          .catch(function(err){
            var errorMsg = "Ocorreu um erro ao remover a periodicidade de publicação. Tente novamente.";
            if (err.response) {
              errorMsg = err.response.data.message;
            }
            vm.errors.push(errorMsg);
          });
    }
  },
  mounted(){
      // Popular a lista de periodicidades aqui
      this.carregaDados();
  }
}
</script>
