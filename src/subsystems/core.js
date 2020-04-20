const Decimal = require('break_infinity.js/dist/break_infinity')

import { computeNumberPerSecond } from '../lib/numberMath'
import createDefaultState from '../createDefaultState'

const reducerMap = {
    'core/majorTick': (state, payload) => {
        const nextState = R.clone(state)
        const deltaSeconds = new Decimal(payload.deltaSeconds)

        // Update the game tick counter
        const currentMajorTick = R.pathOr(0, ['game', 'tick', 'major'], nextState)
        _.set(nextState, ['game', 'tick', 'major'], currentMajorTick + 1)

        // Make the number go up
        const currentNumber = R.pathOr(0, ['game', 'resources', 'number', 'current'], nextState)
        const numberPerSecond = computeNumberPerSecond(state)

        _.set(
            nextState,
            ['game', 'resources', 'number', 'current'],
            currentNumber.add(numberPerSecond.mul(deltaSeconds))
        )

        // Return the updated state
        return nextState
    },
    'core/restartGame': () => {
        return createDefaultState()
    }
}

const core = { reducerMap }

export default core