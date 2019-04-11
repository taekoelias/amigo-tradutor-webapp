<template>
	<div class="listagem_artigo">
  		<div class="table-responsive">
      		<table class="table table-striped">
      			<thead>
                    <tr>
                    	<th class="col-10">Título</th>
                        <th class="col-2" colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!!artigos.length" v-for="(a, index) in artigos" :key="a.titulo">
                        <td>{{a.titulo}}</td>
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
                    <tr v-if="!!!artigos.length">
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
  export default {
    name: 'list-artigo',
    props: {
      artigos: {
        type: Array
      }
    }
  }
</script>