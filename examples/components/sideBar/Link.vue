<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>

export default {
  name: 'AppLink',
  props: {
    to: {
      type: String,
      required: true
    }
  },
  computed: {
    isExternal () {
      return /^(https?:|mailto:|tel:)/.test(this.to)
    },
    type () {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps (to) {
      return {
        // tag: 'div',
        to: to
      }
    }
  }
}
</script>
