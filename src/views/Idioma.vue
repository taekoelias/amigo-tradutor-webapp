<template>
  <div class="idioma">
    <page-template title="Idiomas" :errors="errors" :messages="messages">
      <template slot="form">
        <form @submit.prevent="adiciona" method="POST" action="#">
          <div class="form-row">
             <div class="col-md-3 mb-3">
               <label for="nomeIdioma" class="sr-only">Nome</label>
               <input class="form-control" :class=" validation.invalidNome ? 'is-invalid' : ''"
                 type="text" name="nome" id="nomeIdioma" placeholder="Nome" v-model="form.nome">
               <div class="invalid-feedback">
                 Nome do idioma não preenchido ou inválido.
               </div>
             </div>
             <div class="col-md-3 mb-3">
                 <label for="nomeIdioma" class="sr-only">Sigla</label>
                 <input class="form-control" type="text" :class=" validation.invalidSigla ? 'is-invalid' : ''"
                   name="sigla" id="siglaIdioma" placeholder="Sigla" v-model="form.sigla">
                 <div class="invalid-feedback">
                   Sigla do idioma não preenchida ou inválida.
                 </div>
             </div>
             <div class="col-md-1 mb-3">
                 <input class="btn btn-success" type="submit" value="Adicionar">
             </div>

             <div class="col-md-1 mb-3">
                 <button class="btn btn-danger" @click.prevent.stop="cancela()">Cancelar</button>
             </div>
          </div>

        </form>
      </template>

      <template slot="list">
        <div class="row">
          <div class="col-lg-8">
            <div class="table-responsive">
              <table class="table table-striped">
                  <thead>
                      <tr class="d-flex">
                          <th class="col-5">Nome</th>
                          <th class="col-5">Sigla</th>
                          <th class="col-2" colspan="2"></th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="d-flex" v-if="!!idiomas.length" v-for="(i, index) in idiomas" :key="i.nome">
                          <td class="col-5">{{i.nome}}</td>
                          <td class="col-5">{{i.sigla}}</td>
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
import http from '../http'
import PageTemplate from '@/components/container/PageTemplate.vue';
export default {
  name: 'Idioma',
  components: {
        PageTemplate
    },
  data () {
      return {
          form : {
              id: 0, nome: "", sigla: ""
          },
          validation: {
            invalidNome: false, invalidSigla: false
          },
          errors: [], messages: [],
          idiomas: []
      }
  },
  methods: {
    onClearValidation(){
      this.validation = {invalidNome: false, invalidSigla: false};
    },
    onClearForm(){
      this.form = {id: 0, nome: "", sigla: ""};
      onClearValidation();
    },
      adiciona(){
        this.errors = [];
        this.messages = [];

        this.onClearValidation();

          if (this.form.nome.trim() == ''){
              this.validation.invalidNome = true;
          }

          if (this.form.sigla.trim() == ''){
              this.validation.invalidSigla = true;
          }

          if (this.validation.invalidNome || this.validation.invalidSigla)
            return;

          var vm = this;
          if (this.form.id != 0){
              http.put("/idiomas/"+this.form.id,{id:this.form.id, nome: this.form.nome, sigla: this.form.sigla})
                .then(function(response){
                    var res = response.data;
                    var index = vm.idiomas.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.idiomas.splice(index,1,res);
                    vm.messages.push("Idioma alterado com sucesso!");
                    vm.onClearForm();
                  })
                .catch(function(err){
                  var errorMsg = "Ocorreu um erro ao alterar o idioma. Tente novamente.";
                  if (err.response) {
                    errorMsg = err.response.data;
                  }
                  vm.errors.push(errorMsg);
                  });
          } else {
            http.post("/idiomas",{id:0, nome: this.nome, sigla: this.sigla})
                .then(function(response){
                    vm.idiomas.push(response.data);
                    vm.messages.push("Idioma adicionado com sucesso!");
                    vm.onClearForm();
                  })
                .catch(function(err){
                    var errorMsg = "Ocorreu um erro ao adicionar o idioma. Tente novamente.";
                    if (err.response) {
                      errorMsg = err.response.data;
                    }
                    vm.errors.push(errorMsg);
                  });
          }
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
                vm.errors.push(err.response.data.message);
                }
            );
      },
      cancela(){
        this.errors = [];
        this.messages = [];
        this.id = 0;
        this.nome = "";
        this.sigla = "";
      },
      altera(index){
        this.errors = [];
        this.messages = [];
          var i = this.idiomas[index];
          this.id = i.id;
          this.nome = i.nome;
          this.sigla = i.sigla;
      }
  },
  mounted(){
      // Popular a lista de idiomas aqui
      var vm = this;
      http.get("/idiomas")
        .then(function(response){
            vm.idiomas = response.data;
          })
        .catch(function(err){
            var errorMsg = "Ocorreu um erro ao recuperar os idiomas. O sistema pode está apresentando instabilidade.";
            if (err.response) {
              errorMsg = err.response.data;
            }
            vm.errors.push(errorMsg);
          });

  }
}
</script>
