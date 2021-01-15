<template>
  <div class="auth">
    <div class="auth-loading">
      <p class="auth-loading-item"></p>
      <p class="auth-loading-item"></p>
      <p class="auth-loading-item"></p>
      <p class="auth-loading-item"></p>
      <p class="auth-loading-item"></p>
    </div>
  </div>
</template>

<script>
import config from '@/config'
export default {
  name: 'Auth',
  created () {
    const query = this.$route.query || {}
    // TODO 这里是演示代码，下面两种模式根据项目任取其一
    if (query.mk) { // 直接从OA跳转而来，通常对应项目自有鉴权
      // TODO 下面的代码是模拟通过OA授权获取鉴权的逻辑,需要在初始化完成后调整
      this.$api.getAuthToken && this.$api.getAuthToken(query).then(res => {
        if (res.token) {
          this.afterAuthSuccess()
        } else {
          this.linkToOa()
        }
      })
    }
    if (query.token) { // TODO 直接携带token的，通常对应中台权限中心子系统的授权模式
      // 这里通常包含userId systemId
      this.$store.commit('token', query.token)
      this.$store.commit('userInfo', { userId: query.userId, userName: query.userName })
      this.$store.commit('systemId', query.systemId)
      this.afterAuthSuccess()
    } else { // 不符合OA或中台权限中心的情况，会跳转到OA首页
      if (config.env === 'dev') {
        this.$alert('未发现相关授权参数，请添加模拟授权参数,点击确定将跳转至/welcome', '这是一段开发提示', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              this.$router.replace('/welcome')
            }
          }
        })
      } else {
        this.linkToOa()
      }
    }
  },
  methods: {
    afterAuthSuccess () {
      setTimeout(() => {
        this.$notify({
          title: '成功',
          message: '自动授权登录成功！',
          duration: 2000,
          type: 'success'
        })
        this.$router.replace('/welcome')
      }, 500)
    },
    linkToOa () {
      location.replace('http://oa.2345.cn')
    }
  }
}
</script>

<style scoped lang="scss">
  .auth {
    width: 100%;
    height: 100%;
    background-color: #f0f3f7;
    display: flex;
    justify-content: center;
    align-items: center;

    .auth-loading {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .auth-loading-item {
        width: 4px;
        height: 36px;
        border-radius: 2px;
        background: #409eff;

        &:nth-child(1), &:nth-child(5) {
          animation: trans15 1.4s linear infinite;
        }

        &:nth-child(2), &:nth-child(4) {
          animation: trans24 1.4s linear infinite;
        }

        &:nth-child(3) {
          animation: trans3 1.4s linear infinite;
        }
      }
    }
  }

  @keyframes trans3 {
    0% {
      height: 34px;
    }
    25% {
      height: 12px;
    }
    50% {
      height: 12px;
    }
    75% {
      height: 34px;
    }
    100% {
      height: 34px;
    }
  }

  @keyframes trans24 {
    0% {
      height: 34px;
    }
    12.5% {
      height: 34px;
    }
    37.5% {
      height: 16px;
    }
    62.5% {
      height: 16px;
    }
    87.5% {
      height: 34px;
    }
    100% {
      height: 34px;
    }
  }

  @keyframes trans15 {
    0% {
      height: 34px;
    }
    25% {
      height: 34px;
    }
    50% {
      height: 20px;
    }
    75% {
      height: 20px;
    }
    100% {
      height: 34px;
    }
  }
</style>
