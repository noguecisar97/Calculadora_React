import React, {Component } from 'react'
import './calculadora.css'
import Button from '../componentes/button'
import Display from '../componentes/display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operatio:null,
  values: [0, 0],
  current: 0
}

export default class Calculadora extends Component {

  state = {...initialState};

  constructor(props){
    super(props)

    this.clearMemory = this.clearMemory.bind(this)
    this.addDigit = this.addDigit.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.calcula = this.calcula.bind(this)
    this.arredonda = this.arredonda.bind(this)
  }

  clearMemory(){
    this.setState({...initialState})
  }

  calcula(operacao, valores){
    switch(operacao){
      case '+':
        return valores[0] + valores[1];
      case '*':
        return valores[0] * valores[1];
      case '-':
        return valores[0] - valores[1];
      case '/':
        return valores[0] / valores[1];
      default:
        return valores[0];
    }
  }

  arredonda(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  };

  setOperation(operation){
    if(this.state.current === 0){
      this.setState({ operation, current:1, clearDisplay:true})
    }else{
      const result = operation === '='
      const currentOperation = this.state.operation

      const values = [...this.state.values]
      values[0] = this.arredonda(this.calcula(currentOperation, values), 1)
      values[1] = 0

      this.setState({
        displayValue: values[0],
        operation: result ? null : operation,
        current: result? 0: 1,
        clearDisplay: !result,
        values
      })
    }
  }

  addDigit(n){
    if (n === '.' && this.state.displayValue.includes('.')){
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay? '' : this.state.displayValue
    const displayValue = currentValue + n

    this.setState({ displayValue, clearDisplay: false})

    if(n !== '.'){
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({ values })
    }
  }

  render(){
    // const addDigit = n => this.addDigit(n)
    // const setOperation = op => this.setOperation(op)

    return(
      <div className='calculadora'>
        <Display value={this.state.displayValue}/>
        <Button triple label='AC' click={this.clearMemory}/>
        <Button operation label='/' click={this.setOperation}/>
        <Button label='7'click={this.addDigit}/>
        <Button label='8'click={this.addDigit}/>
        <Button label='9'click={this.addDigit}/>
        <Button operation label='*'click={this.setOperation}/>
        <Button label='4'click={this.addDigit}/>
        <Button label='5'click={this.addDigit}/>
        <Button label='6'click={this.addDigit}/>
        <Button operation label='-'click={this.setOperation}/>
        <Button label='1'click={this.addDigit}/>
        <Button label='2'click={this.addDigit}/>
        <Button label='3'click={this.addDigit}/>
        <Button operation label='+'click={this.setOperation}/>
        <Button label='0'click={this.addDigit} double/>
        <Button label='.'click={this.addDigit}/>
        <Button operation label='='click={this.setOperation}/>
      </div>
    )
  }
}


