<template>
  <div class="genero">
      <div class="container">
          <h1>Gênero de Artigo</h1>
          
          <div v-if="status.code == 'error'" class="alert alert-danger">
              {{status.msg}}
          </div>
        
          <div v-if="status.code == 'ok'" class="alert alert-success">
              {{status.msg}}
          </div>

          <div class="row">
              <div class="col-10">
                  <div class="form-group">
                      <input class="form-control" type="text" 
                        name="nome" id="nomeGenero" 
                        placeholder="Nome do gênero de artigo"
                        v-model="nome" />
                  </div>
              </div>
          </div>
          <div class="row">  
              <div class="col-10">
                  <div class="form-group">
                      <textarea class="form-control" rows="5" 
                        name="descricao" id="descricaoGenero" 
                        placeholder="Descrição do gênero de artigo"
                        v-model="descricao" />
                  </div>
              </div>
          </div>
          <div class="row">    
              <div class="col">
                  <div class="form-group">
                      <button class="btn btn-success" @click.prevent.stop="adiciona()">Adicionar</button>
                      <button class="btn btn-danger" @click.prevent.stop="cancela()">Cancelar</button>
                  </div>
              </div>
          </div>


          <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                  <tr class="d-flex">
                      <th class="col-10">Nome</th>
                      <th class="col-2" colspan="2"></th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="d-flex" v-if="!!generos.length" v-for="(g, index) in generos" :key="g.nome">
                      <td class="col-10">{{g.nome}}</td>
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
                  <tr v-if="!!!generos.length">
                      <td class="text-center" colspan="3">
                          <i>Nenhum gênero de artigo encontrado.</i>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import http from '../http'
export default {
  name: 'Genero',
  data () {
      return {
          status: {code: "", msg: ""},
          id: 0, nome: "", descricao: "",
          generos: []
      }
  },
  methods: {
      adiciona(){
          this.status = {code: "", msg: ""};

          if (this.nome.trim() == '' || this.descricao.trim() == ''){
              this.status.code = "error";
              this.status.msg = "Campo(s) obrigatório(s) não preenchido(s)."
              return;
          }

          var vm = this;
          if (this.id != 0){
              http.put("/generosArtigo/"+this.id,{id:this.id, nome: this.nome, descricao: this.descricao})
                .then(function(response){
                    var res = response.data;
                    var index = vm.generos.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.generos.splice(index,1,res);
                    vm.status.code = "ok";
                    vm.status.msg = "Gêneros alterado com sucesso!"
                    vm.id = 0;
                    vm.nome = "";
                    vm.descricao = "";
                  }
                )
                .catch(function(err){
                    vm.status.code = "error";
                    vm.status.msg = err.response.data.message;
                  }
                );
          } else {
            http.post("/generosArtigo",{id:0, nome: this.nome, descricao: this.descricao})
                .then(function(response){
                    vm.generos.push(response.data);
                    vm.status.code = "ok";
                    vm.status.msg = "Gêneros adicionado com sucesso!"
                    vm.id = 0;
                    vm.nome = "";
                    vm.descricao = "";
                  }
                )
                .catch(function(err){
                    vm.status.code = "error";
                    vm.status.msg = err.response.data.message;
                  }
                );
          }
      },
      remove(index){
        var vm = this;

        var i = this.generos[index];
        http.delete("/generosArtigo/"+i.id)
            .then(function(response){
                vm.generos.splice(index,1);
                vm.status.code = "ok";
                vm.status.msg = "Gênero removido com sucesso!"
              }
            )
            .catch(function(err){
                vm.status.code = "error";
                vm.status.msg = err.response.data.message;
                }
            );
      },
      cancela(){
          this.status = {code: "", msg: ""};
          this.id = 0;
          this.nome = "";
          this.descricao = "";
      },
      altera(index){
          var i = this.generos[index];
          this.id = i.id;
          this.nome = i.nome;
          this.descricao = i.descricao;
      }
  },
  mounted(){
      // Popular a lista de generos aqui
      var vm = this;
      http.get("/generosArtigo")
        .then(function(response){
          vm.generos = response.data;
        }
      );
      
  }
}
</script>