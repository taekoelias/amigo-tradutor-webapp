<template>
  <div class="idioma">
    <page-template title="Idiomas" :errors="errors" :messages="messages">
      <template slot="list">
        <button type="button" @click="adiciona" class="btn btn-primary"><span class="oi oi-plus"></span> Adicionar</button>
        <form-idioma v-if="addOrEdit" v-bind="form" @cancelReturn="addOrEdit = false" @successReturn="onComplete" ></form-idioma>
      </template>
      <template slot="list">
        <div class="row">
          <div class="col-md-6">
            <div class="table-responsive">
              <table class="table table-striped">
                  <thead>
                      <tr>
                          <th>Nome</th>
                          <th>Sigla</th>
                          <th colspan="2"></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-if="!!idiomas.length" v-for="(i, index) in idiomas" :key="i.nome">
                          <td>{{i.nome}}</td>
                          <td>{{i.sigla}}</td>
                          <td>
                              <div class="row justify-content-md-center">
                                  <button class="btn" @click.prevent.stop="altera(index)">
                                    <span class="oi oi-loop-circular"></span>
                                  </button>
                              </div>
                          </td>
                          <td>
                              <div class="row justify-content-md-center">
                                  <button class="btn" @click.prevent.stop="remove(index)">
                                    <span class="oi oi-circle-x"></span>
                                  </button>
                              </div>
                          </td>
                      </tr>
                      <tr v-if="!!!idiomas.length">
                          <td class="text-center" colspan="4">
                              <i>Nenhum idioma encontrado.</i>
                          </td>
                      </tr>
                  </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </page-template>
  </div>
</template>

<script>
import Vue from 'vue'
import http from '../http'
import PageTemplate from '@/components/page/PageTemplate.vue';
import InputText from '@/components/InputText.vue';
import FormIdioma from '@/views/idioma/FormIdioma.vue';
export default {
  name: 'Idioma',
  components: {
        PageTemplate, InputText, FormIdioma
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
