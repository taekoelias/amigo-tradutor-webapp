<template>
  <div class="artigo">
      <div class="container">
          <h1>Artigo</h1>
          
          <system-messages></system-messages>
          <form @submit.prevent="adiciona" method="POST" action="#">
            <div v-if="errors.length">
              <p class="alert alert-danger" :key="error" v-for="error in errors">{{error}}</p>
            </div>
            
            <div class="form-group">
                <input class="form-control" type="text" 
                    name="titulo" id="tituloArtigo" 
                    placeholder="Título do artigo"
                    v-model="titulo" />
            </div>

            <div class="form-group">
                <label>Revista</label>
                <cool-select
                    :items="revistasCombo"
                    v-model="revista"
                    item-text="nome"
                    item-value="id"
                    :loading="loading"
                    placeholder="Escolha a revista"
                    disable-filtering-by-search
                    @search="getRevistasCombo">

                    <template slot="no-data" >
                        {{
                            noData
                            ? "Nenhum dado encontrado."
                            : "São necessárias 2 letras ou mais para consulta."
                        }}
                    </template>

                    <template slot="item" slot-scope="{ item }">
                        <div style="display: flex; align-items: center;">
                            <div>
                            <span style="font-size: 25px;"> {{ item.nome }} </span> <br />
                            <span style="color: grey;"> {{ item.editora.nome }} </span>
                            </div>
                        </div>
                    </template>

                </cool-select>
            </div>
        
            <div class="form-group">
                <label>Autor</label>
                <cool-select
                    :items="autoresCombo"
                    v-model="autor"
                    item-text="nome"
                    item-value="id"
                    placeholder="Escolha o autor"
                    disable-filtering-by-search
                    @search="getAutoresCombo">
                </cool-select>
            </div>

            <div class="form-group">
                <label>Gênero</label>
                <select class="form-control" name="genero" 
                    v-model="generos" multiple>
                    <option v-for="g in generosCombo" :key="g.id" 
                        :value="g">{{g.nome}}</option>
                </select>
            </div>

            <div class="form-group">
                <label>Enredo</label>
                <textarea class="form-control" rows="5" 
                        name="enredo" id="enredo" 
                        placeholder="Enredo principal do artigo"
                        v-model="enredo" />
            </div>

            <div class="form-group">
                <input class="btn btn-success" type="submit" value="Adicionar" />
                <button class="btn btn-danger" @click.prevent.stop="cancela()">Cancelar</button>
            </div>
                
          </form>

          <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                  <tr class="d-flex">
                      <th class="col-12" colspan="2">Título</th>
                  </tr>
              </thead>
              <tbody v-if="!!artigos.length">
                  <tr class="d-flex" v-for="(r, index) in artigos" :key="r.id">
                      <td class="col-10">{{r.titulo}}</td>
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
            <tbody v-if="!!!artigos.length">
                <tr>
                    <td class="text-center" colspan="3">
                        <i>Nenhuma artigo encontrado.</i>
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
import {CoolSelect} from 'vue-cool-select'
import async from 'async'
import _ from 'underscore'
export default {
  name: 'Artigo',
  components: {
        SystemMessages, CoolSelect
    },
  data () {
      return {
          errors: [],
          loading: false, 
          noData: false,
          id: 0, titulo: "", 
          revista: null,
          autor: null,
          generos: [],
          enredo: "",
          artigos: [],
          revistasCombo: [],
          generosCombo: [],
          autoresCombo:[]
      }
  },
  methods: {
      cancela(){
          this.errors = [];
          this.id = 0;
          this.titulo = "";
          this.revista = null;
          this.generos = [];
          this.autor = null;
          this.enredo = "";
      },
      async getRevistasCombo(query){
        const lettersLimit = 2;

        this.noData = false;
        if (query.length < lettersLimit) {
            this.revistasCombo = [];
            this.loading = false;
            return;
        }
        this.loading = true;

          var vm = this;
          http.get("/revistas?nome="+query)
            .then(function(response){
                vm.revistasCombo = response.data;

                if (!vm.revistasCombo.length)
                    vm.noData = true;
            })
            .catch(function(err){
            
            })
            .finally(function(){
                vm.loading = false;
            });
      },
      async getAutoresCombo(query){
        const lettersLimit = 2;

        if (query.length < lettersLimit) {
            this.autoresCombo = [];
            return;
        }

          var vm = this;
          http.get("/autores?nome="+query)
            .then(function(response){
                vm.autoresCombo = response.data;
            })
            .catch(function(err){
            
            })
            .finally(function(){
            });
      },
      adiciona: function(e){
          this.$store.state.errors = [];
          this.$store.state.messages = [];

          if (this.titulo.trim() == '' 
            || this.revista == null 
            || this.autor == null
            || this.generos == null){
              this.$store.state.errors.push("Campo(s) obrigatório(s) não preenchido(s).");
              return;
          }

          var vm = this;
          if (this.id != 0){
              http.put("/artigos/"+this.id,{id:this.id, titulo: this.titulo, revista: {id: this.revista}, autor: {id: this.autor}, generos: this.generos, enredo: this.enredo})
                .then(function(response){
                    var res = response.data;
                    var index = vm.artigos.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.artigos.splice(index,1,res);
                    vm.cancela();
                    vm.$store.state.messages.push("Artigo alterada com sucesso.");
                  })
                .catch(function(err){
                    vm.$store.state.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/artigos",{id:0, titulo: this.titulo, revista: {id: this.revista}, autor: {id: this.autor}, generos: this.generos, enredo: this.enredo})
                .then(function(response){
                    vm.artigos.push(response.data);
                    vm.cancela();
                    vm.$store.state.messages.push("Artigo adicionada com sucesso.");
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

        var i = this.artigos[index];
        http.delete("/artigos/"+i.id)
            .then(function(response){
                vm.artigos.splice(index,1);
              }
            )
            .catch(function(err){
                 vm.errors.push(err.response.data.message);
                }
            );
      },
      altera(index){
          var i = this.artigos[index];
          this.id = i.id;
          this.titulo = i.titulo;
          this.revista = i.revista;
          this.generos = i.generos;
          this.autor = i.autor;
          this.enredo = i.enredo;
          
          var vm = this;
          http.get("/revistas?nome="+i.revista.nome)
            .then(function(response){
                vm.revistasCombo = response.data;
            })
            .catch(function(err){
            
            });
          http.get("/autores?nome="+i.autor.nome)
            .then(function(response){
                vm.autoresCombo = response.data;
            })
            .catch(function(err){
            
            });
      }
  },
  mounted(){
      // Popular a lista de Artigos aqui
      var vm = this;

      async.parallel(
          {
              getAllArtigos: function(callback){
                  http.get("/artigos")
                    .then(function(response){
                        callback(null,response.data);
                        }
                    );
              },
              getAllGeneros: function(callback){
                  http.get("/generosArtigo")
                    .then(function(response){
                        callback(null,response.data);
                        }
                    );
              }, 
          },
          function(err, results) {
                vm.artigos = results.getAllArtigos;
                vm.generosCombo = results.getAllGeneros;
            }
      );
  }
}
</script>