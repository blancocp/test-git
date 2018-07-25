<template>
    <plantilla>
        <div style="margin-top:110px;width:100%; margin: 0 auto">
            <pre>
              {{ debug }}
            </pre>
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
    beforeCreate() {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    created() {        
        this.debug = " VISTA UNIDADES ";
    },
    methods: {        
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>