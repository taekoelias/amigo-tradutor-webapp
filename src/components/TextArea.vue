<template>
  <div class="text_area">
    <label :for="idInput" class="sr-only">{{label}}</label>
    <textarea class="form-control" :class=" validationCheck ? 'is-invalid' : ''"
       name="textarea" :id="idInput" :placeholder="textPlaceholder" v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)" rows="5">
    </textarea>
    <div class="invalid-feedback">
      {{validationMessage}}
    </div>
  </div>
</template>
<script>
  export default {
    name: "text-area",
    props:{
      idInput: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      },
      textPlaceholder: {
        type: String,
        default: ""
      },
      validationMessage: {
        type: String,
        default: ""
      },
      validationCheck: {
        type: Boolean,
        default: false
      },
    }
  }
</script>