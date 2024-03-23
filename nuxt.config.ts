// https://nuxt.com/docs/api/configuration/nuxt-config
// import { md3 } from 'vuetify/blueprints'
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@invictus.codes/nuxt-vuetify', '@vueuse/nuxt'],
	vuetify: {
		vuetifyOptions: {
			display: {
				mobileBreakpoint: 'sm'
			},
			// blueprint: md3,
			// theme: {
			// 	defaultTheme: 'dark'
			// },
			defaults: {
				VSelect: {
					variant: 'outlined'
				}
			}
		},
		moduleOptions: {
			treeshaking: true
			// autoImport: false
		}
	}
})
