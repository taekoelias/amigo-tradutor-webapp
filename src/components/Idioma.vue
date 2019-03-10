<template>
  <div class="idioma">
    <section class="forms">
        <!-- Page Header-->
        <header>
          <h1 class="h3 display">Idiomas</h1>
        </header>

        <div class="row">
          <div class="col-lg-6">
            <error-message
                v-for="(error, index) in errors"
                :key="index"
                :error="error"
                @clearMessage="onClearError(index)">
            </error-message>

            <success-message
                v-for="(message, index) in messages"
                :key="index"
                :message="message"
                @clearMessage="onClearMessage(index)">
            </success-message>
          </div>
        </div>

          <form @submit.prevent="adiciona" method="POST" action="#">
            <div class="form-row">
               <div class="col-md-3 mb-3">
                 <label for="nomeIdioma" class="sr-only">Nome</label>
                 <input class="form-control" :class=" invalidNome ? 'is-invalid' : ''"
                   type="text" name="nome" id="nomeIdioma" placeholder="Nome" v-model="nome">
                 <div class="invalid-feedback">
                   Nome do idioma não preenchido ou inválido.
                 </div>
               </div>
               <div class="col-md-3 mb-3">
                   <label for="nomeIdioma" class="sr-only">Sigla</label>
                   <input class="form-control" type="text" :class=" invalidSigla ? 'is-invalid' : ''"
                     name="sigla" id="siglaIdioma" placeholder="Sigla" v-model="sigla">
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

          <br />

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
    </section>
  </div>
</template>

<script>
import http from '../http'
import ErrorMessage from './common/ErrorMessage.vue';
import SuccessMessage from './common/SuccessMessage.vue';
export default {
  name: 'Idioma',
  components: {
        ErrorMessage, SuccessMessage
    },
  data () {
      return {
          invalidNome: false, invalidSigla: false,
          errors: [], messages: [],
          id: 0, nome: "", sigla: "",
          idiomas: []
      }
  },
  methods: {
    onClearError(index){
      this.errors.splice(index,1);
    },
    onClearMessage(index){
      this.messages.splice(index,1);
    },
      adiciona(){
        this.errors = [];
        this.messages = [];

        this.invalidNome = false;
        this.invalidSigla = false;

          if (this.nome.trim() == ''){
              this.invalidNome = true;
          }

          if (this.sigla.trim() == ''){
              this.invalidSigla = true;
          }

          if (this.invalidNome || this.invalidSigla)
            return;

          var vm = this;
          if (this.id != 0){
              http.put("/idiomas/"+this.id,{id:this.id, nome: this.nome, sigla: this.sigla})
                .then(function(response){
                    var res = response.data;
                    var index = vm.idiomas.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.idiomas.splice(index,1,res);
                    vm.messages.push("Idioma alterado com sucesso!");
                    vm.id = 0;
                    vm.nome = "";
                    vm.sigla = "";
                  }
                )
                .catch(function(err){
                  vm.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/idiomas",{id:0, nome: this.nome, sigla: this.sigla})
                .then(function(response){
                    vm.idiomas.push(response.data);
                    vm.messages.push("Idioma adicionado com sucesso!");
                    vm.id = 0;
                    vm.nome = "";
                    vm.sigla = "";
                  }
                )
                .catch(function(err){
                  var errorMsg = "Ocorreu um erro ao adicionar o idioma. Tente novamente.";
                  if (err.response) {
                    errorMsg = err.response.data;
                  }
                    vm.errors.push(errorMsg);
                  }
                );
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
        }
      );

  }
}
</script>
