import React, { Component } from 'react'
import { connect } from 'react-redux'

import moment from 'moment'

import { Statistic, Card, Button, Menu } from 'semantic-ui-react'

const NumberFormat = require('swarm-numberformat')
const format = NumberFormat.format

import { computeCanAffordUpgrade, computeNumberPerSecond, computeUpgradeCost } from '../lib/numberMath'

class GameElement extends Component {
    render() {
        return (
            <div className='main-container'>
                <Menu fluid attached>
                    <Menu.Item>{moment().format('YYYY-MM-DD hh:mm:ss')}</Menu.Item>
                    <Menu.Item position="right">Tick: {this.props.currentTick}</Menu.Item>
                </Menu>

                <div className='scrolling-area'>
                    <div className='content-area'>
                        <Card fluid align="center">
                            <Card.Content>
                                <Statistic size="huge">
                                    <Statistic.Value>{format(this.props.number)}</Statistic.Value>
                                    <Statistic.Label>Number</Statistic.Label>
                                </Statistic>
                            </Card.Content>
                        </Card>
                        <Card fluid align="center">
                            <Card.Content>
                                <Statistic size="small">
                                    <Statistic.Value>{format(this.props.numberPerSecond)}</Statistic.Value>
                                    <Statistic.Label>Number Per Second</Statistic.Label>
                                </Statistic>
                            </Card.Content>
                        </Card>
                        <Card fluid align="center">
                            <Card.Content>
                                <Statistic size="mini">
                                    <Statistic.Value>{format(this.props.upgradeCost)}</Statistic.Value>
                                    <Statistic.Label>Upgrade Cost</Statistic.Label>
                                </Statistic>
                            </Card.Content>
                            <Card.Content>
                                <Button color='green' disabled={!this.props.canAffordUpgrade} onClick={this.props.upgradeNumberGenerator}>Get more upness</Button>
                            </Card.Content>
                        </Card>
                    </div>
                </div>

                <Menu fluid attached>
                    <Menu.Item><Button size="mini" color="red" onClick={this.props.restartGame}>Restart</Button></Menu.Item>
                        <Menu.Menu position="right">
                            <Menu.Item link={true} onClick={() => window.open('http://www.glaielgames.com/number/', '_blank')}>
                                This demo game is based on Number by Tyler Glaiel
                            </Menu.Item>
                            <Menu.Item link={true} onClick={() => window.open('https://www.spinfoamgames.com', '_blank')}>
                                Boilerplate code by Spinfoam Games
                            </Menu.Item>
                        </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

const Game = connect(
    state => {
        return {
            number: R.pathOr(0, ['game', 'resources', 'number', 'current'], state),
            numberPerSecond: computeNumberPerSecond(state),
            upgradeCost: computeUpgradeCost(state),
            canAffordUpgrade: computeCanAffordUpgrade(state),
            currentTick: R.pathOr(0, ['game', 'tick', 'major'], state)
        }
    },
    dispatch => {
        return {
            upgradeNumberGenerator: () => dispatch({ type: 'upgrade/number', payload: {} }),
            restartGame: () => dispatch({ type: 'core/restartGame', payload: {} })
        }
    }
)(GameElement)

export default Game