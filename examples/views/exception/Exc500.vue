<template>
  <Wrapper>
    <div class="exception">
      <Exception :code="500"/>
    </div>
  </Wrapper>
</template>

<script>
export default {
  name: 'Exc500'
}
</script>

<style scoped lang="scss">
.exception {
  height: 100%;
  background: white;
  text-align: center;
}
</style>
