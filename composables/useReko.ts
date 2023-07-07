import { Card } from './useDeck'

export default function () {
	const count = ref(0)
	const countHistory = ref([0])

	const increment = () => {
		count.value++
		countHistory.value.push(count.value)
	}
	const decrement = () => {
		count.value--
		countHistory.value.push(count.value)
	}
	const reset = () => {
		count.value = 0
		countHistory.value = [0]
	}

	function watchCard(card: Ref<Card>) {
		watch(card, update)
	}

	function update(card: Card) {
		if (card.isCover) count.value = 0
		else if (card.bjValue == 10 || card.bjValue == 11) decrement()
		else if (card.bjValue >= 2 && card.bjValue <= 7) increment()
	}

	return {
		count,
		countHistory,
		increment,
		decrement,
		reset,
		update,
		watchCard
	}
}
