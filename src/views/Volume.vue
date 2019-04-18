<template>
  <div class="volume">
    <page-template title="Volumes" :errors="errors" :messages="messages">
      <template slot="form">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
            <form-volume v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-volume>
          </div>
        </div>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-lg-8 col-md-8 col-sm-10">
            <list-volume :volumes="volumes" @altera="altera" @remove="remove"></list-volume> 
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue'
import FormVolume from '@/views/volume/FormVolume.vue'
import ListVolume from '@/views/volume/ListVolume.vue'
export default {
  name: 'Volume',
  components: {
        PageTemplate, FormVolume, ListVolume
  },
  data () {
    return {
      addOrEdit: false,
      form : {
        id: 0, titulo: "", artigo: {}, numero: ""
      },
      errors: [], messages: [],
      volumes: []
    }
  },
  methods: {
    carregaDados(){
      var vm = this;
      http.get("/volumes")
        .then(function(response){
          vm.volumes = response.data;
        })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao recuperar os volumes. O sistema pode está apresentando instabilidade.";
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
      this.form = {id: 0, titulo: "", artigo: {}, numero: ""};
    },
    altera(index){
      this.errors = [];
      this.messages = [];
      this.form = this.volumes[index];
      this.form.numero = this.form.numero+"";
      this.addOrEdit = true;
    },
    remove(index){
      this.errors = [];
      var vm = this;

      var i = this.volumes[index];
      http.delete("/artigos/"+i.artigo.id+"/volumes/"+i.id)
        .then(function(response){
            vm.volumes.splice(index,1);
          })
        .catch(function(err){
          var errorMsg = "Ocorreu um erro ao remover o volume. Tente novamente.";
          if (err.response) {
            errorMsg = err.response.data.message;
          }
          vm.errors.push(errorMsg);
        });
    }
  },
  mounted(){
      // Popular a lista de Volumes aqui
      this.carregaDados();
  }
}
</script>
