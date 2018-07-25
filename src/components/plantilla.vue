<template>
    <div>
        <el-container>
            <el-header height="100px">
                <el-row :gutter="0">
                    <!--  :gutter="20" -->
                    <el-col :span="12" class="cabecera">
                        <img src="/static/img/logo.png" style="width:200px;">
                    </el-col>
                    <el-col :span="12" class="cabecera" style="text-align: right; font-size: 12px;">
                        <div  style="margin-right: 45px">
                          <span>{{ debug }}</span>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="201px" class="mMenu" style="margin-top:18px">
                    <encabezado></encabezado>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                    <!--<div>
            <el-button @click="startHacking">Start</el-button>
          </div>-->
                    <slot></slot>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import Inicio from './inicio.vue'
import Encabezado from './encabezado.vue'

export default {
    components: {
        inicio: Inicio,
        encabezado: Encabezado
    },
    data() {
        return {
            debug: ''
        }
    },
    created() {
      this.debug = this.$session.get('user');
    },
    methods: {
        startHacking() {
            this.$notify({
                title: 'It works!',
                type: 'success',
                message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
                duration: 5000
            })
        }
    }
}
</script>
<style>
* {
    font-family: Helvetica, sans-serif;
    margin: 0px;
    padding: 0px;
}

body {
    background-color: #2E2E2E;
}

h3 {
    padding-bottom: 20px;
}

#app {
    font-family: Helvetica, sans-serif;
}

.el-header,
.el-footer {
    font-family: Helvetica, sans-serif;
    /*background-color: #B3C0D1;*/
    color: #333;
    /*text-align: center;*/
    line-height: 60px;
    height: 200px;
    margin: 0px;
    padding: 0px;
}


.el-main {
    font-family: Helvetica, sans-serif;
    background-color: #2E2E2E;
    /*background-color: #5e0303;*/
    color: #333;
    text-align: left;
    /*line-height: 160px;*/
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.el-row {
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    /*border-radius: 4px;*/
}

.bg-purple {
    /* background: #d3dce6;*/
    text-align: left
}

.cabecera {
    background-color: #fceaea;
    /*background-image: url('/static/img/fondo.png');    433836  fff7f7        */
    height: 100px;
}

<style>.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}


.el-alert {
    background-color: #F2F2F2;

}



</style>