<template>
  <div class="page-content-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
};
</script>

<style scoped>
.page-content-wrapper {
  padding: 20px;
  background: #eef0f3;
}
</style>
