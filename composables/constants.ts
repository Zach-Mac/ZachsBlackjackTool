const SUITS = ['s', 'h', 'c', 'd']
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a']

export const CARD_SIGS_52 = RANKS.flatMap(rank =>
	SUITS.map(suit => rank + suit)
)
