<template>
  <div class="pageTemplate">
    <section class="forms">
      <header>
        <h1 class="h3 display">{{title}}</h1>
      </header>

      <div class="row">
        <div class="col-lg-6">
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
              @clearMessage="onClearMessage(index)">
          </success-message>
        </div>
      </div>
      <slot name="form"></slot>

      <br />

      <slot name="list"></slot>
    </section>
  </div>
</template>
<script>
  import ErrorMessage from '@/components/common/ErrorMessage.vue';
  import SuccessMessage from '@/components/common/SuccessMessage.vue';
  export default {
    name: 'page-template',
    components: {
      ErrorMessage, SuccessMessage
    },
    props: {
      title: {
        type: String,
        required: true
      },
      errors: Array,
      messages: Array
    },
    data: function () {
      return {

      }
    },
    methods: {
      onClearError(index){
        this.errors.splice(index,1);
      },
      onClearMessage(index){
        this.messages.splice(index,1);
      }
    }
  }
</script>
