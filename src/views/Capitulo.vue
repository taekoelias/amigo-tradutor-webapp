<template>
  <div class="capitulo">
    <page-template title="Capitulos" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-capitulo v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-capitulo>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-capitulo :capitulos="capitulos" @altera="altera" @remove="remove"></list-capitulo> 
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue'
import FormCapitulo from '@/views/capitulo/FormCapitulo.vue'
import ListCapitulo from '@/views/capitulo/ListCapitulo.vue'
export default {
  name: 'Capitulo',
  components: {
        PageTemplate, FormCapitulo, ListCapitulo
  },
  data () {
    return {
      addOrEdit: false,
      form : {
        id: 0, tituloOriginal: "", artigo: {}, numero: "", volume: {}
      },
      errors: [], messages: [],
      capitulos: []
    }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/capitulos")
        .then(function(response){
          vm.capitulos = response.data;
        })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao recuperar os capitulos. O sistema pode está apresentando instabilidade.";
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
      this.form = {id: 0, tituloOriginal: "", artigo: {}, numero: "", volume: {}};
    },
    altera(index){
      this.errors = [];
      this.messages = [];
      this.form = this.capitulos[index];
      this.form.numero = this.form.numero+"";
      this.addOrEdit = true;
    },
    remove(index){
      this.errors = [];
      var vm = this;

      var i = this.capitulos[index];
      http.delete("/artigos/"+i.artigo.id+"/volumes/"+i.volume.id+"/capitulos/"+i.id)
        .then(function(response){
            vm.capitulos.splice(index,1);
          })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao remover o capitulo. Tente novamente.";
          if (err.response) {
            errorMsg = err.response.data.message;
          }
          vm.errors.push(errorMsg);
        });
    }
  },
  mounted(){
      // Popular a lista de Capitulos aqui
      this.carregaDados();
  }
}
</script>
