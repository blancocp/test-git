<template>
    <plantilla>

        <div style="width:60%; margin: 0 auto;  height:100%">

            <el-row :gutter="12">
                <el-col :span="8">
                    <el-card shadow="hover">
                        <el-button plain @click="ir('familias')"><img src="/static/img/sol.png" style="width:140px; height:100px;"></el-button>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <el-button plain @click="ir('valuaciones')"><img src="/static/img/val.png" style="width:140px; height:100px;"></el-button>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <el-button plain @click="ir('facturacion')"><img src="/static/img/fac.png" style="width:140px; height:100px;"></el-button>
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter="12">
                <el-col :span="8" style="text-align:center">
                    <el-card shadow="hover">
                        <el-button plain @click="ir('consolidados')"><i class='el-icon-document'></i> Servicios</el-button>
                    </el-card>
                </el-col>
                <el-col :span="8" style="text-align:center">
                    <el-card shadow="hover">
                        <el-button plain @click="ir('valuacion')"><i class='el-icon-document'></i> Valuación</el-button>
                    </el-card>
                </el-col>
                <el-col :span="8" style="text-align:center">
                    <el-card shadow="hover">
                        <el-button plain @click="ir('relacion')"><i class='el-icon-document'></i> Facturación</el-button>
                    </el-card>
                </el-col>
            </el-row>
        </div>

    </plantilla>
</template>
<script>
import Plantilla from './plantilla.vue'
export default {
    components: {
        'plantilla': Plantilla
    },
    data() {
        return {
            debug: ''
        }
    },
    beforeCreate () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    methods: {
        ir(pagina) {
            this.$router.push('/' + pagina);
        }
    }
}
</script>