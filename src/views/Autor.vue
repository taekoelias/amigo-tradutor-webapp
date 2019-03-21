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

            <table class="table table-striped table-bordered">
                <thead class="thead-dark">
                    <tr class="d-flex">
                        <th class="col-12" colspan="2">Nome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="d-flex" v-if="!!autores.length" v-for="(a, index) in autores" :key="a.nome">
                        <td class="col-10">{{a.nome}}</td>
                        <td class="col-1">
                            <div class="row justify-content-md-center">
                                <button class="btn" @click.prevent.stop="altera(index)">
                                  <span class="oi oi-loop-circular"></span>
                                </button>
                            </div>
                        </td>
                        <td class="col-1">
                            <div class="row justify-content-md-center">
                                <button class="btn" @click.prevent.stop="remove(index)">
                                  <span class="oi oi-circle-x"></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!!!autores.length">
                        <td class="text-center" colspan="3">
                            <i>Nenhuma autor encontrado.</i>
                        </td>
                    </tr>
                </tbody>
            </table>
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
export default {
  name: 'Autor',
  components: {
        PageTemplate, FormAutor
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
