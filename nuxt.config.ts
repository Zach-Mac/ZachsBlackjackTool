// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@invictus.codes/nuxt-vuetify'],
	vuetify: {
		vuetifyOptions: {
			display: {
				mobileBreakpoint: 'sm'
			}
		},
		moduleOptions: {
			treeshaking: true
		}
	}
})
