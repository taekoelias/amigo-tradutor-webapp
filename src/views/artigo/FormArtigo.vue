<template>
  <div class="form_artigo">
    <modal-template :titulo="tituloForm" @closeModal="cancela">
      <template slot="body">
  	    <form @submit.prevent="adiciona" method="POST" action="#">
  	      <div class="form-row">
            <div class="form-group col-md-12 mb-3">
			  <input-text idInput="tituloArtigo" label="Título" v-model="form.titulo"
                :validationCheck="validation.invalidTitulo"
                validationMessage="Título do artigo não preenchido ou inválido."
                textPlaceholder="Título do artigo">
              </input-text>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <label for="revista" class="sr-only">Revista</label>
              <cool-select id="revista" :items="revistaAutocomplete.itens" v-model="form.revista.id"
                item-text="nome" item-value="id" :loading="revistaAutocomplete.loading"
                placeholder="Escolha a Revista" disable-filtering-by-search inputForTextClass="form-control"
                @search="getRevistas" :error-message="validation.invalidRevista ? 'Revista não selecionada.' : ''">

                <template slot="no-data" >
                  {{
                      revistaAutocomplete.noData
                      ? "Nenhum dado encontrado."
                      : "São necessárias 2 letras ou mais para consulta."
                  }}
                </template>

                <template slot="item" slot-scope="{ item }">
                  <div style="display: flex; align-items: center;">
                    <div>
                      <span style="font-size: 25px;"> {{ item.nome }} </span>
                    </div>
                  </div>
                </template>

              </cool-select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <label for="autor" class="sr-only">Autor</label>
              <cool-select id="autor" :items="autorAutocomplete.itens" v-model="form.autor.id"
                item-text="nome" item-value="id" :loading="autorAutocomplete.loading"
                placeholder="Escolha o autor(a)" disable-filtering-by-search inputForTextClass="form-control"
                @search="getAutores" :error-message="validation.invalidAutor ? 'Autor não selecionado.' : ''">

                <template slot="no-data" >
                  {{
                      autorAutocomplete.noData
                      ? "Nenhum dado encontrado."
                      : "São necessárias 2 letras ou mais para consulta."
                  }}
                </template>

                <template slot="item" slot-scope="{ item }">
                  <div style="display: flex; align-items: center;">
                    <div>
                      <span style="font-size: 25px;"> {{ item.nome }} </span>
                    </div>
                  </div>
                </template>

              </cool-select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <label for="genero" class="sr-only">Gênero</label>
              <select id="genero" class="form-control" name="genero"
                  v-model="form.generos" :class=" validation.invalidGenero ? 'is-invalid' : ''" multiple>
                  <option v-for="p in generosCombo" :key="p.id" :value="p">{{p.nome}}</option>
              </select>
              <div class="invalid-feedback">
                Gênero não selecionado.
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <text-area idInput="enredo" label="Enredo" v-model="form.enredo"
                  :validationCheck="validation.invalidEnredo"
                  validationMessage="Enredo do artigo não preenchido ou inválido."
                  textPlaceholder="Enredo do artigo">
                </text-area>
			</div>
		  </div>

		  <div class="float-right">
            <button class="btn btn-secondary" @click="cancela">Cancelar</button>
            <input class="btn btn-primary" type="submit" value="Salvar" />
          </div>
  	    </form>
  	  </template>
  	</modal-template>
  </div>
