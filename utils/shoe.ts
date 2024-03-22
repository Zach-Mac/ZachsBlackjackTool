export function knuthShuffle(array: any[]) {
	let currentIndex = array.length,
		randomIndex

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
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
export const coverCard: Card = {
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
