<template>
  <div class="form_revista">
    <modal-template :titulo="titulo" @closeModal="cancela">
      <template slot="body">
  	    <form @submit.prevent="adiciona" method="POST" action="#">

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
			        <input-text idInput="nomeRevista" label="Nome" v-model="form.nome"
                :validationCheck="validation.invalidNome"
                validationMessage="Nome da revista não preenchido ou inválido."
                textPlaceholder="Nome da revista">
              </input-text>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <label for="editora" class="sr-only">Editora</label>
              <cool-select id="editora" :items="editoraAutocomplete.editoras" v-model="form.editora.id"
                item-text="nome" item-value="id" :loading="editoraAutocomplete.loading"
                placeholder="Escolha a editora" disable-filtering-by-search inputForTextClass="form-control"
                @search="getEditoras" :error-message="validation.invalidEditora ? 'Editora não selecionada.' : ''">

                <template slot="no-data" >
                  {{
                      editoraAutocomplete.noData
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
              <label for="periodicidade" class="sr-only">Periodicidade de Publicação</label>
              <select id="periodicidade" class="form-control" name="periodicidade" 
                  v-model="form.periodicidade" :class=" validation.invalidPeriodicidade ? 'is-invalid' : ''">
                  <option v-for="p in periodicidadesCombo" :key="p.id" :value="p">{{p.nome}}</option>
              </select>
              <div class="invalid-feedback">
                Periodicidade de publicação não selecionada.
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <label for="publico" class="sr-only">Público-Alvo</label>
              <select id="publico" class="form-control" name="publico"
                  v-model="form.publicos" :class=" validation.invalidPublico ? 'is-invalid' : ''" multiple>
                  <option v-for="p in publicosCombo" :key="p.id" :value="p">{{p.nome}}</option>
              </select>
              <div class="invalid-feedback">
                Público-alvo não selecionado.
              </div>
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
import ModalTemplate from '@/components/page/ModalTemplate.vue';
import InputText from '@/components/InputText.vue';
import {CoolSelect} from 'vue-cool-select'
import async from 'async'
export default {
  name: 'form-revista',
  components: {
        InputText, ModalTemplate, CoolSelect
  },
  props: {
      id: {
        type: Number,
        default: 0,
      },
      nome: {
      	type: String,
      	default: ""
      },
      editora: {
        type: Object,
        default: {id : 0, nome: ""},
      },
      periodicidade: {
        type: Object,
        default: null,
      },
      publicos: {
        type: Array
      }
  },
  data () {
    return {
      form : {
        id: this.id, nome: this.nome, editora: this.editora,
        periodicidade: this.periodicidade, publicos: this.publicos
      },
      validation: {
        invalidNome: false, invalidEditora: false, 
        invalidPeriodicidade: false, invalidPublico: false
      },
      editoraAutocomplete: {
        noData: false,
        loading: false,
        editoras: []
      },
      periodicidadesCombo: [],
      publicosCombo: [],
      errors: []
    }
  },
  computed: {
  	titulo() {
  	  return this.form.id == 0 ? 'Adiciona Revista' : 'Altera Revista';
  	}
  },
  methods: {
  	onClearValidation(){
      this.validation = {invalidNome: false, invalidEditora: false};
    },
    consultaEditoras(query, success, error, final){
      http.get("/editoras?nome="+query)
        .then(success)
        .catch(error)
        .finally(final);
    },
    async getEditoras(query){
      const lettersLimit = 2;

      this.editoraAutocomplete.noData = false;
      if (query.length < lettersLimit) {
          this.editoraAutocomplete.editoras = [];
          this.editoraAutocomplete.loading = false;
          return;
      }
      this.editoraAutocomplete.loading = true;

      var vm = this;
     this.consultaEditoras(query,
      function(response){
            vm.editoraAutocomplete.editoras = response.data;
            if (!vm.editoraAutocomplete.editoras.length)
                vm.editoraAutocomplete.noData = true;
        },
      function(err){
          vm.errors.push("Ocorreu um erro ao carregar as editoras.");
        },
      function(){
            vm.editoraAutocomplete.loading = false;
        });
    },
  	adiciona(){
	    this.errors = [];
	    this.onClearValidation();

      if (this.form.nome.trim() == '')
          this.validation.invalidNome = true;

      if (this.form.editora == 0)
          this.validation.invalidEditora = true;

      if (!this.form.periodicidade.hasOwnProperty("id"))
          this.validation.invalidPeriodicidade = true;

      if (this.form.publicos.length == 0)
          this.validation.invalidPublico = true;

      if (this.validation.invalidNome || this.validation.invalidEditora
          || this.validation.invalidPeriodicidade || this.validation.invalidPublico)
        return;

      var vm = this;
      if (this.form.id != 0){
        http.put("/revistas/"+this.form.id,{id:this.form.id, nome: this.form.nome, editora: {id: this.form.editora}, 
          periodicidade: this.form.periodicidade, publicos: this.form.publicos })
            .then(function(response){
                vm.$emit("successReturn","Revista alterada com sucesso!");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao alterar a revista. Tente novamente.";
              if (err.response) {
                errorMsg = err.response.data.message;
              }
              vm.errors.push(errorMsg);
            });
      } else {
        http.post("/revistas",{id:0, nome: this.form.nome, editora: {id: this.form.editora}, 
          periodicidade: this.form.periodicidade, publicos: this.form.publicos })
            .then(function(response){
                vm.$emit("successReturn","Revista adicionada com sucesso.");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao adicionar a revista. Tente novamente.";
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
        vm.periodicidadesCombo = results.getAllPeriodicidades;
        vm.publicosCombo = results.getAllPublicos;
      }
    );

    if (this.form.editora.id != 0){
      this.consultaEditoras(this.form.editora.nome,
        function(response){
            vm.editoraAutocomplete.editoras = response.data;
        },
        function(err){
          vm.errors.push("Ocorreu um erro ao carregar as editoras.");
        },
        function(){
            vm.editoraAutocomplete.loading = false;
        });
    }
  }
}
</script>