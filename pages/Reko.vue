<script setup lang="ts">
const numDecks = ref('1')

const numDecksComputed = computed(() => parseInt(numDecks.value))
</script>

<template>
	<v-row>
		<v-col>
			<v-row>
				<v-combobox
					label="Number of decks"
					v-model="numDecks"
					type="number"
					variant="solo"
					:items="[1, 2, 3, 4, 5, 6, 7, 8]"
				></v-combobox>
			</v-row>
			<Deck :numDecks="numDecksComputed" :key="numDecksComputed" />
		</v-col>
	</v-row>
</template>
