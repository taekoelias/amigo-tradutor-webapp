<template>
    <div class="system-message alert alert-danger" role="alert">
        <button @click.stop="$emit('clearMessage')" class="close">&times;</button>
        <span>{{ error }}</span>
    </div>
</template>
<script>
export default {
    name: 'error-message',
    props: ['error']
}
</script>
