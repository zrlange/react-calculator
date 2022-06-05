import React, {useState} from "react";
import {Button, Container, Current, Previous, Screen} from "./Styled";

export default function Calculator() {

    window.addEventListener('keyup', handleKeyPress);

    function handleKeyPress(event) {
        const input = event.key
        console.log(input)
        switch(input) {
            case 'Clear':
                handleAllClear()
                break;
            case 'Backspace':
            case 'Delete':
                handleDelete();
                break;
            case 'Enter':
            case 'Equals':
            case 'Return':
                equals();
                break;
            case '9':
            case '8':
            case '7':
            case '6':
            case '5':
            case '4':
            case '3':
            case '2':
            case '1':
            case '0':
            case '.':
                appendValueKey(input);
                break;
            case '/':
                chooseOperationKey('÷');
                break;
            case '*':
                chooseOperationKey('×');
                break;
            case '+':
                chooseOperationKey('+');
                break;
            case '-':
                chooseOperationKey('−');
                break;
            default:
                return
        }
        window.removeEventListener('keyup',handleKeyPress)
    }

    const [previous, setPrevious] = useState('');
    const [current, setCurrent] = useState('');
    const [operation, setOperation] = useState('');

    const appendValue = (el) => {

        const value = el.target.getAttribute('data')
        if(value === '.' && current.includes('.')) return
        setCurrent(current + value)
    }
    const appendValueKey = (key) => {
        const value = key
        if(value === '.' && current.includes('.')) return
        setCurrent(current + value)
    }

    const handleDelete = () => {
        setCurrent(String(current).slice(0, -1))
    }

    const handleAllClear = () => {

        setCurrent('')
        setPrevious('')
        setOperation('')
    }
    const chooseOperation = (el) => {

        if(current === '') return
        if(previous !== '') {
            let value = compute();
            setPrevious(value)
        } else {
            setPrevious(current)
        }

        setCurrent('')
        setOperation(el.target.getAttribute('data'))
    }

    const chooseOperationKey = (char) => {

        if(current === '') return
        if(previous !== '') {
            let value = compute();
            setPrevious(value)
        } else {
            setPrevious(current)
        }

        setCurrent('')
        setOperation(char)
    }

    const equals = () => {

        let value = compute();
        if(value === undefined || value === null) return

        setCurrent(value)
        setPrevious('')
        setOperation('')
    }

    const compute = () => {

        let result
        let previousNumber = parseFloat(previous)
        let currentNumber = parseFloat(current)

        if(isNaN(previousNumber) ||isNaN(currentNumber)) return

        switch(operation) {
            case '÷':
                result = previousNumber / currentNumber;
                break;
            case '×':
                result = previousNumber * currentNumber;
                break;
            case '+':
                result = previousNumber + currentNumber;
                break;
            case '−':
                result = previousNumber - currentNumber;
                break;
            default:
                return
        }

        return result
    }

    return(
        <Container>
          <Screen>
              <Previous>{previous} {operation}</Previous>
              <Current>{current}</Current>
          </Screen>
            <Button gridSpan={2} control onClick={handleAllClear} ID='All Clear'>AC</Button>
            <Button control onClick={handleDelete}>DEL</Button>
            <Button data={'÷'} onClick={chooseOperation} operation>÷</Button>
            <Button data={'7'} onClick={appendValue} >7</Button>
            <Button data={'8'} onClick={appendValue}>8</Button>
            <Button data={'9'} onClick={appendValue}>9</Button>
            <Button data={'×'} onClick={chooseOperation} operation>×</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} onClick={chooseOperation} operation>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'−'} onClick={chooseOperation} operation>−</Button>
            <Button period data={'.'} onClick={appendValue}>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button gridSpan={2} onClick={equals} equals>=</Button>
        </Container>
    )

}