<template>
<div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Configuración</span>
        </template>
          <el-menu-item index="1-1" @click="ir('familias')">Familias</el-menu-item>
          <el-menu-item index="1-2" @click="ir('unidades')">Unidades</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-plus"></i>
          <span>Inventario</span>
        </template>
          <el-menu-item index="2-1" @click="ir('pagina')">Entrada</el-menu-item>          
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>Reportes</span>
        </template>      
        <el-menu-item index="3-1" @click="ir('pagina')">Prueba</el-menu-item>
          <!--<el-menu-item index="3-1" @click='informe'>Informe</el-menu-item>-->
      </el-submenu>
      <el-menu-item index="3" @click='logout'>
        <i class="el-icon-circle-close-outline"></i>
        <span>Cerrar Sesión</span>
      </el-menu-item>
    </el-menu>
</div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: true
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      ir(pagina){
        this.$router.push('/'+pagina);
      },
      logout: function () {
        this.$session.destroy()
        this.$router.push('/')
      }
    }
  }
</script>