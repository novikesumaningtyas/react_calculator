import * as React from 'react';
import PointTarget from 'react-point';
import './App.css';

const CalOperation = {
    '+': (firstValue, secondValue) => firstValue + secondValue,
    '-': (firstValue, secondValue) => firstValue - secondValue,
    '*': (firstValue, secondValue) => firstValue * secondValue,
    '/': (firstValue, secondValue) => firstValue / secondValue,
    '=': (firstValue, secondValue) => secondValue,

    '^': (firstValue, secondValue) => Math.pow(parseFloat(firstValue), parseFloat(secondValue))
}

class Calculator extends React.Component {
    state = {
        operator: null,
        nextOperator: false,
        value: null,
        showedNumber: '0'

    };

    deleteLastNumber() {
        const {showedNumber} = this.state

        this.setState({
            showedNumber: showedNumber.substring(0, showedNumber.length - 1) || '0'
        })
    }

    clearAll() {
        this.setState({
            value: null,
            showedNumber: '0',
            operator: null,
            nextOperator: false
        })
    }

    displayZero() {
        this.setState({
            showedNumber: '0'
        })
    }


    sqrt(){
        const { showedNumber } = this.state
        const currentNumber = parseFloat(showedNumber)

        const newValue = Math.sqrt(currentNumber)

        this.setState({
            showedNumber: String(newValue)
        })
    }

    insertDecimal() {
        const { showedNumber } = this.state

        if (!(/\./).test(showedNumber)) {
            this.setState({
                nextOperator: false,
                showedNumber: showedNumber +'.'

            })
        }
    }

    insertNumber(number) {
        const {showedNumber, nextOperator} = this.state

        if (nextOperator) {
            this.setState({
                nextOperator: false,
                showedNumber: String(number)
            })
        } else {
            this.setState({
                showedNumber: showedNumber === '0' ? String(number) : showedNumber + number
            })
        }
    }

    calculate(nextOperator) {
        const { value, showedNumber, operator } = this.state
        const realNumber = parseFloat(showedNumber)

        if (value == null) {
            this.setState({
                value: realNumber
            })
        } else if (operator) {
            const currentNumber = value || 0
            const newValue = CalOperation[operator](currentNumber, realNumber)

            this.setState({
                value: newValue,
                showedNumber: String(newValue)
            })
        }

        this.setState({
            nextOperator: true,
            operator: nextOperator
        })
    }

    inputEvent = (event) => {
        let { key } = event

        if (key === 'Enter')
            key = '='

        if ((/\d/).test(key)) {
            event.preventDefault()
            this.insertNumber(parseInt(key, 10))
        }
        else if (key === 'Backspace') {
            event.preventDefault()
            this.deleteLastNumber()
        }
        else if (key === '.') {
            event.preventDefault()
            this.insertDecimal()
        }
        else if (key in CalOperation) {
            event.preventDefault()
            this.calculate(key)
        }
        else if (key === 'Clear') {
            event.preventDefault()

         if (this.state.showedNumber !== '0') {
                this.displayZero()
            } else {
                this.clearAll()
            }
        }
    };

    componentDidMount() {
        document.addEventListener('buttonClicked', this.inputEvent)
    }

    componentWillUnmount() {
        document.removeEventListener('buttonClicked', this.inputEvent)
    }

    render() {
        const { showedNumber } = this.state

        const displayZero = showedNumber !== '0'
        const clearText = displayZero ? 'C' : 'AC'

        return (
            <div className="calculator">
                <CalculatorDisplay value={showedNumber}/>
                <div className="calculator-keypad">
                    <div className="input-keys">
                        <div className="function-keys">
                            <CalButton className="key-clear" onPress={() => displayZero ? this.displayZero() : this.clearAll()}>{clearText}</CalButton>
                            <CalButton className="key-root" onPress={() => this.sqrt()}>√</CalButton>
                            <CalButton className="key-power" onPress={() => this.calculate('^')}>^</CalButton>
                        </div>
                        <div className="digit-keys">
                            <CalButton className="key-0" onPress={() => this.insertNumber(0)}>0</CalButton>
                            <CalButton className="key-dot" onPress={() => this.insertDecimal()}>●</CalButton>
                            <CalButton className="key-1" onPress={() => this.insertNumber(1)}>1</CalButton>
                            <CalButton className="key-2" onPress={() => this.insertNumber(2)}>2</CalButton>
                            <CalButton className="key-3" onPress={() => this.insertNumber(3)}>3</CalButton>
                            <CalButton className="key-4" onPress={() => this.insertNumber(4)}>4</CalButton>
                            <CalButton className="key-5" onPress={() => this.insertNumber(5)}>5</CalButton>
                            <CalButton className="key-6" onPress={() => this.insertNumber(6)}>6</CalButton>
                            <CalButton className="key-7" onPress={() => this.insertNumber(7)}>7</CalButton>
                            <CalButton className="key-8" onPress={() => this.insertNumber(8)}>8</CalButton>
                            <CalButton className="key-9" onPress={() => this.insertNumber(9)}>9</CalButton>
                        </div>
                    </div>
                    <div className="operator-keys">
                        <CalButton className="key-add" onPress={() => this.calculate('+')}>+</CalButton>
                        <CalButton className="key-subtract" onPress={() => this.calculate('-')}>−</CalButton>
                        <CalButton className="key-multiply" onPress={() => this.calculate('*')}>×</CalButton>
                        <CalButton className="key-divide" onPress={() => this.calculate('/')}>÷</CalButton>

                        <CalButton className="key-equals" onPress={() => this.calculate('=')}>=</CalButton>
                        <p className="result">{showedNumber}</p>
                    </div>
                </div>
            </div>

        )
    }
}

class ResizeDisplay extends React.Component {
    state = {
        scale: 1
    };

    componentDidUpdate() {
        const { scale } = this.state

        const node = this.node
        const parentNode = node.parentNode

        const offWidth = parentNode.offsetWidth
        const actualWidth = node.offsetWidth
        const actualScale = offWidth / actualWidth

        if (scale === actualScale)
            return

        if (actualScale < 1) {
            this.setState({ scale: actualScale })
        } else if (scale < 1) {
            this.setState({ scale: 1 })
        }
    }

    render() {
        const { scale } = this.state

        return (
            <div
                className="auto-scaling-text"
                style={{ transform: `scale(${scale},${scale})` }}
                ref={node => this.node = node}
            >{this.props.children}</div>
        )
    }
}

class CalculatorDisplay extends React.Component {
    render() {
        const { value, ...props } = this.props

        const language = navigator.language || 'en-US'
        let formattedValue = parseFloat(value).toLocaleString(language, {
            useGrouping: true,
            maximumFractionDigits: 6
        })

        // Add back missing .0 in e.g. 12.0
        const match = value.match(/\.\d*?(0*)$/)

        if (match)
            formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

        return (
            <div {...props} className="calculator-display">
                <ResizeDisplay>{formattedValue}</ResizeDisplay>
            </div>
        )
    }
}

class CalButton extends React.Component {
    render() {
        const { onPress, className, ...props } = this.props

        return (
            <PointTarget onPoint={onPress}>
                <button className={`calculator-key ${className}`} {...props}/>
            </PointTarget>
        )
    }
}

export default Calculator;