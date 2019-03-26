<template>
	<div class="listagem_editora">
  		<div class="table-responsive">
      		<table class="table table-striped">
      			<thead>
                    <tr>
                    	<th class="col-10">Nome</th>
                        <th class="col-2" colspan="2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="!!editoras.length" v-for="(a, index) in editoras" :key="a.nome">
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
                    <tr v-if="!!!editoras.length">
                        <td class="text-center" colspan="3">
                            <i>Nenhuma editora encontrada.</i>
                        </td>
                    </tr>
                </tbody>
      		</table>
      	</div>
	</div>
</template>

<script>
  export default {
    name: 'list-editora',
    props: {
      editoras: {
        type: Array
      }
    }
  }
</script>