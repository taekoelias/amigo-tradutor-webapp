<template>
    <div class="system-message alert alert-danger" role="alert">
        <button @click.stop="$emit('clearMessage')" class="close">&times;</button>
        <ul><li v-for="(message, index) in error.messages" :key="index">{{ message }}</li></ul>
    </div>
</template>
<script>
export default {
    name: 'error-message',
    props: ['error']
}
</script>