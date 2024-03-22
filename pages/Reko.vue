<script setup lang="ts"></script>

<template>
	<v-row>
		<v-col>
			<v-row>
				<v-select
					label="Number of decks"
					v-model="shoeStore.numDecks"
					type="number"
					variant="solo"
					:items="[1, 2, 3, 4, 5, 6, 7, 8]"
				></v-select>
				<v-select
					label="Number of cards to draw"
					v-model="shoeStore.numCardsToDraw"
					type="number"
					variant="solo"
					:items="[1, 2, 3, 4, 5, 6]"
				></v-select>
			</v-row>
			<Shoe />
		</v-col>
	</v-row>
</template>
