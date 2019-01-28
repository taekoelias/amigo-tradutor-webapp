<template>
  <div class="publico">
      <div class="container">
          <h1>Público-Alvo</h1>
          
          <system-messages></system-messages>
          <form @submit.prevent="adiciona" method="POST" action="#">
            <div v-if="errors.length">
              <p class="alert alert-danger" :key="error" v-for="error in errors">{{error}}</p>
            </div>
            
            <div class="form-group">
                <input class="form-control" type="text" 
                    name="nome" id="nomePublico" 
                    placeholder="Nome da público-alvo"
                    v-model="nome" />
            </div>
        
            <div class="form-group">
                <textarea class="form-control" rows="5" 
                    name="descricao" id="descricaoPublico" 
                    placeholder="Descrição da público-alvo"
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
                      <th class="col-12" colspan="2">Nome</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="d-flex" v-if="!!publicos.length" v-for="(p, index) in publicos" :key="p.nome">
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
                  <tr v-if="!!!publicos.length">
                      <td class="text-center" colspan="3">
                          <i>Nenhuma público-alvo encontrado.</i>
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
  name: 'Publico',
  components: {
        SystemMessages
    },
  data () {
      return {
          errors: [],
          id: 0, nome: "", descricao: "",
          publicos: []
      }
  },
  methods: {
      adiciona: function(e){
          this.$store.state.errors = [];
          this.$store.state.messages = [];

          if (this.nome.trim() == '' || this.descricao.trim() == ''){
              this.$store.state.errors.push("Campo(s) obrigatório(s) não preenchido(s).");
              return;
          }

          var vm = this;
          if (this.id != 0){
              http.put("/publicosAlvo/"+this.id,{id:this.id, nome: this.nome, descricao: this.descricao})
                .then(function(response){
                    var res = response.data;
                    var index = vm.publicos.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.publicos.splice(index,1,res);
                    vm.id = 0;
                    vm.nome = "";
                    vm.descricao = "";
                    vm.$store.state.messages.push("Público-alvo alterada com sucesso.");
                  })
                .catch(function(err){
                    vm.$store.state.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/publicosAlvo",{id:0, nome: this.nome, descricao: this.descricao})
                .then(function(response){
                    vm.publicos.push(response.data);
                    vm.id = 0;
                    vm.nome = "";
                    vm.descricao = "";
                    vm.$store.state.messages.push("Público-alvo adicionada com sucesso.");
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

        var i = this.publicos[index];
        http.delete("/publicosAlvo/"+i.id)
            .then(function(response){
                vm.publicos.splice(index,1);
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
          this.descricao = "";
      },
      altera(index){
          var i = this.publicos[index];
          this.id = i.id;
          this.nome = i.nome;
          this.descricao = i.descricao;
      }
  },
  mounted(){
      // Popular a lista de Publicos aqui
      var vm = this;
      http.get("/publicosAlvo")
        .then(function(response){
          vm.publicos = response.data;
        }
      );
      
  }
}
</script>