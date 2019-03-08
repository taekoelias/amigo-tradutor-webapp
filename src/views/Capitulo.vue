<template>
  <div class="capitulo">
      <div class="container">
          <h1>Capítulo</h1>

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
                <label>Artigo</label>
                <cool-select
                    :items="artigosCombo"
                    v-model="artigo"
                    item-text="titulo"
                    item-value="id"
                    :loading="loading"
                    placeholder="Escolha o artigo"
                    disable-filtering-by-search
                    @search="getArtigosCombo">

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
                            <span style="font-size: 25px;"> {{ item.titulo }} </span> <br />
                            <span style="color: grey;"> {{ item.autor.nome }} </span>
                            </div>
                        </div>
                    </template>

                </cool-select>
            </div>

            <div v-show="artigo">

              <div class="form-group">
                  <input class="form-control" type="text"
                      name="numero" id="numeroCapitulo"
                      placeholder="Número do capítulo"
                      v-model="numero" />
              </div>

              <div class="form-group">
                  <input class="form-control" type="text"
                      name="titulo" id="tituloCapitulo"
                      placeholder="Título do capitulo"
                      v-model="titulo" />
              </div>

              <div class="form-group">
                  <label>Volume</label>
                  <cool-select
                      :items="volumesCombo"
                      v-model="volume"
                      item-text="titulo"
                      item-value="id"
                      placeholder="Escolha o volume">

                      <template slot="no-data" >
                          {{
                              "Nenhum dado encontrado."
                          }}
                      </template>

                      <template slot="item" slot-scope="{ item }">
                          <div style="display: flex; align-items: center;">
                              <div>
                              <span style="font-size: 25px;"> {{ item.numero }}. {{ item.titulo }} </span> <br />
                              </div>
                          </div>
                      </template>

                  </cool-select>
              </div>

              <div class="form-group">
                  <input class="btn btn-success" type="submit" value="Adicionar" />
                  <button class="btn btn-danger" @click.prevent.stop="cancela()">Cancelar</button>
              </div>

            </div>

          </form>

          <table class="table table-striped table-bordered">
              <thead class="thead-dark">
                  <tr class="d-flex">
                      <th class="col-1">Número</th>
                      <th class="col-11" colspan="2">Título</th>
                  </tr>
              </thead>
              <tbody v-if="!!capitulos.length">
                  <tr class="d-flex" v-for="(c, index) in capitulos" :key="c.id">
                      <td class="col-1">{{c.numero}}</td>
                      <td class="col-9">{{c.tituloOriginal}}</td>
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
            <tbody v-if="!!!capitulos.length">
                <tr>
                    <td class="text-center" colspan="3">
                        <i>Nenhuma capitulo encontrado.</i>
                    </td>
                </tr>
            </tbody>
          </table>
      </div>
  </div>
</template>

