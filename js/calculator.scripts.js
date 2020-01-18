//Funciones flecha basicas a utilizar para recibir y enviar datos
getHistory = () =>{
	return document.getElementById("history-value").innerText;
}
printHistory = (num) =>{
	document.getElementById("history-value").innerText=num;
}
getOutput = () =>{
	return document.getElementById("output-value").innerText;
}
printOutput = (num) =>{
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}

//Funciones para darle formato
getFormattedNumber = (num) =>{
    //resta
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
//Funciones para darle formato
reverseNumberFormat = (num) =>{
	return Number(num.replace(/,/g,''));
}


//recorriendo operadores
var operator = document.getElementsByClassName("operator");
//se genera un for para recorrer todos los elementos con la clase de operador
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){ //si el output tiene valor
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
                    //removemos el ultimo valor con substr para que funcione el boton CE
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
                output= output==""?output:reverseNumberFormat(output);
                //suma
				history=history+output;
				if(this.id=="="){
                    //Si el usuario da click en igual evaluamos lo que haya en historia
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}

//recorriendo numeros
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
    //revisamos si lo introducido son numeros para saber si usamos format o no
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //si el output es un numero
			output=output+this.id;
			printOutput(output);
		}
	});
}