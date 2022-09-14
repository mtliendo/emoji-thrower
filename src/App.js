import './App.css'
import { Flex, View, Button } from '@aws-amplify/ui-react'
import random from 'lodash.random'
import { v4 } from 'uuid'
import { Amplify } from '@aws-amplify/core'
import * as gen from './generated'
Amplify.configure(gen.config)
const channel = 'reactions'
function App() {
	const emojis = {
		0: '🔥',
		1: '👍🏽',
		2: '👩🏽‍🔬',
		3: '🦸🏽‍♂️',
	}
	const handleClick = async (emote) => {
		const reaction = {
			id: v4(),
			icon: emote,
		}
		await gen.publish(channel, JSON.stringify(reaction))
		// setReactionCount([...reactionCount, reaction])
	}
	return (
		<Flex wrap={'wrap'} justifyContent="center">
			<Button
				width={'100%'}
				variation="primary"
				onClick={() => handleClick('🔥')}
			>
				🔥 Fiya
			</Button>

			<Button
				width={'100%'}
				variation="primary"
				onClick={() => handleClick('👍🏽')}
			>
				👍🏽 I'm messing with it
			</Button>
			<Button
				width={'100%'}
				variation="primary"
				onClick={() => handleClick('🦦')}
			>
				🦦 The Michael
			</Button>
			<Button
				width={'100%'}
				variation="primary"
				onClick={() => handleClick('👨🏻‍🔬')}
			>
				👨🏻‍🔬 The Gant
			</Button>
			<Button
				width={'100%'}
				variation="primary"
				onClick={() => handleClick('👴🏽')}
			>
				👴🏽 The Ken
			</Button>
		</Flex>
	)
}

export default App
