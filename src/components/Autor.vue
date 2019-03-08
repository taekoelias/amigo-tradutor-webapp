<template>
  <div class="autor">
      <div class="container">
          <h1>Autor</h1>

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
          <form @submit.prevent="adiciona" method="POST" action="#">

            <div class="form-row">
                <div class="form-group col-8">
                    <input class="form-control" type="text"
                        name="nome" id="nomeAutor"
                        placeholder="Nome da autor"
                        v-model="nome" />
                </div>
                <div class="form-group col">
                    <input class="btn btn-success" type="submit" value="Adicionar" />
                    <button class="btn btn-danger" @click.prevent.stop="cancela()">Cancelar</button>
                </div>
            </div>

          </form>

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

<script>
import http from '../http'
import ErrorMessage from './common/ErrorMessage.vue';
import SuccessMessage from './common/SuccessMessage.vue';
export default {
  name: 'Autor',
  components: {
        ErrorMessage, SuccessMessage
    },
  data () {
      return {
          errors: [], messages: [],
          id: 0, nome: "",
          autores: []
      }
  },
  methods: {
    onClearError(index){
      this.errors.splice(index,1);
    },
    onClearMessage(index){
      this.messages.splice(index,1);
    },
    adiciona: function(e){
          this.errors = [];
          this.messages = [];

          if (this.nome.trim() == ''){
              this.errors.push("Campo(s) obrigatório(s) não preenchido(s).");
              return;
          }

          var vm = this;
          if (this.id != 0){
              http.put("/autores/"+this.id,{id:this.id, nome: this.nome})
                .then(function(response){
                    var res = response.data;
                    var index = vm.autores.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.autores.splice(index,1,res);
                    vm.id = 0;
                    vm.nome = "";
                    vm.messages.push("Autor alterada com sucesso.");
                  })
                .catch(function(err){
                    vm.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/autores",{id:0, nome: this.nome})
                .then(function(response){
                    vm.autores.push(response.data);
                    vm.id = 0;
                    vm.nome = "";
                    vm.messages.push("Autor adicionada com sucesso.");
                  })
                .catch(function(err){
                    vm.errors.push(err.response.data.message);
                  }
                );
          }
      },
      remove(index){
        this.errors = [];
        var vm = this;

        var i = this.autores[index];
        http.delete("/autores/"+i.id)
            .then(function(response){
                vm.autores.splice(index,1);
              }
            )
            .catch(function(err){
                 vm.errors.push(err.response.data.message);
                }
            );
      },
      cancela(){
          this.errors = [];
          this.id = 0;
          this.nome = "";
      },
      altera(index){
          var i = this.autores[index];
          this.id = i.id;
          this.nome = i.nome;
      }
  },
  mounted(){
      // Popular a lista de Autors aqui
      var vm = this;
      http.get("/autores")
        .then(function(response){
          vm.autores = response.data;
        }
      );

  }
}
</script>
