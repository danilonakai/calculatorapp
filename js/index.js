var total = 0;
var temp1 = "";
var operator = "";
var temp2 = "";


function on_load(){
    let theme = localStorage.getItem('theme');
    let calculator = document.querySelector('#calculator');

    if(theme != null){
        calculator.classList = "";
        calculator.classList.add(theme);

        Array.from(document.querySelectorAll('#theme option')).forEach((e)=> {
            if(e.value == theme){
                e.setAttribute('selected','true');
            }
        });
    }
}

function pressed_button(button){
    identify_button(button);

    result_size_control();
}

function change_theme(){
    let theme = document.getElementById('theme').value;
    let calculator = document.getElementById('calculator');

    calculator.classList = "";
    calculator.classList.add(theme);
    localStorage.setItem('theme', theme)
}

function identify_button(target){
    if(!isNaN(target) || target == "."){
        if(operator == ""){
            if(total != 0){
                print_value("initial");
            }
            temp1 = temp1 += target;
            print_value(temp1);
        }else{
            temp2 = temp2 += target;
            print_value(temp2);
        }
    }else{
        switch(target){
            case "C":   
                print_value("initial");
            break;
            case "=":
                print_value("total");
            break;
            case "+":
                if(operator.length > 0 && temp2.length > 0){
                    print_value("total");
                    operator = "+";
                }else{
                    operator = "+";
                }
            break;
            case "-":
                if(operator.length > 0 && temp2.length > 0){
                    print_value("total");
                    operator = "-";
                }else{
                    operator = "-";
                }
            break;
            case "÷":
                if(operator.length > 0 && temp2.length > 0){
                    print_value("total");
                    operator = "/";
                }else{
                    operator = "/";
                }
            break;
            case "x":
                if(operator.length > 0 && temp2.length > 0){
                    print_value("total");
                    operator = "*";
                }else{
                    operator = "*";
                }
            break;
            case "%":
                if(operator.length > 0 && temp2.length > 0){
                    print_value("total");
                    print_value("percentage");
                }
                else if(String(temp1).length > 0 && operator.length == 0 && temp2.length == 0){
                    print_value("percentage");
                }
            break;
            case "+/-":
                if(operator.length > 0){
                    if(String(temp2).length == 0 || Number(temp2) == 0){
                        temp2 = "-";
                    }else{
                        temp2 = -(Number(temp2));
                    }
                    print_value(temp2);
                }
                else{
                    if(String(temp1).length == 0 || Number(temp1) == 0){
                        temp1 = "-";
                    }else{
                        temp1 = -(Number(temp1));
                    }
                    print_value(temp1);
                }
            break;
        }
    }
}

function print_value(value){
    let final_value;

    switch(value){
        default:
            final_value = value;
        break;

        case "initial":
            total = 0;
            clean_fields();
            final_value = total;
        break;

        case "total":
            total = eval(temp1+operator+temp2);
            final_value = total;
            clean_fields();
            temp1 = total;
        break;

        case "percentage":
            total = Number(temp1) / 100;
            final_value = total;
            clean_fields();
            temp1 = total;
        break;
    }

    document.querySelector('#calculator .result span').innerHTML = final_value;
}

function clean_fields(){
    temp1 = "";
    temp2 = "";
    operator = "";
}

function result_size_control(){
    let result = document.querySelector('.result span');
    let result_length = result.innerHTML.length;
    
    if(result_length < 8){
        result.style.fontSize = "80px";
    }else if(result_length >= 8 && result_length < 11){
        result.style.fontSize = "60px";
    }else if(result_length >= 11 && result_length < 15){
        result.style.fontSize = "40px";
    }else if(result_length >= 15){
        result.style.fontSize = "20px";
    }
}

function mobile_menu(){
    if(window.innerWidth < 500){
        let header = document.querySelector('header');

        if(header.offsetTop != 0){
            header.classList.add('show');
        }else{
            header.classList.remove('show');
        }
    }
}