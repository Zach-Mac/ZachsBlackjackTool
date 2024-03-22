<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { mobile } = useDisplay()

const items = [
	{ icon: 'mdi-folder', text: 'Reko', value: '/reko' }
	// { icon: 'mdi-account-multiple', text: 'Shared with me', value: '/reko' },
	// { icon: 'mdi-star', text: 'Starred', value: '/reko' }
]
</script>

<template>
	<v-app>
		<v-layout>
			<v-app-bar>
				<template #prepend>
					<v-btn variant="flat" to="/">Zach's Blackjack</v-btn>
				</template>
			</v-app-bar>

			<v-navigation-drawer expand-on-hover rail>
				<v-list>
					<v-list-item prepend-icon="mdi-home" title="Home" to="/"></v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-list density="compact" nav>
					<v-list-item
						v-for="item in items"
						:prepend-icon="item.icon"
						:key="item.text"
						:title="item.text"
						:to="item.value"
					/>
				</v-list>
			</v-navigation-drawer>

			<v-main>
				<v-container fluid>
					<slot />
				</v-container>
			</v-main>

			<v-bottom-navigation :active="mobile" grow>
				<v-btn v-for="item in items">
					<v-icon>{{ item.icon }}</v-icon>
					<span>{{ item.text }}</span>
				</v-btn>
			</v-bottom-navigation>
		</v-layout>
	</v-app>
</template>
