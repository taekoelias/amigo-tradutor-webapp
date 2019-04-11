<template>
  <div class="artigo">
    <page-template title="Artigos" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-artigo v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-artigo>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-artigo :artigos="artigos" @altera="altera" @remove="remove"></list-artigo>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue'
import FormArtigo from '@/views/artigo/FormArtigo.vue'
import ListArtigo from '@/views/artigo/ListArtigo.vue'
export default {
  name: 'Artigo',
  components: {
        PageTemplate, FormArtigo, ListArtigo
  },
  data () {
    return {
      addOrEdit: false,
      form : {
        id: 0, titulo: "", revista: {},
        autor: {}, generos: [], enredo: ""
      },
      errors: [], messages: [],
      artigos: []
    }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/artigos")
        .then(function(response){
          vm.artigos = response.data;
        })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao recuperar os artigos. O sistema pode está apresentando instabilidade.";
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
      this.form = {id: 0, titulo: "", revista: {},
        autor: {}, generos: [], enredo: ""};
    },
    altera(index){
      this.errors = [];
      this.messages = [];
      this.form = this.artigos[index];
      this.addOrEdit = true;
    },
    remove(index){
      this.errors = [];
      var vm = this;

      var i = this.artigos[index];
      http.delete("/artigos/"+i.id)
        .then(function(response){
            vm.artigos.splice(index,1);
          })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao remover o artigo. Tente novamente.";
          if (err.response) {
            errorMsg = err.response.data.message;
          }
          vm.errors.push(errorMsg);
        });
    }
  },
  mounted(){
      // Popular a lista de Artigos aqui
      this.carregaDados();
  }
}
</script>
