import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import '../semantic/dist/semantic.min.css'
import './css/layout.css'

import createDefaultState from './createDefaultState'

import Game from './components/Game'

import core from './subsystems/core'
import upgrade from './subsystems/upgrade'

const reducerMap = { ...core.reducerMap, ...upgrade.reducerMap }

const reducer = (state, action) => {
    if (!state) return createDefaultState()

    const { type, payload } = action

    if (typeof reducerMap[type] === 'function') {
        const nextState = reducerMap[type](state, payload)

        if (!nextState) console.error(`ACTION (${type}) DID NOT RETURN A PROPER STATE OBJECT!`)
        return nextState || state
    }

    return state
}

const store = createStore(
    reducer,
    null,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Trigger the tick action every 1000ms
const tickInterval = 250
setInterval(() => store.dispatch({ type: 'core/majorTick', payload: { deltaSeconds: tickInterval / 1000.0 } }), tickInterval)

const applicationElement = document.getElementById('application')

applicationElement
    ? ReactDOM.render(<Provider store={store}><Game /></Provider>, applicationElement)
    : false