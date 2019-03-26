<template>
	<div class="listagem_autor">
  		<div class="table-responsive">
      		<table class="table table-striped">
      			<thead>
                    <tr>
                    	<th class="col-10">Nome</th>
                        <th class="col-2" colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!!autores.length" v-for="(a, index) in autores" :key="a.nome">
                        <td>{{a.nome}}</td>
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
                    <tr v-if="!!!autores.length">
                        <td class="text-center" colspan="3">
                            <i>Nenhuma autor encontrado.</i>
                        </td>
                    </tr>
                </tbody>
      		</table>
      	</div>
	</div>
</template>

<script>
  export default {
    name: 'list-autor',
    props: {
      autores: {
        type: Array
      }
    }
  }
</script>