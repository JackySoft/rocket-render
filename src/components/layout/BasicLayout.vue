<template>
  <div class="basic-layout">
    <!--  左侧菜单  -->
    <el-menu
      class="basic-layout-left"
      background-color="#001529"
      text-color="#eee"
      :router="true"
      unique-opened
      :collapse="isCollapse">
      <!--  logo与名称  -->
      <div class="logo" @click="redirectToIndex">
        <img src="../../assets/logo/logo.png"/>
        <p v-if="!isCollapse">Rocket</p>
      </div>
      <!--  展开收缩按钮  -->
      <div class="basic-layout-menu">
        <el-submenu index="1">
          <template slot="title">
            <span>表单</span>
          </template>
          <el-menu-item v-for="menu in menuList.form" :index="menu.path" :key="menu.path">{{menu.name}}</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>表格</span>
          </template>
          <el-menu-item v-for="menu in menuList.table" :index="menu.path" :key="menu.path">{{menu.name}}</el-menu-item>
        </el-submenu>
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
          <el-dropdown>
            <span class="el-dropdown-link">
              Jack
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exit">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
      <!-- <BreadCrumb/> -->
      <router-view class="basic-layout-right-main"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BasicLayout',
  data () {
    return {
      isCollapse: false, // 是否展示或隐藏
      menuList: {
        form: [
          {
            path: '/form/grid',
            name: '栅格表单',
          },
          {
            path: '/form/inline',
            name: '行内表单',
          },
          {
            path: '/form/dialog',
            name: '弹框基础表单',
          },
          {
            path: '/form/power',
            name: '弹框动态表单',
          }, {
            path: '/form/drawer',
            name: '抽屉表单',
          }, {
            path: '/form/nested',
            name: '嵌套表单',
          }
        ],
        table: [
          {
            path: '/table/basic',
            name: '基础表格',
          },
          {
            path: '/table/high',
            name: '高级表格',
          },
        ]
      }
    }
  },
  methods: {
    redirectToIndex () {
      this.$router.replace('/')
    },
    toggle () {
      this.isCollapse = !this.isCollapse
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
    height: 54px;
    overflow: hidden;

    img {
      margin: 0 16px;
      width: 28px;
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
