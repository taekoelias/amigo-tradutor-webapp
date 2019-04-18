<template>
  <div class="form_capitulo">
    <modal-template :titulo="tituloForm" @closeModal="cancela">
      <template slot="body">
  	    <form @submit.prevent="adiciona" method="POST" action="#">
  	      <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <input-text idInput="numeroCapitulo" label="Número" v-model="form.numero"
                :validationCheck="validation.invalidNumero"
                validationMessage="Número do capitulo não preenchido ou inválido."
                textPlaceholder="Número do capitulo">
              </input-text>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
			        <input-text idInput="tituloCapitulo" label="Título" v-model="form.tituloOriginal"
                :validationCheck="validation.invalidTitulo"
                validationMessage="Título do capitulo não preenchido ou inválido."
                textPlaceholder="Título do capitulo">
              </input-text>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <label for="artigo" class="sr-only">Artigo</label>
              <cool-select id="artigo" :items="artigoAutocomplete.itens" v-model="form.artigo.id"
                item-text="titulo" item-value="id" :loading="artigoAutocomplete.loading"
                placeholder="Escolha o Artigo" disable-filtering-by-search inputForTextClass="form-control"
                @search="getArtigos" :error-message="validation.invalidArtigo ? 'Artigo não selecionada.' : ''">

                <template slot="no-data" >
                  {{
                      artigoAutocomplete.noData
                      ? "Nenhum dado encontrado."
                      : "São necessárias 2 letras ou mais para consulta."
                  }}
                </template>

                <template slot="item" slot-scope="{ item }">
                  <div style="display: flex; align-items: center;">
                    <div>
                      <span style="font-size: 25px;"> {{ item.titulo }} </span>
                    </div>
                  </div>
                </template>

              </cool-select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group col-md-12 mb-3">
              <label for="volume" class="sr-only">Volume</label>
              <cool-select id="volume" :items="volumeAutocomplete.itens" v-model="form.volume.id"
                item-text="titulo" item-value="id" :loading="volumeAutocomplete.loading"
                placeholder="Escolha o volume do artigo" disable-filtering-by-search inputForTextClass="form-control"
                @search="getVolumes" :error-message="validation.invalidVolume ? 'Volume não selecionado.' : ''">

                <template slot="no-data" >
                  {{
                      volumeAutocomplete.noData
                      ? "Nenhum dado encontrado."
                      : "São necessárias 2 letras ou mais para consulta."
                  }}
                </template>

                <template slot="item" slot-scope="{ item }">
                  <div style="display: flex; align-items: center;">
                    <div>
                      <span style="font-size: 25px;"> {{ item.numero +" - "+ item.titulo }} </span>
                    </div>
                  </div>
                </template>

              </cool-select>
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
import ModalTemplate from '@/components/page/ModalTemplate.vue';
import InputText from '@/components/InputText.vue';
export default {
  name: 'form-capitulo',
  components: {
        InputText, ModalTemplate, CoolSelect
  },
  props: {
      id: {
        type: Number,
        default: 0,
      },
      numero: {
        type: String,
        default: "",
      },
      tituloOriginal: {
      	type: String,
      	default: ""
      },
      artigo: {
        type: Object,
        default: {id : 0, titulo: ""},
      },
      volume: {
        type: Object,
        default: {id : 0, titulo: ""},
      }
  },
  data () {
    return {
      form : {
        id: this.id, numero: this.numero, tituloOriginal: this.tituloOriginal, artigo: this.artigo, 
        volume: this.volume
      },
      validation: {
        invalidTitulo: false, invalidNumero: false, invalidArtigo: false, invalidVolume: false
      },
      artigoAutocomplete: {
        noData: false,
        loading: false,
        itens: []
      },
      volumeAutocomplete: {
        noData: false,
        loading: false,
        itens: []
      },
      errors: []
    }
  },
  computed: {
  	tituloForm() {
  	  return this.form.id == 0 ? 'Adiciona Capitulo' : 'Altera Capitulo';
  	}
  },
  methods: {
  	onClearValidation(){
      this.validation = {invalidTitulo: false, invalidArtigo: false};
    },
    consultaArtigosById(id, success, error, final){
      http.get("/artigos/"+id)
        .then(success)
        .catch(error)
        .finally(final);
    },
    consultaArtigos(query, success, error, final){
      http.get("/artigos?titulo="+query)
        .then(success)
        .catch(error)
        .finally(final);
    },
    consultaVolumesByArtigoId(id, idArtigo, success, error, final){
      http.get("/artigos/"+idArtigo+"/volumes/"+id)
        .then(success)
        .catch(error)
        .finally(final);
    },
    consultaVolumes(query, idArtigo, success, error, final){
      http.get("/volumes?titulo="+query+"&artigo="+idArtigo)
        .then(success)
        .catch(error)
        .finally(final);
    },
    async getArtigos(query){
      const lettersLimit = 2;

      this.artigoAutocomplete.noData = false;
      if (query.length < lettersLimit) {
          this.artigoAutocomplete.itens = [];
          this.artigoAutocomplete.loading = false;
          return;
      }
      this.artigoAutocomplete.loading = true;

      var vm = this;
     this.consultaArtigos(query,
      function(response){
            vm.artigoAutocomplete.itens = response.data;
            if (!vm.artigoAutocomplete.itens.length)
                vm.artigoAutocomplete.noData = true;
        },
      function(err){
          vm.errors.push("Ocorreu um erro ao carregar as artigos.");
        },
      function(){
            vm.artigoAutocomplete.loading = false;
        });
    },
    async getVolumes(query){

      if (Object.keys(this.form.artigo).length !== 0){

        const lettersLimit = 2;

        this.volumeAutocomplete.noData = false;
        if (query.length < lettersLimit) {
            this.volumeAutocomplete.itens = [];
            this.volumeAutocomplete.loading = false;
            return;
        }
        this.volumeAutocomplete.loading = true;

        var vm = this;
       this.consultaVolumes(query,this.form.artigo.id,
        function(response){
              vm.volumeAutocomplete.itens = response.data;
              if (!vm.volumeAutocomplete.itens.length)
                  vm.volumeAutocomplete.noData = true;
          },
        function(err){
            vm.errors.push("Ocorreu um erro ao carregar os volumes.");
          },
        function(){
              vm.volumeAutocomplete.loading = false;
          });
     } else {
      this.volumeAutocomplete.noData = true;
     }
    },
  	adiciona(){
	    this.errors = [];
	    this.onClearValidation();

      var numero = parseInt(this.form.numero);

      if (this.form.tituloOriginal.trim() == '')
        this.validation.invalidTitulo = true;

      if (this.form.numero.length == 0 || numero == 0)
        this.validation.invalidNumero = true;

      if (Object.keys(this.form.artigo).length === 0)
        this.validation.invalidArtigo = true;

      if (Object.keys(this.form.volume).length === 0)
        this.validation.invalidVolume = true;

      if (this.validation.invalidTitulo || this.validation.invalidArtigo 
          || this.validation.invalidNumero || this.validation.invalidVolume)
        return;

      var vm = this;
      if (this.form.id != 0){
        http.put("/artigos/"+this.form.artigo.id
          +"/volumes/"+this.form.volume.id
          +"/capitulos/"+this.form.id,{id:this.form.id, tituloOriginal: this.form.tituloOriginal, numero: numero, 
          artigo: {id: this.form.artigo.id}, volume: {id: this.form.volume.id} })
            .then(function(response){
                vm.$emit("successReturn","Capitulo alterado com sucesso!");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao alterar o capitulo. Tente novamente.";
              if (err.response) {
                errorMsg = err.response.data.message;
              }
              vm.errors.push(errorMsg);
            });
      } else {
        http.post("/artigos/"+this.form.artigo.id
          +"/volumes/"+this.form.volume.id
          +"/capitulos/",{id:this.form.id, tituloOriginal: this.form.tituloOriginal, numero: numero, 
          artigo: {id: this.form.artigo.id}, volume: {id: this.form.volume.id} })
            .then(function(response){
                vm.$emit("successReturn","Capitulo adicionado com sucesso.");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao adicionar o capitulo. Tente novamente.";
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
    // Popular a lista de Artigos aqui
    var vm = this;

    if (Object.keys(this.form.artigo).length !== 0){
      this.consultaArtigosById(this.form.artigo.id,
        function(response){
            vm.artigoAutocomplete.itens.push(response.data);
        },
        function(err){
          vm.errors.push("Ocorreu um erro ao carregar as artigos.");
        },
        function(){
            vm.artigoAutocomplete.loading = false;
        });
    
      if (Object.keys(this.form.volume).length !== 0){
        this.consultaVolumesByArtigoId(this.form.volume.id, this.form.artigo.id,
          function(response){
              vm.volumeAutocomplete.itens.push(response.data);
          },
          function(err){
            vm.errors.push("Ocorreu um erro ao carregar os volumes.");
          },
          function(){
              vm.volumeAutocomplete.loading = false;
          });
      }
    }

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