import { API, graphqlOperation } from 'aws-amplify'

export const config = {
	aws_appsync_graphqlEndpoint:
		'https://6anfwmdqt5adtnnsbr2at7tpoa.appsync-api.us-east-1.amazonaws.com/graphql',
	aws_appsync_region: 'us-east-1',
	aws_appsync_authenticationType: 'API_KEY',
	aws_appsync_apiKey: 'da2-2ct5g2qmqzeh3czfo2ltiieaxi',
}

export const subscribeDoc = /* GraphQL */ `
	subscription Subscribe($name: String!) {
		subscribe(name: $name) {
			data
			name
		}
	}
`

export const publishDoc = /* GraphQL */ `
	mutation Publish($data: AWSJSON!, $name: String!) {
		publish(data: $data, name: $name) {
			data
			name
		}
	}
`

/**
 * @param  {string} name the name of the channel
 * @param  {Object} data the data to publish to the channel
 */
export async function publish(name, data) {
	return await API.graphql(graphqlOperation(publishDoc, { name, data }))
}

/**
 * @param  {string} name the name of the channel
 * @param  {nextCallback} next callback function that will be called with subscription payload data
 * @param  {function} [error] optional function to handle errors
 * @returns {Observable} an observable subscription object
 */
export function subscribe(name, next, error) {
	return API.graphql(graphqlOperation(subscribeDoc, { name })).subscribe({
		next: ({ provider, value }) => {
			next(value.data.subscribe, provider, value)
		},
		error: error || console.log,
	})
}

/**
 * @callback nextCallback
 * @param {Object} data the subscription response including the `name`, and `data`.
 * @param {Object} [provider] the provider object
 * @param {Object} [payload] the entire payload
 */
