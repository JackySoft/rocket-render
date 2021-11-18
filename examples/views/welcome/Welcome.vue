<template>
  <Wrapper>
    <div class="welcome">
      <div class="welcome-desc">
        <!-- TODO 初始化完成后可以替换这里的相关说明 -->
        <h1 class="welcome-inner-title">欢迎使用</h1>
        <p class="welcome-inner-content">Rocket-Render</p>
        <p class="welcome-inner-tip">-- 河畔一角</p>
        <p class="wechat"><img src="wechat.jpg" alt="" /></p>
      </div>
      <div class="welcome-image"></div>
    </div>
  </Wrapper>
</template>

<script>
export default {
  name: 'Welcome',
};
</script>

<style scoped lang="scss">
.welcome {
  background: #fff;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .welcome-desc {
    position: relative;
    bottom: 40px;

    .welcome-inner-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }

    .welcome-inner-content {
      font-size: 44px;
      line-height: 62px;
      color: #409eff;
    }
    .wechat {
      width: 280px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .welcome-inner-tip {
    text-align: right;
    margin-top: 20px;
    font-size: 12px;
    color: #999;
  }

  .welcome-image {
    margin-left: 105px;
    width: 371px;
    height: 438px;
    background-image: url('../../assets/image/welcome.png');
  }
}
</style>
