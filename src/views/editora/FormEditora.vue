<template>
  <div class="form_editora">
      <modal-template :titulo="titulo" @closeModal="cancela">
        <template slot="body">
    	  <form @submit.prevent="adiciona" method="POST" action="#">

            <div class="form-row">
              <div class="form-group col-md-12 mb-3">
				        <input-text idInput="nomeEditora" label="Nome" v-model="form.nome"
	                :validationCheck="validation.invalidNome"
	                validationMessage="Nome da editora não preenchido ou inválido."
	                textPlaceholder="Nome da editora">
	              </input-text>
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
export default {
  name: 'form-editora',
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
      }
  },
  data () {
    return {
      form : {
        id: this.id, nome: this.nome
      },
      validation: {
        invalidNome: false
      },
      errors: []
    }
  },
  computed: {
  	titulo() {
  	  return this.form.id == 0 ? 'Adiciona Editora' : 'Altera Editora';
  	}
  },
  methods: {
    onClearValidation(){
      this.validation = {invalidNome: false};
    },
    adiciona(){
    this.errors = [];
    this.onClearValidation();

      if (this.form.nome.trim() == ''){
          this.validation.invalidNome = true;
          return;
      }

      var vm = this;
      if (this.form.id != 0){
        http.put("/editoras/"+this.form.id,{id:this.form.id, nome: this.form.nome})
            .then(function(response){
                vm.$emit("successReturn","editora alterado com sucesso!");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao alterar a editora. Tente novamente.";
              if (err.response) {
                errorMsg = err.response.data.message;
              }
              vm.errors.push(errorMsg);
            });
      } else {
        http.post("/editoras",{id:0, nome: this.form.nome})
            .then(function(response){
                vm.$emit("successReturn","Editora adicionada com sucesso.");
            })
            .catch(function(err){
              var errorMsg = "Ocorreu um erro ao adicionar a editora. Tente novamente.";
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