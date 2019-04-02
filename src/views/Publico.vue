<template>
  <div class="publico">
    <page-template title="Públicos-Alvo" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-publico v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-publico>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-publico :publicos="publicos" @altera="altera" @remove="remove"></list-publico>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue';
import FormPublico from '@/views/publico/FormPublico.vue';
import ListPublico from '@/views/publico/ListPublico.vue';
export default {
  name: 'Publico',
  components: {
        PageTemplate, FormPublico, ListPublico
    },
  data () {
      return {
          addOrEdit: false,
          form : {
              id: 0, nome: "", descricao: ""
          },
          errors: [], messages: [],
          publicos: []
      }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/publicosAlvo")
        .then(function(response){
            vm.publicos = response.data;
          })
        .catch(function(err){
            var errorMsg = "Ocorreu um erro ao recuperar os públicos-alvo. O sistema pode está apresentando instabilidade.";
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
      this.form = this.publicos[index];
      this.addOrEdit = true;
    },
    remove(index){
      var vm = this;

      var i = this.publicos[index];
      http.delete("/publicosAlvo/"+i.id)
          .then(function(response){
              vm.publicos.splice(index,1);
              vm.messages.push("Público-alvo removida com sucesso!");
            }
          )
          .catch(function(err){
            var errorMsg = "Ocorreu um erro ao remover o público-alvo. Tente novamente.";
            if (err.response) {
              errorMsg = err.response.data.message;
            }
            vm.errors.push(errorMsg);
          });
    }
  },
  mounted(){
      // Popular a lista de publicos aqui
      this.carregaDados();
  }
}
</script>
