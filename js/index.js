var total = 0;
var temp1 = "";
var operator = "";
var temp2 = "";


// SÓ IDENTIFICA
function identify_button(target){
    if($.isNumeric(target) || target == "."){
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





// PROCESSA E PRINTA
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

    $('#calculator .result span').text(final_value);
}





// LIMPA OS CAMPOS
function clean_fields(){
    temp1 = "";
    temp2 = "";
    operator = "";
}





function result_size_control(){
    let result = $('.result span');
    let result_length = result.html().length;

    if(result_length < 8){
        result.css({'font-size': '80px'});
    }else if(result_length >= 8 && result_length < 11){
        result.css({'font-size': '60px'});
    }else if(result_length >= 11 && result_length < 15){
        result.css({'font-size': '40px'});
    }else if(result_length >= 15){
        result.css({'font-size': '20px'});
    }
}



$(window).on('load',function(){
    let theme = localStorage.getItem('theme');
    let calculator = $('#calculator');

    if(theme != null){
        calculator.removeClass().addClass(theme);
        $('#theme option').each(function(e){
            if($(this)[0].value == theme){
                $(this).attr('selected','selected');
            }
        });
    }
});

$('#calculator .btn').click(function(){
    let pressed_button = $(this).text();

    identify_button(pressed_button);

    result_size_control();
});

$('#theme').change(function(){
    let theme = $('#theme').val();
    let calculator = $('#calculator');

    calculator.removeClass().addClass(theme);
    localStorage.setItem('theme', theme)
});