<script>
import http from '../http'
import ErrorMessage from '@/components/common/ErrorMessage.vue'
import SuccessMessage from '@/components/common/SuccessMessage.vue'
import {CoolSelect} from 'vue-cool-select'
import async from 'async'
import _ from 'underscore'
export default {
  name: 'Capitulo',
  components: {
        ErrorMessage, SuccessMessage, CoolSelect
    },
  data () {
      return {
        errors: [], messages: [],
          loading: false,
          noData: false,
          id: 0, titulo: "",
          numero: null,
          artigo: null,
          volume: null,
          capitulos: [],
          artigosCombo: [],
          volumesCombo: []
      }
  },
  watch: {
    artigo: function (newArtigo, oldArtigo) {
      if (newArtigo != oldArtigo && newArtigo != null){
        var vm = this;
        http.get("/artigos/"+newArtigo+"/capitulos/")
          .then(function(response){
              vm.capitulos = response.data;
            })
          .catch(function(err){
              vm.errors.push(err.response.data.message);
            }
          );

        http.get("/artigos/"+newArtigo+"/volumes/")
          .then(function(response){
              vm.volumesCombo = response.data;
            })
          .catch(function(err){
              vm.errors.push(err.response.data.message);
            }
          );
      } else {
        this.capitulos = [];
        this.volumesCombo = [];
      }
    }
  },
  methods: {
    onClearError(index){
      this.errors.splice(index,1);
    },
    onClearMessage(index){
      this.messages.splice(index,1);
    },
      cancela(){
          this.id = 0;
          this.titulo = "";
          this.numero = null;
          this.artigo = null;
      },
      async getArtigosCombo(query){
        const lettersLimit = 2;

        this.noData = false;
        if (query.length < lettersLimit) {
            this.artigosCombo = [];
            this.loading = false;
            return;
        }
        this.loading = true;

          var vm = this;
          http.get("/artigos?titulo="+query)
            .then(function(response){
                vm.artigosCombo = response.data;

                if (!vm.artigosCombo.length)
                    vm.noData = true;
            })
            .catch(function(err){

            })
            .finally(function(){
                vm.loading = false;
            });
      },
      adiciona: function(e){
          this.errors = [];
          this.messages = [];

          this.numero = parseInt(this.numero);

          if (this.titulo.trim() == ''
            || this.numero <= 0
            || this.artigo == null
            || this.volume == null){
              this.errors.push("Campo(s) obrigatório(s) não preenchido(s).");
              return;
          }

          var vm = this;
          if (this.id != 0){
              http.put("/artigos/"+this.artigo+"/volumes/"+this.volume+"/capitulos/"+this.id,{id:this.id, tituloOriginal: this.titulo, tituloTraduzido: this.titulo, numero: this.numero})
                .then(function(response){
                    var res = response.data;
                    var index = vm.capitulos.map(function(e){ return e.id;}).indexOf(vm.id);
                    vm.capitulos.splice(index,1,res);
                    vm.cancela();
                    vm.messages.push("Capítulo alterada com sucesso.");
                  })
                .catch(function(err){
                    vm.errors.push(err.response.data.message);
                  }
                );
          } else {
            http.post("/artigos/"+this.artigo+"/volumes/"+this.volume+"/capitulos/",{id:0, tituloOriginal: this.titulo, tituloTraduzido: this.titulo, numero: this.numero})
                .then(function(response){
                    vm.capitulos.push(response.data);
                    vm.cancela();
                    vm.messages.push("Capítulo adicionada com sucesso.");
                  })
                .catch(function(err){
                    vm.errors.push(err.response.data.message);
                  }
                );
          }
      },
      remove(index){
        var vm = this;
        this.errors = [];
        this.messages = [];

        var i = this.capitulos[index];
        http.delete("/artigos/"+i.artigo.id+"/volumes/"+i.volume.id+"/capitulos/"+i.id)
            .then(function(response){
                vm.capitulos.splice(index,1);
              }
            )
            .catch(function(err){
                 vm.errors.push(err.response.data.message);
                }
            );
      },
      altera(index){
          var i = this.capitulos[index];
          this.id = i.id;
          this.titulo = i.titulo;
          this.artigo = i.artigo.id;

          this.errors = [];
          this.messages = [];
          var vm = this;
          http.get("/artigos/"+i.artigo.id)
            .then(function(response){
                i.artigo = response.data;
            })
            .catch(function(err){

            });

          http.get("/artigos?titulo="+i.artigo.titulo)
            .then(function(response){
                vm.artigosCombo = response.data;
            })
            .catch(function(err){

            });
      }
  },
  mounted(){
      // Popular a lista de Capítulos aqui
      var vm = this;

      function setInputFilter(textbox, inputFilter) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
          textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
              this.oldValue = this.value;
              this.oldSelectionStart = this.selectionStart;
              this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
              this.value = this.oldValue;
              this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
          });
        });
      };

      setInputFilter(document.getElementById("numeroCapitulo"), function(value) {
        return /^\d*\.?\d*$/.test(value);
      });
  }
}
</script>
