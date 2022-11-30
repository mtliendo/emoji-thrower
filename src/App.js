import './App.css'
import { Flex, Button } from '@aws-amplify/ui-react'
import { v4 } from 'uuid'
import { Amplify } from '@aws-amplify/core'
import * as gen from './generated'
import { useRef } from 'react'
Amplify.configure(gen.config)
function App() {
	const emojiRef = useRef([
		{ emoji: '🔥', displayText: '🔥 Fiya' },
		{ emoji: '👍🏽', displayText: "👍🏽 This is great" },
		{ emoji: '🦦', displayText: '🦦 Focus Ottered in!' },
		{ emoji: '🏎', displayText: '🏎 Looks fast!' },
		{ emoji: '🌮', displayText: '🌮 Gimme moar!!' },
	])

	const handleClick = async (emote) => {
		const reaction = {
			id: v4(),
			icon: emote,
		}
		const channel = 'reactions'
		await gen.publish(channel, JSON.stringify(reaction))
	}
	return (
		<Flex wrap={'wrap'} justifyContent="center">
			{emojiRef.current.map((emojiItem) => (
				<Button
					width={'100%'}
					variation="primary"
					onClick={() => handleClick(emojiItem.emoji)}
				>
					{emojiItem.displayText}
				</Button>
			))}
		</Flex>
	)
}

export default App
