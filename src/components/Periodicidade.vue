<template>
  <div class="periodicidade">
      <div class="container">
          <h1>Periodicidade de Publicação</h1>

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
                    name="nome" id="nomePeriodicidade"
                    placeholder="Nome da periodicidade de publicação"
                    v-model="nome" />
            </div>

            <div class="form-group">
                <textarea class="form-control" rows="5"
                    name="descricao" id="descricaoPeriodicidade"
                    placeholder="Descrição da periodicidade de publicação"
                    v-model="descricao" />
            </div>

            <div class="form-group">
                <input class="btn btn-success" type="submit" value="Adicionar" />
                <button class="btn btn-danger" @click.prevent.stop="cancela()">Cancelar</button>
            </div>

          </form>

          <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                  <tr class="d-flex">
                      <th class="col-10">Nome</th>
                      <th class="col-2" colspan="2"></th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="d-flex" v-if="!!periodicidades.length" v-for="(p, index) in periodicidades" :key="p.nome">
                      <td class="col-10">{{p.nome}}</td>
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
                  <tr v-if="!!!periodicidades.length">
                      <td class="text-center" colspan="3">
                          <i>Nenhuma periodicidade de publicação encontrado.</i>
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
  name: 'Periodicidade',
  components: {
        ErrorMessage, SuccessMessage
    },
  data () {
      return {
          errors: [], messages: [],
          id: 0, nome: "", descricao: "",
          periodicidades: []
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

          if (this.nome.trim() == '' || this.descricao.trim() == ''){
              this.errors.push("Campo(s) obrigatório(s) não preenchido(s).");
              return;
          }

          var vm = this;
          if (this.id != 0){
              http.put("/periodicidadesPublicacao/"+this.id,{id:this.id, nome: this.nome, descricao: this.descricao})
                .then(function(response){
                    var res = response.data;
                    var index = vm.periodicidades.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.periodicidades.splice(index,1,res);
                    vm.id = 0;
                    vm.nome = "";
                    vm.descricao = "";
                    vm.messages.push("Periodicidade de publicação alterada com sucesso.");
                  })
                .catch(function(err){
                    vm.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/periodicidadesPublicacao",{id:0, nome: this.nome, descricao: this.descricao})
                .then(function(response){
                    vm.periodicidades.push(response.data);
                    vm.id = 0;
                    vm.nome = "";
                    vm.descricao = "";
                    vm.messages.push("Periodicidade de publicação adicionada com sucesso.");
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

        var i = this.periodicidades[index];
        http.delete("/periodicidadesPublicacao/"+i.id)
            .then(function(response){
                vm.periodicidades.splice(index,1);
                vm.messages.push("Periodicidade de publicação removido com sucesso.");
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
          this.descricao = "";
      },
      altera(index){
          var i = this.periodicidades[index];
          this.id = i.id;
          this.nome = i.nome;
          this.descricao = i.descricao;
      }
  },
  mounted(){
      // Popular a lista de Periodicidades aqui
      var vm = this;
      http.get("/periodicidadesPublicacao")
        .then(function(response){
          vm.periodicidades = response.data;
        }
      );

  }
}
</script>
