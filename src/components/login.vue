<template>
        <el-container  >
            <el-row class="login">
                <el-card class="box-card-login" shadow="always" style="margin-top:100px; text-align: center">
                        <img src="/static/img/logo.png" style="width:180px; height:100px;">
                        <h3>Autenticación</h3>
                        <p class="errorMsg" v-if="errorMsg" style="font-size: .8em; color:red; padding-bottom: 10px;">
                            {{errorMsg}}
                        </p>
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-2 control-label">Usuario</label>
                                <div class="col-sm-6">
                                    <input type="text" class="form-control" id='user' v-model='user'>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                                <div class="col-sm-6">
                                    <input type="password" class="form-control" id='pass' v-model='pass'>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button type="button" id="Iniciar" @click="autenticar" class="btn btn-default">Entrar</button>
                                </div>
                            </div>
                        </form>
                </el-card>
            </el-row>    
    </el-container> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: '',
            pass: '',
            errorMsg: ''
        }
    },

    beforeCreate () {
        if (this.$session.exists()) {
            this.$router.push('/principal')
        }
    },
    created () {

    },
    methods: {

        autenticar() {

            this.errorMsg = '';

            if (this.user.length == 0 || this.pass.length == 0) {
                //this.errorMsg = 'Datos requeridos';
                this.$message.error('Oops, Usuario y password requeridos.');
                document.getElementById("user").focus();
                return false;
            }

            var user = this.user;
            var pass = this.pass;

            this.axios.post('http://localhost/api_inventory/autentica.php', {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    params: {
                        u: user,
                        p: pass
                    }
                })
                .then(response => {
                    var respuesta = JSON.parse(JSON.stringify(response))
                    if (respuesta.status === 200 && 'token' in respuesta.data) {
                        this.$session.start()
                        this.$session.set('jwt', respuesta.data.token)
                        this.$session.set('user', respuesta.data.usr)
                        // Vue.http.headers.common['Authorization'] = 'Bearer ' + response.data.token
                        this.$router.push('/principal')
                    } else {
                        if (response.data.error) {
                            this.user = '';
                            this.pass = '';
                            document.getElementById("user").focus();
                            this.$message.error('Error, '+response.data.msg);
                        }
                    }

                }, response => {
                            this.user = '';
                            this.pass = '';
                            document.getElementById("user").focus();
                    this.$message.error('Oops, Error de conexión de base de datos.');
                    // error callback
                });
        }

    }
}
</script>
<style>
    body {
        background-color: #E9EEF3;
    }
    div{
        margin: 0 auto;
    }
    input {
        text-align: center
    }
</style>