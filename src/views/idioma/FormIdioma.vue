<template>
  <div class="form_idioma">
      <modal-template :titulo="titulo" @closeModal="cancela">
        <template slot="body">
            <form @submit.prevent="adiciona" method="POST" action="#">
	          <div class="form-row">
	             <div class="col-md-6 mb-3">
	               <input-text idInput="nomeIdioma" label="Nome" v-model="form.nome"
	                :validationCheck="validation.invalidNome"
	                validationMessage="Nome do idioma não preenchido ou inválido."
	                textPlaceholder="Nome">
	               </input-text>
	             </div>
	             <div class="col-md-6 mb-3">
	               <input-text idInput="siglaIdioma" label="Sigla" v-model="form.sigla"
	                :validationCheck="validation.invalidSigla"
	                validationMessage="Sigla do idioma não preenchida ou inválida."
	                textPlaceholder="Sigla">
	               </input-text>
	             </div>
	          </div>
			  <div class="float-right">
	          	<button type="button" class="btn btn-secondary" @click="cancela">Cancelar</button>
            	<input type="submit" class="btn btn-primary" value="Salvar" >
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
export default {
  name: 'form-idioma',
  components: {
        InputText, ModalTemplate
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
      sigla: {
      	type: String,
      	default: ""
      }
  },
  data () {
      return {
          form : {
              id: this.id, nome: this.nome, sigla: this.sigla
          },
          validation: {
            invalidNome: false, invalidSigla: false
          },
          errors: []
      }
  },
  computed: {
	titulo() {
	  return this.form.id == 0 ? 'Adiciona Idioma' : 'Altera Idioma';
	}
  },
  methods: {
    onClearValidation(){
      this.validation = {invalidNome: false, invalidSigla: false};
    },
    adiciona(){
	    this.errors = [];
	    this.onClearValidation();

	      if (this.form.nome.trim() == ''){
	          this.validation.invalidNome = true;
	      }

	      if (this.form.sigla.trim() == ''){
	          this.validation.invalidSigla = true;
	      }

	      if (this.validation.invalidNome || this.validation.invalidSigla)
	        return;

	      var vm = this;
	      if (this.form.id != 0){
	          http.put("/idiomas/"+this.form.id,{id:this.form.id, nome: this.form.nome, sigla: this.form.sigla})
	            .then(function(response){
	            	vm.$emit("successReturn","Idioma alterado com sucesso!");
	            })
	            .catch(function(err){
	              var errorMsg = "Ocorreu um erro ao alterar o idioma. Tente novamente.";
	              if (err.response) {
	                errorMsg = err.response.data.message;
	              }
	              vm.errors.push(errorMsg);
	            });
	      } else {
	        http.post("/idiomas",{id:0, nome: this.form.nome, sigla: this.form.sigla})
	            .then(function(response){
	            	vm.$emit("successReturn","Idioma adicionado com sucesso!");
	              })
	            .catch(function(err){
	                var errorMsg = "Ocorreu um erro ao adicionar o idioma. Tente novamente.";
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
  }
}
</script>