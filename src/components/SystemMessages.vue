<template>
    <div class="system-messages sticky-top">
        <error-message
            v-for="(error, index) in errors"
            :key="index"
            :error="error"
            @clearMessage="onClearError(index)">
        </error-message>
        <success-message
            v-for="(message, index) in messages"
            :key="index"
            :message="message"
            @clearMessage="onClearMessage(index)"
            v-delay="()=>onClearMessage(index)">
        </success-message>
    </div>
</template>
<script>
import ErrorMessage from './ErrorMessage.vue';
import SuccessMessage from './SuccessMessage.vue';
export default {
    name: 'system-messages',
    components: {
        ErrorMessage,
        SuccessMessage
    },
    computed: {
        errors() {
            return this.$store.state.errors;
        },
        messages() {
            return this.$store.state.messages;
        }
    },
    methods: {
        onClearError(index) {
            this.$store.dispatch('removeError',index);
        },
        onClearMessage(index) {
            this.$store.dispatch('removeMessage',index);
        }
    }
}
</script>