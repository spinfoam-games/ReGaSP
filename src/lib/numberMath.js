const Decimal = require('break_infinity.js/dist/break_infinity')

const computeCanAffordUpgrade = (state) => {
    const upgradeCost = computeUpgradeCost(state)
    const currentNumber = R.pathOr(0, ['game', 'resources', 'number', 'current'], state)

    return currentNumber.gte(upgradeCost)
}

const computeNumberPerSecond = (state) => {
    const numberGeneratorLevel = R.pathOr(1, ['game', 'generators', 'number', 'level'], state)
    return Decimal.max(new Decimal(1), numberGeneratorLevel.mul(2))
}

const computeUpgradeCost = (state) => {
    const numberGeneratorLevel = R.pathOr(0, ['game', 'generators', 'number', 'level'], state)
    const baseCost = new Decimal(10)
    return baseCost.mul(Decimal.pow(1.1, numberGeneratorLevel))
}

export { computeCanAffordUpgrade, computeNumberPerSecond, computeUpgradeCost }