<template>
    <div class="system-message alert alert-success" role="alert">
        <button @click.stop="$emit('clearMessage')" class="close">&times;</button>
        <span>{{ message }}</span>
    </div>
</template>
<script>
export default {
    name: 'success-message',
    props: ['message']
}
</script>
