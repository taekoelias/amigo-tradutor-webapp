<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{titulo}}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('closeModal')">
                    <span aria-hidden="true" >&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
export default {
  name: 'modal-template',
  props: {
      titulo: {
        type: String
      },
  }
}
</script>