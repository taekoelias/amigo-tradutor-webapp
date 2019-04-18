<template>
	<div class="listagem_capitulo">
  		<div class="table-responsive">
      		<table class="table table-striped">
      			<thead>
                    <tr>
                      <th>#</th>
                    	<th>Título</th>
                      <th>Artigo</th>
                      <th colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!!capitulos.length" v-for="(c, index) in capitulos" :key="c.titulo">
                        <td>{{c.numero}}</td>
                        <td>{{c.tituloOriginal}}</td>
                        <td>{{c.artigo.titulo}}</td>
                        <td>
                            <div class="row justify-content-md-center">
                                <button class="btn" @click.prevent.stop="$emit('altera',index)">
                                  <span class="oi oi-loop-circular"></span>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="row justify-content-md-center">
                                <button class="btn" @click.prevent.stop="$emit('remove',index)">
                                  <span class="oi oi-circle-x"></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!!!capitulos.length">
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
  export default {
    name: 'list-capitulo',
    props: {
      capitulos: {
        type: Array
      }
    }
  }
</script>