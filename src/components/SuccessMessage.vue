<template>
    <div class="system-message alert alert-success" role="alert">
        <button @click.stop="$emit('clearMessage')" class="close">&times;</button>
        <p>{{ message }}</p>
    </div>
</template>
<script>
export default {
    name: 'success-message',
    props: ['message']
}
</script>