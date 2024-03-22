// options: { numDecks?: number; numCardsToDraw?: number; preShuffled?: boolean } = {}
// const { numDecks = 1, numCardsToDraw = 1, preShuffled = true } = options
const numDecks = ref(1)
const numCardsToDraw = ref(1)
const preShuffled = ref(true)

const cardSigs = ref([] as string[])
const cardHistory = ref([] as string[])
const cards = ref([] as Card[])

const numCardsTotal = computed(() => numDecks.value * 52)
const numCardsRemaining = computed(() => cardSigs.value.length)

const rekoCount = ref()
const rekoCountHistory = ref([] as number[])

function constructor() {
	cardSigs.value = []
	cardHistory.value = []
	for (let i = 0; i < numDecks.value; i++) {
		cardSigs.value = cardSigs.value.concat(CARD_SIGS_52)
	}
	cards.value = Array(numCardsToDraw.value).fill(coverCard)

	rekoCount.value = 0
	rekoCountHistory.value = [0]

	if (preShuffled.value) shuffle()
}
constructor()

function shuffle() {
	cardSigs.value = knuthShuffle(cardSigs.value)
}
function reset() {
	constructor()
}
function reshuffle() {
	reset()
	shuffle()
}

function updateRekoCount(cards: Card[]) {
	for (const card of cards) {
		if (card.isCover) rekoCount.value = 0
		else if (card.bjValue == 10 || card.bjValue == 11) rekoCount.value--
		else if (card.bjValue >= 2 && card.bjValue <= 7) rekoCount.value++

		rekoCountHistory.value.push(rekoCount.value)
	}
}

function draw() {
	const realNumCardsToDraw = Math.min(numCardsToDraw.value, cardSigs.value.length)

	if (realNumCardsToDraw === 0) return []

	const drawnCards = cardSigs.value.splice(0, realNumCardsToDraw)
	cards.value = drawnCards.map(parseSig)
	cardHistory.value = cardHistory.value.concat(drawnCards)

	updateRekoCount(cards.value)

	return cards.value
}

const isEmpty = computed(() => cardSigs.value.length === 0)

watch([numDecks, numCardsToDraw], reset)

export default reactive({
	deck: reactive({
		cardSigs,
		cardHistory,
		numCardsTotal,
		numCardsRemaining,
		shuffle,
		reshuffle,
		draw,
		reset,
		isEmpty
	}),
	cards: readonly(cards),
	reko: reactive({
		count: rekoCount,
		countHistory: rekoCountHistory
	}),
	numDecks,
	numCardsToDraw,
	preShuffled
})
