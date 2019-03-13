<template>
  <div class="inputText">
    <label :for="idInput" class="sr-only">{{label}}</label>
    <input class="form-control" :class=" validationCheck ? 'is-invalid' : ''"
      type="text" name="text" :id="idInput" :placeholder="textPlaceholder" v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)">
    <div class="invalid-feedback">
      {{validationMessage}}
    </div>
  </div>
</template>
<script>
  export default {
    name: "input-text",
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