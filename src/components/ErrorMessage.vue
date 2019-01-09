<template>
    <div class="system-message alert alert-danger" role="alert">
        <button @click.stop="$emit('clearMessage')" class="close">&times;</button>
        <p>{{ error }}</p>
    </div>
</template>
<script>
export default {
    name: 'error-message',
    props: ['error']
}
</script>