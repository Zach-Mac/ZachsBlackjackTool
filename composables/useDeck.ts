function knuthShuffle(array: any[]) {
	let currentIndex = array.length,
		randomIndex

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex]
		]
	}

	return array
}

export interface Card {
	suit: string
	rank: string
	sig: string
	bjValue: number
	color: string
	isFace: boolean
	isAce: boolean
	isCover: boolean
}

const coverCard: Card = {
	suit: '',
	rank: '',
	sig: '',
	bjValue: 0,
	color: '',
	isFace: false,
	isAce: false,
	isCover: true
}

export function parseSig(sig: string): Card {
	if (sig == 'cover') return coverCard

	const suit = sig.slice(-1)
	const rank = sig.slice(0, -1)
	const bjValue = parseInt(rank, 10) || (rank === 'a' ? 11 : 10)
	const color = suit === 's' || suit === 'c' ? 'black' : 'red'
	const isFace = !bjValue
	const isAce = rank === 'a'
	const isCover = false

	return { suit, rank, sig, bjValue, color, isFace, isAce, isCover }
}

export default function (
	options: { numDecks?: number; preShuffled?: boolean } = {}
) {
	const { numDecks = 1, preShuffled = true } = options

	const cardSigs = ref([] as string[])
	const cardHistory = ref([] as string[])
	const card = ref({} as Card)

	const total = computed(() => numDecks * 52)
	const remaining = computed(() => cardSigs.value.length)

	function constructor() {
		cardSigs.value = []
		cardHistory.value = []
		for (let i = 0; i < numDecks; i++) {
			cardSigs.value = cardSigs.value.concat(CARD_SIGS_52)
		}
		card.value = coverCard
		if (preShuffled) shuffle()
	}
	constructor()

	function shuffle() {
		cardSigs.value = knuthShuffle(cardSigs.value)
	}
	function renew() {
		constructor()
	}
	function reshuffle() {
		renew()
		shuffle()
	}

	function draw() {
		const cardSig = cardSigs.value.pop()
		if (cardSig) {
			card.value = parseSig(cardSig)
			cardHistory.value.push(cardSig)
		}

		return card.value
	}

	const isEmpty = computed(() => cardSigs.value.length === 0)

	return {
		deck: reactive({
			cardSigs,
			cardHistory,
			total,
			remaining,
			shuffle,
			reshuffle,
			draw,
			renew,
			isEmpty
		}),
		card
	}
}
