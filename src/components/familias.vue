<template>
    <plantilla>

            <el-row>
                <el-alert type="error" :closable="false" style="text-align: left">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
                        <el-breadcrumb-item>Familias</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-alert>
            </el-row>
            
        <el-card class="box-card" shadow="always">
            <pre>
              {{ debug }}
            </pre>

<div class="line"></div>

            <el-row :gutter="10">
                <el-col :span="24">
                    <el-form status-icon :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm" id="formulario">
                        <el-row v-if="1==2">
                            <el-col :span="15">
                                <el-form-item label="Código" prop="codigo">
                                    <el-input v-model="codigo" maxlength="10" name="codigo">
                                        <el-button slot="append" type="primary" plain @click="agregarFamilia('ruleForm')">{{btnTitulo}}</el-button>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!--  -->
                        <el-form-item label="Familia" prop="descripcion">
                            <el-autocomplete size="200px" class="inline-input" placeholder="Ingresar Familia..." :trigger-on-focus="false" v-model="ruleForm.descripcion" name="descripcion" value-key="nombre" v-bind:value="ruleForm.descripcion | capitalize" @keyup.native.enter="agregarFamilia('ruleForm')" :fetch-suggestions="querySearch" @select="buscarSugerencia" @keyup.native="llamarTotalFamilias()">
                                <el-button slot="append" type="primary" plain @click="agregarFamilia('ruleForm')">{{btnTitulo}}</el-button>
                            </el-autocomplete>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span=24>
                    <el-table :data="familias" style="width: 100%" show-summary :summary-method="obtenerSuma" sum-text="Total Familias:">
                        <el-row>
                            <el-table-column label="Nombre" width="400">
                                <template slot-scope="scope">
                                    <!-- <i class="el-icon-time"></i> -->
                                    <span style="margin-left: 10px;">{{ scope.row.nombre }}</span>
                                </template>
                            </el-table-column>
                        </el-row>
                        <el-table-column label="Operaciones">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
                            </template>
                        </el-table-column>
                        <el-row>
                        </el-row>
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
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
            debug: '',
            btnTitulo: 'Agregar',
            apiUrl: 'http://localhost/api_inventory/',
            familias: [],
            familias_previo: [],
            codigo: '',
            titulo: 'Creación',
            links: [],
            state2: '',
            totalFamilias: 0,
            ruleForm: {
                id: '',
                descripcion: '',
            },
            rules: {
                descripcion: [
                    { required: true, message: 'Por favor indique la Familia !.', trigger: 'agregarFamilia' }
                ]
            }
        }
    },
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }





    },
    created() {
        this.traerFamilias();
    },
    filters: {
        capitalize(value) {
            return value.toUpperCase();
        }
    },
    methods: {
        llamarTotalFamilias() {
            if (this.ruleForm.descripcion == "") {
                this.familias = this.familias_previo
            }
        },
        buscarSugerencia(valor) {
            //DEBIDO A QUE FAMILIAS ESPERA UN ARREGLO, SE COLOCÓ VALOR DENTRO DE a
            var a = []
            a[0] = valor
            this.familias = a
            this.totalFamilias = 1;
        },
        querySearch(queryString, cb) {
            console.log(queryString);
            var links = this.familias_previo;
            queryString = queryString.toUpperCase();
            var results = queryString ? links.filter(this.createFilter(queryString)) : links;
            this.familias = results
            this.totalFamilias = results.length;
            cb(results);
        },
        createFilter(queryString) {
            return (link) => {
                return (link.nombre.indexOf(queryString) === 0);
            }
        },
        obtenerSuma() {
            var t = [];
            t[0] = "Total Familias: " + this.totalFamilias;
            return t;
        },
        traerFamilias() {

            this.axios.post(this.apiUrl + 'familias.php', {
                    'token': this.$session.get('jwt'),
                    'accion': 'getAll'
                })
                .then(response => {
                    var respuesta = JSON.parse(JSON.stringify(response))
                    if (respuesta.status === 200 && 'data' in respuesta) {
                        //this.debug = respuesta.data;
                        this.familias = respuesta.data;
                        this.familias_previo = respuesta.data;
                        this.totalFamilias = respuesta.data.length;
                    }

                }, response => {
                    // error callback
                });
        },
        traerFamiliaPorCodigo: function(id) {
            this.axios.get(this.apiUrl + 'Familias/getFamilias').then(response => {
                this.familias = response.data;
                this.familias_previo = response.data;
                this.totalFamilias = response.data.length;
            })
        },
        get_ultimo_codigo_familia() {
            this.axios.get(this.apiUrl + 'Familias/get_codigo_disponible_familia').then(response => {
                var numero = parseInt(response.data);
                if (response.data == "cero") {
                    this.codigo = "01";
                    return false;
                }
                if (numero == 9) {
                    this.$data.codigo = numero + 1;
                    return false;
                } else if (numero < 10) {
                    this.$data.codigo = "0" + (numero + 1);
                    return false;
                } else {
                    this.$data.codigo = numero + 1;
                    return false;
                }
            })
        },
        filtrarDescripcion(descripcion) {
            console.log(descripcion);
            return (link) => {
                descripcion = descripcion.toUpperCase();
                if (link.nombre === descripcion) {
                    return (link.nombre.indexOf(descripcion) === 0);
                } else {}
                return false;
            }
        },
        agregarFamilia(formName) {

            var descripcion = this.ruleForm.descripcion;
            descripcion = descripcion.trim();
            descripcion = descripcion.toUpperCase();
            this.$refs[formName].validate((valid) => {

                if (valid) {

                    var results = descripcion ? this.familias.filter(this.filtrarDescripcion(descripcion)) : arreglo;
                    if (results.length > 0) {
                        this.$notify({
                            title: 'Familia Existente!',
                            type: 'error',
                            //message: numero,
                            duration: 5000
                        })
                        return false;
                    }

                    var id = '';
                    var accion = 'agregar';
                    if (this.btnTitulo === 'Editar') {
                        var accion = 'editar';
                        id = this.ruleForm.id;
                        this.titulo = "Modificación";
                    }

                    this.axios.post(this.apiUrl + 'familias.php', {
                            'token': this.$session.get('jwt'),
                            'accion': accion,
                            'id': id,
                            'nombre': descripcion
                        })
                        .then(response => {
                            if (response.status === 200 && 'data' in response) {

                                var tipo = 'success';
                                if (response.data.err == true) {
                                    tipo = 'warning';
                                }
                                this.$notify({
                                    title: response.data.msg + '!',
                                    type: tipo,
                                    //message: numero,
                                    duration: 1500
                                })

                                this.traerFamilias();
                                this.resetForm('ruleForm');
                                this.btnTitulo = 'Agregar';
                            } else {
                                this.$notify({
                                    title: "Error" + '!',
                                    type: error,
                                    //message: numero,
                                    duration: 1500
                                })
                            }
                        });
                }
            });
        },
        handleDelete(index, row) {
            var data = { id: row.id }
            this.ruleForm.descripcion = "";
            this.axios.post(this.apiUrl + 'familias.php', {
                    'token': this.$session.get('jwt'),
                    'id': row.id,
                    'accion': 'eliminar'
                })
                .then(response => {
                    if (response.status === 200 && 'data' in response) {

                        var tipo = 'success';
                        if (response.data.err == true) {
                            tipo = 'warning';
                        }
                        this.$notify({
                            title: response.data.msg + '!',
                            type: tipo,
                            //message: numero,
                            duration: 1500
                        })

                        this.traerFamilias();
                    } else {
                        this.$notify({
                            title: "Error" + '!',
                            type: error,
                            //message: numero,
                            duration: 1500
                        })
                    }
                });
        },
        handleEdit(index, row) {
            this.axios.post(this.apiUrl + 'familias.php', {
                    'token': this.$session.get('jwt'),
                    'id': row.id,
                    'accion': 'buscar'
                })
                .then(response => {
                    this.ruleForm.descripcion = response.data[0].nombre;
                    this.ruleForm.id = response.data[0].id;
                    //this.codigo = response.data[0].co_familia;
                    this.btnTitulo = 'Editar'
                });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ir(pagina) {
            this.$router.push('/');
        }
    }
}
</script>