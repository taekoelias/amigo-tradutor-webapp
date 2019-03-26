<template>
  <div class="form_periodicidade">
      <modal-template :titulo="titulo" @closeModal="cancela">
        <template slot="body">
    	  <form @submit.prevent="adiciona" method="POST" action="#">

            <div class="form-row">
              <div class="form-group col-md-12 mb-3">
				        <input-text idInput="nomePeriodicidade" label="Nome" v-model="form.nome"
	                :validationCheck="validation.invalidNome"
	                validationMessage="Nome da periodicidade de publicação não preenchido ou inválido."
	                textPlaceholder="Nome da periodicidade de publicação">
	              </input-text>
              </div>

              <div class="form-group col-md-12 mb-3">
                <text-area idInput="descricaoPeriodicidade" label="Descrição" v-model="form.descricao"
                  :validationCheck="validation.invalidDescricao"
                  validationMessage="Descrição da periodicidade de publicação não preenchido ou inválido."
                  textPlaceholder="Descrição da periodicidade de publicação">
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
import ModalTemplate from '@/components/page/ModalTemplate.vue';
import InputText from '@/components/InputText.vue';
import TextArea from '@/components/TextArea.vue';
export default {
  name: 'form-periodicidade',
  components: {
        InputText, TextArea, ModalTemplate
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
      descricao: {
        type: String,
        default: ""
      }
  },
  data () {
    return {
      form : {
        id: this.id, nome: this.nome, descricao: this.descricao
      },
      validation: {
        invalidNome: false,
        invalidDescricao: false
      },
      errors: []
    }
  },
  computed: {
  	titulo() {
  	  return this.form.id == 0 ? 'Adiciona Periodicidade de Publicação' : 'Altera Periodicidade de Publicação';
  	}
  },
  methods: {
  	onClearValidation(){
      this.validation = {invalidNome: false, invalidDescricao: false};
    },
  	adiciona(){
	  this.errors = [];
	  this.onClearValidation();

      if (this.form.nome.trim() == ''){
          this.validation.invalidNome = true;
          return;
      }

      if (this.form.descricao.trim() == ''){
          this.validation.invalidDescricao = true;
          return;
      }

      var vm = this;
      if (this.form.id != 0){
        http.put("/periodicidadesPublicacao/"+this.form.id,{id:this.form.id, nome: this.form.nome, descricao: this.form.descricao})
            .then(function(response){
                vm.$emit("successReturn","Periodicidade de publicação alterado com sucesso!");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao alterar a periodicidade de publicação. Tente novamente.";
              if (err.response) {
                errorMsg = err.response.data.message;
              }
              vm.errors.push(errorMsg);
            });
      } else {
        http.post("/periodicidadesPublicacao",{id:0, nome: this.form.nome, descricao: this.form.descricao})
            .then(function(response){
                vm.$emit("successReturn","Periodicidade de publicação adicionado com sucesso.");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao adicionar a periodicidade de publicação. Tente novamente.";
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