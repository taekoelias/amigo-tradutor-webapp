<template>
  <div class="revista">
      <div class="container">
          <h1>Revista</h1>

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

            <div class="form-group">
                <input class="form-control" type="text"
                    name="nome" id="nomeRevista"
                    placeholder="Nome da revista"
                    v-model="nome" />
            </div>

            <div class="form-group">
                <label>Editora</label>
                <select class="form-control" name="editora"
                    v-model="editora">
                    <option v-for="e in editorasCombo" :key="e.id"
                        :value="e">{{e.nome}}</option>
                </select>
            </div>

            <div class="form-group">
                <label>Periodicidade de Publicação</label>
                <select class="form-control" name="periodicidade"
                    v-model="periodicidade">
                    <option v-for="p in periodicidadesCombo" :key="p.id"
                        :value="p">{{p.nome}}</option>
                </select>
            </div>

            <div class="form-group">
                <label>Público-Alvo</label>
                <select class="form-control" name="publico"
                    v-model="publicos" multiple>
                    <option v-for="p in publicosCombo" :key="p.id"
                        :value="p">{{p.nome}}</option>
                </select>
            </div>

            <div class="form-group">
                <input class="btn btn-success" type="submit" value="Adicionar" />
                <button class="btn btn-danger" @click.prevent.stop="cancela()">Cancelar</button>
            </div>

          </form>

          <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                  <tr class="d-flex">
                      <th class="col-12" colspan="2">Nome</th>
                  </tr>
              </thead>
              <tbody v-if="!!revistas.length">
                  <tr class="d-flex" v-for="(r, index) in revistas" :key="r.nome">
                      <td class="col-10">{{r.nome}}</td>
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
                </tbody>
            <tbody v-if="!!!revistas.length">
                <tr>
                    <td class="text-center" colspan="3">
                        <i>Nenhuma revista encontrado.</i>
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
import async from 'async'
export default {
  name: 'Revista',
  components: {
        ErrorMessage, SuccessMessage
    },
  data () {
      return {
          errors: [], messages: [],
          id: 0, nome: "",
          editora: {},
          periodicidade: {},
          publicos: [],
          revistas: [],
          editorasCombo: [],
          periodicidadesCombo: [],
          publicosCombo: []
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
              http.put("/revistas/"+this.id,{id:this.id, nome: this.nome, editora: this.editora, periodicidade: this.periodicidade, publicos: this.publicos})
                .then(function(response){
                    var res = response.data;
                    var index = vm.revistas.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.revistas.splice(index,1,res);
                    vm.id = 0;
                    vm.nome = "";
                    vm.editora = {};
                    vm.publicos = [];
                    vm.periodicidade = {};
                    vm.messages.push("Revista alterada com sucesso.");
                  })
                .catch(function(err){
                    vm.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/revistas",{id:0, nome: this.nome, editora: this.editora, periodicidade: this.periodicidade, publicos: this.publicos})
                .then(function(response){
                    vm.revistas.push(response.data);
                    vm.id = 0;
                    vm.nome = "";
                    vm.editora = {};
                    vm.publicos = [];
                    vm.periodicidade = {};
                    vm.messages.push("Revista adicionada com sucesso.");
                  })
                .catch(function(err){
                    vm.errors.push(err.response.data.message);
                  }
                );
          }
      },
      remove(index){
        this.errors = [];
        this.messages = [];
        var vm = this;

        var i = this.revistas[index];
        http.delete("/revistas/"+i.id)
            .then(function(response){
                vm.revistas.splice(index,1);
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
          this.editora = {};
          this.publicos = [];
          this.periodicidade = {};
      },
      altera(index){
          var i = this.revistas[index];
          this.id = i.id;
          this.nome = i.nome;
          this.editora = i.editora;
          this.publicos = i.publicos;
          this.periodicidade = i.periodicidade;
      }
  },
  mounted(){
      // Popular a lista de Revistas aqui
      var vm = this;

      async.parallel(
          {
              getAllRevistas: function(callback){
                  http.get("/revistas")
                    .then(function(response){
                        callback(null,response.data);
                        }
                    );
              },
              getAllEditoras: function(callback){
                  http.get("/editoras")
                    .then(function(response){
                        callback(null,response.data);
                        }
                    );
              },
              getAllPeriodicidades: function(callback){
                  http.get("/periodicidadesPublicacao")
                    .then(function(response){
                        callback(null,response.data);
                        }
                    );
              },
              getAllPublicos: function(callback){
                  http.get("/publicosAlvo")
                    .then(function(response){
                        callback(null,response.data);
                        }
                    );
              },
          },
          function(err, results) {
                vm.revistas = results.getAllRevistas;
                vm.editorasCombo = results.getAllEditoras;
                vm.periodicidadesCombo = results.getAllPeriodicidades;
                vm.publicosCombo = results.getAllPublicos;
            }
      );
  }
}
</script>
