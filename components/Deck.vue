<script setup lang="ts">
const props = defineProps({
	numDecks: {
		type: Number,
		default: 1
	}
})

const { deck, card } = useDeck({ numDecks: props.numDecks })

const cardSize = ref(400)
const historyCardSize = ref(75)

const reko = useReko()
reko.watchCard(card)

const showHistory = ref(true)
const showCount = ref(true)
</script>

<template>
	<v-row>
		<v-col>
			{{ deck.remaining }} / {{ deck.total }}

			<PlayingCard
				@click="deck.draw"
				:cover="!card"
				:signature="card?.sig"
				:height="cardSize"
			></PlayingCard>

			<v-btn
				align-center
				color="success"
				@click="deck.draw"
				:disabled="deck.isEmpty"
			>
				Draw
			</v-btn>
			<v-btn align-center color="success" @click="deck.reshuffle">
				Reshuffle
			</v-btn>

			<v-divider></v-divider>
			<v-switch
				color="warning"
				v-model="showCount"
				label="Show Count"
				inset
			/>
			<h2 v-if="showCount">REKO Count: {{ reko.count }}</h2>

			<v-divider></v-divider>
			<v-switch
				color="warning"
				v-model="showHistory"
				label="Show History"
				inset
			/>
			<div class="d-flex flex-wrap">
				<template
					v-if="showHistory"
					v-for="(cardSig, index) in deck.cardHistory"
				>
					<v-flex flex-column>
						<PlayingCard
							:signature="cardSig"
							:height="historyCardSize"
						/>
						{{ reko.countHistory.value[index] }}
					</v-flex>
				</template>
			</div>
		</v-col>
	</v-row>
</template>
