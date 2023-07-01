//Validacion Mascota Java

var validarNombreMascota = false;
var validarIdentificacion = true;
var validarEdad = false;

const isNombre = (string) => /^[A-ZÁ-Ú]{1}[a-zA-Zá-úÁ-Ú\u00f1\u00d1\s]{1,}$/.test(string);
const haveTwoSpace = (string) => /\s{2}/.test(string);
const isChip = (string) => /^[0-9]{15}$/.test(string)

$(document).ready(function(){
    $('#enfermedadtext').keydown(contadorCaracteres);
    $('#enfermedadtext').keyup(contadorCaracteres);
    $('#nombre').keydown(validarNombreMasc);
    $('#nombre').keyup(validarNombreMasc);
    $('#nombre').focusout(validarNombreMasc);
    $('#nombre').focusin(validarNombreMasc);
    $('#chip').keydown(validarChip);
    $('#chip').keyup(validarChip);
    $('#chip').focusout(validarChip);
    $('#chip').focusin(validarChip);
    $('#edad').keydown(validarEdaad);
    $('#edad').keyup(validarEdaad);
    $('#edad').focusout(validarEdaad);
    $('#edad').focusin(validarEdaad);
    $('#regisform').submit(function(e){
        if(validarNombreMascota && validarIdentificacion && validarEdad){
            e.preventDefault();
            var formSubmit = $(this);
			var exitmodal = $('#exitModal');
			var loadingmodal = $('#loadingModal');
			loadingmodal.modal('toggle');
			$('#loadingModalBody').html('<progress class="pure-material-progress-circular"></progress>');
			setTimeout(function() {
				loadingmodal.modal('toggle');
				setTimeout(function() {
					exitmodal.modal('toggle');
					setTimeout(function() {
						formSubmit.unbind();
						formSubmit.submit();
						//exitmodal.modal('hide');
						//window.location.href = 'index.html';
					}, 3000);
				}, 500);
			}, 3000);
        } else {
            e.preventDefault();
            
        }
    });
    
});

function contadorCaracteres(){
    var charcounter = $('#charcounter');
    var charcounter_texto = charcounter[0].innerHTML;
    var length = $('#enfermedadtext').val().length;
    charcounter.html(length+'/80');
    if(length>79){
        $('#enfermedadtext').keydown(function(e) {
            length = $('#enfermedadtext').val().length;
            if(e.keyCode!=8 && length>79){
                console.log(length);
                e.preventDefault()
            } else {
                //$('#enfermedadtext').unbind('keydown',this);
            }
        });
        
    } else {
        //$('#enfermedadtext').unbind();
    }

}

function validarNombreMasc(){
    var nombreMas = $('#nombre');
    var input = nombreMas.val();
    if(isNombre(input) && !haveTwoSpace(input)){
        nombreMas[0].style.borderColor = 'green';
        nombreMas[0].setCustomValidity('');
        validarNombreMascota=true;
    } else {
        nombreMas[0].setCustomValidity('Debe contener minimo una mayuscula y 1 espacio como maximo...');
        //nombreMas.reportValidity();
        document.forms[0].reportValidity();
        nombreMas[0].style.borderColor = 'red';
        validarNombreMascota=false;
    }
}

function validarChip(){
    var chipMas = $('#chip');
    var input = chipMas.val();
    if(isChip(input) || input.length<=0){
        chipMas[0].style.borderColor = 'green';
        chipMas[0].setCustomValidity('');
        validarIdentificacion=true;
    } else {
        document.forms[0].reportValidity();
        chipMas[0].style.borderColor = 'red';
        validarIdentificacion=false;
    }
}

function validarEdaad(){
    var edadMas = $('#edad');
    var input = edadMas.val();
    var edad = parseInt(input);
    if(edad>=0 && edad<189){
        edadMas[0].style.borderColor = 'green';
        edadMas[0].setCustomValidity('');
        validarEdad =true;
    } else {
        document.forms[0].reportValidity();
        edadMas[0].style.borderColor = 'red';
        validarEdad =false;
    }
}
