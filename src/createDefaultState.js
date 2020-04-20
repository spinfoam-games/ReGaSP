const Decimal = require('break_infinity.js/dist/break_infinity')

const createDefaultState = () => {
    return {
        game: {
            tick: {
                major: 0
            },
            resources: {
                number: {
                    current: new Decimal(0)
                }
            },
            generators: {
                number: {
                    level: new Decimal(0)
                }
            }
        }
    }
}

export default createDefaultState