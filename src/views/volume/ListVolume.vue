<template>
	<div class="listagem_volume">
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
                <tr v-if="!!volumes.length" v-for="(v, index) in volumes" :key="v.titulo">
                    <td>{{v.numero}}</td>
                    <td>{{v.titulo}}</td>
                    <td>{{v.artigo.titulo}}</td>
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
                <tr v-if="!!!volumes.length">
                    <td class="text-center" colspan="3">
                        <i>Nenhuma volume encontrado.</i>
                    </td>
                </tr>
            </tbody>
      		</table>
      	</div>
	</div>
</template>

<script>
  export default {
    name: 'list-volume',
    props: {
      volumes: {
        type: Array
      }
    }
  }
</script>