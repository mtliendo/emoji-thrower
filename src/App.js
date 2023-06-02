import { Flex, Button } from '@aws-amplify/ui-react'
import { Amplify } from '@aws-amplify/core'
import { useRef } from 'react'
import * as gen from './generated'
Amplify.configure(gen.config)
function App() {
	const emojiRef = useRef([
		{ emoji: '🔥', displayText: '🔥 Fiya' },
		{ emoji: '🍑', displayText: 'Render ATL' },
		{ emoji: '🦦', displayText: '🦦 Focus Ottered in!' },
		{ emoji: '☁️', displayText: '☁️ Serverless Cloud' },
		{ emoji: '👀', displayText: '👀 I see you!' },
		{ emoji: '🌮', displayText: '🌮 Gimme moar!!' },
	])

	const handleClick = async (emote) => {
		const reaction = {
			icon: emote,
		}
		const channel = 'render'
		await gen.publish(channel, JSON.stringify(reaction))
	}
	return (
		<Flex justifyContent="center">
			<Flex wrap={'wrap'} justifyContent="center" maxWidth={'400px'}>
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
		</Flex>
	)
}

export default App
