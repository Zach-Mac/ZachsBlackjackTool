<script setup lang="ts">
const cardSize = ref(300)
const historyCardSize = ref(75)

const showHistory = ref(true)
const showCount = ref(true)
</script>

<template>
	<v-row>
		<v-col>
			{{ shoeStore.deck.numCardsRemaining }} / {{ shoeStore.deck.numCardsTotal }}

			<v-row class="my-0">
				<div v-for="card in shoeStore.cards">
					<PlayingCard
						@click="shoeStore.deck.draw"
						:cover="!card"
						:signature="card?.sig"
						:height="cardSize"
					></PlayingCard>
				</div>
			</v-row>

			<v-btn
				align-center
				color="success"
				@click="shoeStore.deck.draw"
				:disabled="shoeStore.deck.isEmpty"
			>
				Draw
			</v-btn>
			<v-btn align-center color="success" @click="shoeStore.deck.reshuffle">
				Reshuffle
			</v-btn>

			<v-divider></v-divider>
			<v-switch color="warning" v-model="showCount" label="Show Count" inset />
			<h2 v-if="showCount">REKO Count: {{ shoeStore.reko.count }}</h2>

			<v-divider></v-divider>
			<v-switch color="warning" v-model="showHistory" label="Show History" inset />
			<div class="d-flex flex-wrap">
				<template v-if="showHistory" v-for="(cardSig, index) in shoeStore.deck.cardHistory">
					<!-- <v-flex flex-column> -->
					{{ shoeStore.reko.countHistory[index] }}
					<PlayingCard :signature="cardSig" :height="historyCardSize" />
					<!-- </v-flex> -->
				</template>
			</div>
		</v-col>
	</v-row>
</template>
