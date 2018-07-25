import LoginComponent from './components/login.vue'

const FamiliasComponent = resolve => {
	require.ensure(['./components/familias.vue'],() => {
		resolve(require('./components/familias.vue'));
	})
}

const UnidadesComponent = resolve => {
	require.ensure(['./components/unidades.vue'],() => {
		resolve(require('./components/unidades.vue'));
	})
}

const PrincipalComponent = resolve => {
	require.ensure(['./components/principal.vue'],() => {
		resolve(require('./components/principal.vue'));
	})
}

export const rutas = [
	{ path : '', component: LoginComponent},
	{ path : '/familias', component: FamiliasComponent, name : 'familias'},
	{ path : '/unidades', component: UnidadesComponent, name : 'unidades'},
	/*{ path : '/showcliente/:id', component: ShowclienteComponent, name : 'showcliente'},*/
	{ path : '/principal', component: PrincipalComponent, name : 'principal'},
	{ path : '*', redirect : ''}
]