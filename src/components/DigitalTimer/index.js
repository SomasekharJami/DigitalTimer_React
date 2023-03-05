import {Component} from 'react'

import './index.css'

const initialState = {
  isRunning: false,
  timeInSec: 0,
  timeInMin: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.onClearingTimer()
  }

  onClearingTimer = () => {
    clearInterval(this.timerId)
  }

  onDecreasing = () => {
    const {timeInMin} = this.state

    if (timeInMin > 1) {
      this.setState(prevState => ({
        timeInMin: prevState.timeInMin - 1,
      }))
    }
  }

  onIncreasing = () => {
    this.setState(prevState => ({
      timeInMin: prevState.timeInMin + 1,
    }))
  }

  renderingTimerSet = () => {
    const {timeInSec, timeInMin} = this.state
    const isDisabled = timeInSec > 0

    return (
      <div className="timerSetCon">
        <p className="timerSetP">Set Timer Limit</p>
        <div className="settingCon">
          <button
            className="setBton"
            type="button"
            disabled={isDisabled}
            onClick={this.onDecreasing}
          >
            -
          </button>
          <div className="setPCon">
            <p className="setP">{timeInMin}</p>
          </div>
          <button
            className="setBton"
            type="button"
            disabled={isDisabled}
            onClick={this.onIncreasing}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onReset = () => {
    this.onClearingTimer()
    this.setState(initialState)
  }

  increasingSeconds = () => {
    const {timeInMin, timeInSec} = this.state
    const isCompleted = timeInMin * 60 === timeInSec

    if (isCompleted) {
      this.onClearingTimer()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        timeInSec: prevState.timeInSec + 1,
      }))
    }
  }

  onTogglingBton = () => {
    const {isRunning, timeInMin, timeInSec} = this.state
    const isCompleted = timeInMin * 60 === timeInSec

    if (isCompleted) {
      this.setState({timeInSec: 0})
    }
    if (isRunning) {
      this.onClearingTimer()
    } else {
      this.timerId = setInterval(this.increasingSeconds, 1000)
    }
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
  }

  renderingStartOrStop = () => {
    const {isRunning} = this.state
    const startOrStopUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrStopText = isRunning ? 'Pause' : 'Start'
    const startOrStopAlt = isRunning ? 'pause icon' : 'play icon'

    return (
      <div className="startOrStopCon">
        <button
          className="startOrStopBton"
          type="button"
          onClick={this.onTogglingBton}
        >
          <img
            className="startOrStopIcon"
            src={startOrStopUrl}
            alt={startOrStopAlt}
          />
          <p className="setConP">{startOrStopText}</p>
        </button>
        <button
          className="startOrStopBton"
          type="button"
          onClick={this.onReset}
        >
          <img
            className="startOrStopIcon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
          />
          <p className="setConP">Reset</p>
        </button>
      </div>
    )
  }

  gettingTime = () => {
    const {timeInMin, timeInSec} = this.state
    const remainingSeconds = timeInMin * 60 - timeInSec
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunning} = this.state
    const TimerText = isRunning ? 'Running' : 'Paused'

    return (
      <div className="mainCon">
        <h1 className="mainH">Digital Timer</h1>
        <div className="firstCon">
          <div className="timerBgCon">
            <div className="TimerCon">
              <h1 className="timerH">{this.gettingTime()}</h1>
              <p className="textInTimer">{TimerText}</p>
            </div>
          </div>
          <div className="timeSettingCon">
            {this.renderingStartOrStop()}
            {this.renderingTimerSet()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
