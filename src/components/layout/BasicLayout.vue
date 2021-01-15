<template>
  <div class="basic-layout" v-if="userMenu && userMenu.length">
    <!--  左侧菜单  -->
    <el-menu :default-active="activeMenu"
             class="basic-layout-left"
             background-color="#001529"
             text-color="#eee"
             :router="true"
             unique-opened
             :collapse="isCollapse">
      <!--  logo与名称  -->
      <div class="logo" @click="redirectToIndex">
        <img src="../../assets/logo/logo.png"/>
        <p v-if="!isCollapse">Octopus Pro</p>
      </div>
      <!--  展开收缩按钮  -->
      <div class="basic-layout-menu">
        <sidebar-item v-for="(route, index) in userMenu" :key="route.path + index" :item="route"
                      :base-path="route.path"/>
      </div>
      <div class="basic-layout-menu-fold" @click="toggle">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
    </el-menu>
    <!--  右侧区域  -->
    <div class="basic-layout-right">
      <!--  topbar  -->
      <div class="basic-layout-right-top">
        <el-col :span="4" :offset="20" class="name-wrapper">
          <el-dropdown @command="handleDropdownCommand">
              <span class="el-dropdown-link">
                {{ userInfo.name || userInfo.userRealName || userInfo.userName }}<i
                class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
      <BreadCrumb/>
      <router-view class="basic-layout-right-main"/>
    </div>
    <FloatDrawer/>
  </div>
</template>

<script>
import FloatDrawer from '@ued2345/pro-plus/vueComponents/buildIn/FloatDrawer'
import { mapState } from 'vuex'

export default {
  name: 'BasicLayout',
  components: {
    FloatDrawer
  },
  data () {
    return {
      isCollapse: false, // 是否展示或隐藏
    }
  },
  computed: {
    ...mapState(['userMenu', 'userInfo', 'systemId']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // 如果路由中设置了高亮，则取对应设置的值
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created () {
    this.getUserMenu()
  },
  methods: {
    getUserMenu () {
      // TODO 这里是模拟获取菜单的逻辑，以接入【中台权限中心】为例，如果你的项目不接入中台权限中心，你可能需要调整
      this.$api.getUserInfo({
        reqTypeEnumValue: 'ALL', // 获取所有信息
        userId: this.userInfo.userId, // 当前用户ID
        systemId: this.systemId // 当前子系统ID，大中台平台跳转时会携带，其他项目需要自行根据环境写入
      }).then(res => {
        // 存储菜单信息
        this.$store.commit('userMenu', res.authTree || [])
        // 更新用户信息
        this.$store.commit('userInfo', res.userInfo || {})
        // 操作权限数据结构处理
        if (res.accessPointList) {
          const accessPointList = res.accessPointList || []
          const permissionMap = {}
          accessPointList.forEach(item => {
            if (item.resourceKey) {
              permissionMap[item.resourceKey] = item.allow
            }
          })
          this.$store.commit('permissionMap', permissionMap)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    redirectToIndex () {
      this.$router.replace('/')
    },
    toggle () {
      this.isCollapse = !this.isCollapse
    },
    handleDropdownCommand (command) {
      if (command === 'exit') {
        location.replace('http://oa.2345.cn')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .logo {
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    overflow: hidden;

    img {
      margin: 0 16px;
      width: 32px;
      height: 32px;
    }

    p {
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      white-space: nowrap;
    }
  }

  .basic-layout {
    width: 100%;
    height: 100%;
    display: flex;
    background: #eef0f3;
  }

  .basic-layout-left:not(.el-menu--collapse) {
    overflow-x: hidden;
    overflow-y: auto;
    width: 200px;
    flex-shrink: 0;
  }

  .basic-layout-left {
    position: relative;
    box-shadow: 4px 0 6px 0 rgba(204, 204, 204, 0.1);
    z-index: 100;
    height: 100%;
    /*min-height: 100%;*/
    display: flex;
    flex-direction: column;
  }

  .basic-layout-right {
    flex: 1;
    /* min-width: 1140px; */
    min-height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .basic-layout-right-top {
    border-bottom: 1px solid #ddd;
    height: 50px;
    flex-shrink: 0;
    background: #fff;
  }

  .name-wrapper {
    /* width: 200px; */
    padding-right: 20px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .basic-layout-right-main {
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  .basic-layout-menu {
    flex: 1;
    overflow-x: hidden;
    overflow-y: -moz-scrollbars-none; //Firefox
    overflow-y: auto;
  }

  .basic-layout-menu::-webkit-scrollbar {
    display: none;
  }

  /* Antd-pro风格滚动条
  .basic-layout-menu::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .basic-layout-menu::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 100%, .2);
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 5px hsla(0, 0%, 100%, .05)
  }

  .basic-layout-menu::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, .15);
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 5px rgba(37, 37, 37, .05)
  }
  */

  .basic-layout-menu-fold {
    padding: 0 16px;
    font-size: 20px;
    line-height: 40px;
    color: #a6a8ab;
  }

  .basic-layout-menu-fold:hover {
    color: #eef0f3;
  }

</style>
<style lang="scss" scoped>
  ::v-deep .el-menu--collapse {
    .el-submenu {
      .el-submenu__icon-arrow {
        display: none;
      }

      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
</style>
