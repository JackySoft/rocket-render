<template>
    <div class="search-box">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'SearchBox'
}
</script>
<style lang="scss">
    .search-box{
        background-color: #ffffff;
        margin-bottom: 20px;
        padding: 20px 20px 0;
        border-radius: 4px;
        border: 1px solid #ebeef5;
    }
</style>
