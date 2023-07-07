import { svgSpritePlugin } from 'vue-svg-sprite'

export default defineNuxtPlugin({
	name: 'vue-sprites',
	enforce: 'pre', // or 'post'
	async setup(nuxtApp) {
		nuxtApp.vueApp.use(svgSpritePlugin, { url: '../assets/sprite.svg' })
	}
})
