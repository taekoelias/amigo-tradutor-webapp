<template>
  <div class="editora">
      <div class="container">
          <h1>Editora</h1>
          
          <system-messages></system-messages>
          <form @submit.prevent="adiciona" method="POST" action="#">
            <div v-if="errors.length">
              <p class="alert alert-danger" :key="error" v-for="error in errors">{{error}}</p>
            </div>
            
            <div class="form-row">
                <div class="form-group col-8">
                    <input class="form-control" type="text" 
                        name="nome" id="nomeEditora" 
                        placeholder="Nome da editora"
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
                  <tr class="d-flex" v-if="!!editoras.length" v-for="(e, index) in editoras" :key="e.nome">
                      <td class="col-10">{{e.nome}}</td>
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
                  <tr v-if="!!!editoras.length">
                      <td class="text-center" colspan="3">
                          <i>Nenhuma editora encontrado.</i>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import http from '../http'
import SystemMessages from './common/SystemMessages.vue';
export default {
  name: 'Editora',
  components: {
        SystemMessages
    },
  data () {
      return {
          errors: [],
          id: 0, nome: "",
          editoras: []
      }
  },
  methods: {
      adiciona: function(e){
          this.$store.state.errors = [];
          this.$store.state.messages = [];

          if (this.nome.trim() == ''){
              this.$store.state.errors.push("Campo(s) obrigatório(s) não preenchido(s).");
              return;
          }

          var vm = this;
          if (this.id != 0){
              http.put("/editoras/"+this.id,{id:this.id, nome: this.nome})
                .then(function(response){
                    var res = response.data;
                    var index = vm.editoras.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.editoras.splice(index,1,res);
                    vm.id = 0;
                    vm.nome = "";
                    vm.$store.state.messages.push("Editora alterada com sucesso.");
                  })
                .catch(function(err){
                    vm.$store.state.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/editoras",{id:0, nome: this.nome})
                .then(function(response){
                    vm.editoras.push(response.data);
                    vm.id = 0;
                    vm.nome = "";
                    vm.$store.state.messages.push("Editora adicionada com sucesso.");
                  })
                .catch(function(err){
                    vm.$store.state.errors.push(err.response.data.message);
                  }
                );
          }
      },
      remove(index){
        this.errors = [];
        var vm = this;

        var i = this.editoras[index];
        http.delete("/editoras/"+i.id)
            .then(function(response){
                vm.editoras.splice(index,1);
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
          var i = this.editoras[index];
          this.id = i.id;
          this.nome = i.nome;
      }
  },
  mounted(){
      // Popular a lista de Editoras aqui
      var vm = this;
      http.get("/editoras")
        .then(function(response){
          vm.editoras = response.data;
        }
      );
      
  }
}
</script>