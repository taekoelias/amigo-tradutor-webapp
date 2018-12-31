<template>
  <div class="idioma">
      <div class="container">
          <h1>Idiomas</h1>
          
          <div v-if="status.code == 'error'" class="alert alert-danger">
              {{status.msg}}
          </div>
        
          <div v-if="status.code == 'ok'" class="alert alert-success">
              {{status.msg}}
          </div>

          <div class="row">
              <div class="col-6">
                  <div class="form-group">
                      <input class="form-control" type="text" 
                        name="nome" id="nomeIdioma" 
                        placeholder="Nome"
                        v-model="nome">
                  </div>
              </div>

              <div class="col-3">
                  <div class="form-group">
                      <input class="form-control" type="text" 
                        name="sigla" id="siglaIdioma" 
                        placeholder="Sigla"
                        v-model="sigla">
                  </div>
              </div>

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
                      <th class="col-5">Nome</th>
                      <th class="col-5">Sigla</th>
                      <th class="col-2" colspan="2"></th>
                  </tr>
              </thead>
              <tbody>
                  <tr class="d-flex" v-for="i in idiomas" :key="i.nome">
                      <td class="col-5">{{i.nome}}</td>
                      <td class="col-5">{{i.sigla}}</td>
                      <td class="col-1">
                          <div class="row justify-content-md-center">
                                <span class="oi oi-loop-circular"></span>
                          </div>
                      </td>
                      <td class="col-1">
                          <div class="row justify-content-md-center">
                              <span class="oi oi-circle-x"></span>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Idioma',
  data () {
      return {
          status: {code: "", msg: ""},
          nome: "", sigla: "",
          idiomas: [
              {id: 1, nome: "Idioma 1", sigla: "ID1"},
              {id: 2, nome: "Idioma 2", sigla: "ID2"}
            ]
      }
  },
  methods: {
      adiciona(){
          this.status = {code: "", msg: ""};

          if (this.nome.trim() == '' || this.sigla.trim() == ''){
              this.status.code = "error";
              this.status.msg = "Campo(s) obrigatório(s) não preenchido(s)."
              return;
          }
          this.idiomas.push({id:0, nome: this.nome, sigla: this.sigla});
          this.nome = "";
          this.sigla = "";
      },
      cancela(){
          this.status = {code: "", msg: ""};
          this.nome = "";
          this.sigla = "";
      }
  }
}
</script>