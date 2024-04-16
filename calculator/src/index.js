import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

function Calculator() {
	const [calc, setCalc] = React.useState({
		current: "0",
		total: "0",
		isInitial: true,
		preOp: "",
    memory: "0"
	});

	function handleNumber(value) {
    if (!(calc.current.includes('.') && value == ".")) { 
      let newValue = value;      

      if (!calc.isInitial) {
          newValue = calc.current + value;
      }

      //Don't let numbers overflow display
      if (newValue.length < 16) {      
        setCalc({current: newValue, total: calc.total, isInitial: false, preOp: calc.preOp, memory: calc.memory});
      }
    }
	}

	function handleOperator(value) {
    if (calc.current != ".") { //Don't allow single decimal to work with operator
      let total = doCalculation();	

      //Don't let numbers overflow display
      if (total.toString().length > 16) total = 0;

      setCalc({current: total.toString(), total: total.toString(), isInitial: true, preOp: value, memory: calc.memory});
    }
	}

	function doCalculation() {
		let total = parseFloat(calc.total);

		switch(calc.preOp) {
			case "+":
				total += parseFloat(calc.current);
				break;
			case "-":
				total -= parseFloat(calc.current);
				break;
			case "*":
				total *= parseFloat(calc.current);
				break;
			case "/":
				total /= parseFloat(calc.current);
				break;
			default:
				total = parseFloat(calc.current);
		}

		return total;
	}

	function renderDisplay() {
		return calc.current;
	}

	function handleClear() {
		setCalc({
			current: "0",
			total: "0",
			isInitial: true,
			preOp: "",
      memory: calc.current
		});
	}

  function handleMemoryRecall() {    
    setCalc({
      current: calc.memory,
			total: calc.total,
			isInitial: calc.isInitial,
			preOp: calc.preOp,
      memory: calc.memory
		});   
	}

  function handleMemoryAdd() {
		setCalc({
      current: calc.current,
			total: calc.total,
			isInitial: calc.isInitial,
			preOp: calc.preOp,
      memory: calc.current
		});
	}

  function handleMemoryMinus() {
    setCalc({
      current: calc.current,
			total: calc.total,
			isInitial: calc.isInitial,
			preOp: calc.preOp,
      memory: 0
		});
	}

  function handleSquare() {
    let total = parseFloat(calc.current ** 2);

    setCalc({
      current: total,
			total: total,
			isInitial: false,
			preOp: calc.preOp,
      memory: 0
		});
	}

  function handleDecimal() {

  }

	return (
		<div className="calculator">
			<div className="display">{renderDisplay()}</div>      
      <CalcButton className="operator" value="M+" onClick={handleMemoryAdd}/>
      <CalcButton className="operator" value="M-" onClick={handleMemoryMinus}/>
      <CalcButton className="operator" value="MR" onClick={handleMemoryRecall}/>
      <CalcButton className="operator" value="x²" onClick={handleSquare}/>
      <CalcButton className="operator" value="C" onClick={handleClear}/>

			<CalcButton value="7" onClick={handleNumber}/>
			<CalcButton value="8" onClick={handleNumber}/>
			<CalcButton value="9" onClick={handleNumber}/>
			<CalcButton className="operator" value="/" onClick={handleOperator}/>      
      <button/>
      
			<CalcButton value="4" onClick={handleNumber}/>
			<CalcButton value="5" onClick={handleNumber}/>
			<CalcButton value="6" onClick={handleNumber}/>
			<CalcButton className="operator" value="*" onClick={handleOperator}/>
      <button/>
      
			<CalcButton value="1" onClick={handleNumber}/>
			<CalcButton value="2" onClick={handleNumber}/>
			<CalcButton value="3" onClick={handleNumber}/>
			<CalcButton className="operator" value="-" onClick={handleOperator}/>
      <button/>

			<CalcButton value="." onClick={handleNumber}/>
			<CalcButton value="0" onClick={handleNumber}/>
			<CalcButton value="=" onClick={handleOperator}/>
			<CalcButton className="operator" onClick={handleOperator} value="+"/>
      <button/>
		</div>
	)
}

function CalcButton(props) {	
	return <button className={props.className} onClick={() => props.onClick(props.value)}>{props.value}</button>
}

ReactDOM.render(<div className="app-container"><Calculator/></div>, document.getElementById("root"));