</template>
<script>
import http from '@/http'
import {CoolSelect} from 'vue-cool-select'
import async from 'async'
import TextArea from '@/components/TextArea.vue';
import ModalTemplate from '@/components/page/ModalTemplate.vue';
import InputText from '@/components/InputText.vue';
export default {
  name: 'form-artigo',
  components: {
        InputText, ModalTemplate, CoolSelect, TextArea
  },
  props: {
      id: {
        type: Number,
        default: 0,
      },
      titulo: {
      	type: String,
      	default: ""
      },
      revista: {
        type: Object,
        default: {id : 0, nome: ""},
      },
      autor: {
        type: Object,
        default: {id : 0, nome: ""},
      },
      generos: {
        type: Array
      },
      enredo : {
      	type: String
      }
  },
  data () {
    return {
      form : {
        id: this.id, titulo: this.titulo, revista: this.revista,
        autor: this.autor, generos: this.generos, enredo: this.enredo
      },
      validation: {
        invalidTitulo: false, invalidRevista: false, 
        invalidAutor: false, invalidGenero: false,
        invalidEnredo: false
      },
      revistaAutocomplete: {
        noData: false,
        loading: false,
        itens: []
      },
      autorAutocomplete: {
        noData: false,
        loading: false,
        itens: []
      },
      generosCombo: [],
      errors: []
    }
  },
  computed: {
  	tituloForm() {
  	  return this.form.id == 0 ? 'Adiciona Artigo' : 'Altera Artigo';
  	}
  },
  methods: {
  	onClearValidation(){
      this.validation = {invalidTitulo: false, invalidRevista: false, 
        invalidAutor: false, invalidGenero: false, invalidEnredo: false};
    },
    consultaRevistas(query, success, error, final){
      http.get("/revistas?nome="+query)
        .then(success)
        .catch(error)
        .finally(final);
    },
    consultaAutores(query, success, error, final){
      http.get("/autores?nome="+query)
        .then(success)
        .catch(error)
        .finally(final);
    },
    async getRevistas(query){
      const lettersLimit = 2;

      this.revistaAutocomplete.noData = false;
      if (query.length < lettersLimit) {
          this.revistaAutocomplete.itens = [];
          this.revistaAutocomplete.loading = false;
          return;
      }
      this.revistaAutocomplete.loading = true;

      var vm = this;
     this.consultaRevistas(query,
      function(response){
            vm.revistaAutocomplete.itens = response.data;
            if (!vm.revistaAutocomplete.itens.length)
                vm.revistaAutocomplete.noData = true;
        },
      function(err){
          vm.errors.push("Ocorreu um erro ao carregar as revistas.");
        },
      function(){
            vm.revistaAutocomplete.loading = false;
        });
    },
    async getAutores(query){
      const lettersLimit = 2;

      this.autorAutocomplete.noData = false;
      if (query.length < lettersLimit) {
          this.autorAutocomplete.itens = [];
          this.autorAutocomplete.loading = false;
          return;
      }
      this.autorAutocomplete.loading = true;

      var vm = this;
     this.consultaAutores(query,
      function(response){
            vm.autorAutocomplete.itens = response.data;
            if (!vm.autorAutocomplete.itens.length)
                vm.autorAutocomplete.noData = true;
        },
      function(err){
          vm.errors.push("Ocorreu um erro ao carregar os autores.");
        },
      function(){
            vm.autorAutocomplete.loading = false;
        });
    },
  	adiciona(){
	    this.errors = [];
	    this.onClearValidation();

      if (this.form.titulo.trim() == '')
          this.validation.invalidTitulo = true;

      if (this.form.revista == 0)
          this.validation.invalidRevista = true;

      if (this.form.autor == 0)
          this.validation.invalidAutor = true;

      if (this.form.generos.length == 0)
          this.validation.invalidGenero = true;

      if (this.form.enredo.trim() == '')
          this.validation.invalidEnredo = true;

      if (this.validation.invalidTitulo || this.validation.invalidRevista
          || this.validation.invalidAutor || this.validation.invalidGenero
          || this.validation.invalidEnredo)
        return;

      var vm = this;
      if (this.form.id != 0){
        http.put("/artigos/"+this.form.id,{id:this.form.id, titulo: this.form.titulo, revista: {id: this.form.revista.id}, 
          autor: {id: this.form.autor.id}, generos: this.form.generos, enredo: this.form.enredo })
            .then(function(response){
                vm.$emit("successReturn","Artigo alterado com sucesso!");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao alterar o artigo. Tente novamente.";
              if (err.response) {
                errorMsg = err.response.data.message;
              }
              vm.errors.push(errorMsg);
            });
      } else {
        http.post("/artigos",{id:this.form.id, titulo: this.form.titulo, revista: {id: this.form.revista.id}, 
          autor: {id: this.form.autor.id}, generos: this.form.generos, enredo: this.form.enredo })
            .then(function(response){
                vm.$emit("successReturn","Artigo adicionado com sucesso.");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao adicionar o artigo. Tente novamente.";
              if (err.response) {
                errorMsg = err.response.data.message;
              }
              vm.errors.push(errorMsg);
            });
      }
    },
    cancela(){
    	this.$emit("cancelReturn");
    }
  },
  mounted(){
    // Popular a lista de Revistas aqui
    var vm = this;

    async.parallel(
      {
        getAllGeneros: function(callback){
            http.get("/generosArtigo")
              .then(function(response){
                  callback(null,response.data);
                });
        },
      },
      function(err, results) {
        vm.generosCombo = results.getAllGeneros;
      }
    );

    if (this.form.revista.id != 0){
      this.consultaRevistas(this.form.revista.nome,
        function(response){
            vm.revistaAutocomplete.itens = response.data;
        },
        function(err){
          vm.errors.push("Ocorreu um erro ao carregar as revistas.");
        },
        function(){
            vm.revistaAutocomplete.loading = false;
        });
    }

    if (this.form.autor.id != 0){
      this.consultaAutores(this.form.autor.nome,
        function(response){
            vm.autorAutocomplete.itens = response.data;
        },
        function(err){
          vm.errors.push("Ocorreu um erro ao carregar os autores.");
        },
        function(){
            vm.autorAutocomplete.loading = false;
        });
    }
  }
}
</script>