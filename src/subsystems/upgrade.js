import { computeCanAffordUpgrade, computeUpgradeCost } from '../lib/numberMath'

const reducerMap = {
    'upgrade/number': (state) => {
        // Make sure we have enough number to upgrade
        const numberGeneratorLevel = R.pathOr(0, ['game', 'generators', 'number', 'level'], state)
        const currentNumber = R.pathOr(0, ['game', 'resources', 'number', 'current'], state)
        const upgradeCost = computeUpgradeCost(state)
        const canAffordUpgrade = computeCanAffordUpgrade(state)

        // If not, do nothing
        if (!canAffordUpgrade) return state

        // Update the number generator level
        const nextState = R.clone(state)

        _.set(nextState, ['game', 'generators', 'number', 'level'], numberGeneratorLevel.add(1))
        _.set(nextState, ['game', 'resources', 'number', 'current'], currentNumber.sub(upgradeCost))

        return nextState
    },
}

const upgrade = { reducerMap }

export default upgrade