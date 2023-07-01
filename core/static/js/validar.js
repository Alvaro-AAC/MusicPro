// JavaScript Document

var nombreFirst = false;
var apellidoFirst = false;
var correoFirst = false;
var idFirst = false;
var numeroFirst = false;
var pwdFirst = false;
var edadFirst = false;
var direccionFirst = false;
var numeracionFirst = false;

var allValidado = false;

var nombreValidado = false;
var apellidoValidado = false;
var correoValidado = false;
var idValidado = false;
var numeroValido = true;
var pwdValido = false;
var edadValido = false;
var terminosValido = false;
var direccionValido = false;
var numeracionValido = false;

const isUpperCase = (string) => /^[A-Z\u00d1Á-Ú]*$/.test(string);
const isLowerCase = (string) => /^[a-z\u00f1á-ú]*$/.test(string);
const isAlpha = (string) => /^[a-zA-Zá-úÁ-Ú\u00d1\u00f1]*$/.test(string);
const isEmail = (string) => /^[a-zA-Z0-9.]{1,}@[a-zA-Z0-9.]{2,}$/.test(string);
const isEdad = (string) => /^[0-9]{2,3}$/.test(string);
const isRut = (string) => /^[0-9]{7,8}-[0-9Kk]{1}$/.test(string);
const isTelefono = (string) => /^[0-9]{6,10}$/.test(string);
const isPwd = (string) => /^[^]{8,24}$/.test(string);
const isDireccion = (string) => /^[a-zA-Zá-úÁ-Ú\u00f1\u00d1\s0-9]{1,}$/.test(string);
const isNumeracion = (string) => /^[0-9]{2,6}$/.test(string);
const haveTwoSpace = (string) => /\s{2}/.test(string);

function init() {
	
	$('#regisform').submit(function(e) {
		aceptoTerminos();
		if(nombreValidado && apellidoValidado && correoValidado && idValidado && numeroValido && pwdValido && edadValido && terminosValido && direccionValido && numeracionValido) {
			allValidado = true;
		} else {	
			allValidado = false;
		}
		
		if(!allValidado) {
			e.preventDefault();
			if(!nombreFirst && !apellidoFirst && !correoFirst && !idFirst && !numeroFirst && !edadFirst) {
				alert('Debe ingresar sus datos.');
			}	
		} else {
			e.preventDefault();
			var formSubmit = $(this);
			var exitmodal = $('#exitModal');
			var loadingmodal = $('#loadingModal');
			loadingmodal.modal('toggle');
			$('#loadingModalBody').html('<progress class="pure-material-progress-circular"></progress>');
			/*setTimeout(function() {
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
			}, 3000);*/
			$.ajax({
				type: 'POST',
				url: '/post/register/',
				data: formSubmit.serialize(),
				success: function(data) {
					loadingmodal.modal('hide');
					exitmodal.modal('toggle');
					window.location.replace(window.location.origin);
				},
				error: function(data) {
					let failmodal = $('#failModal');
					loadingmodal.modal('hide');
					failmodal.modal('toggle');
					$('#errorsignup').html(data.responseJSON.error);
				}
			})
		}
	});
	
	$('#nombre').focusout(validarNombre);
	$('#apellido').focusout(validarApellido);
	$('#nombre').keyup(validarNombreChange);
	$('#apellido').keyup(validarApellidoChange);
	$('#mail').focusout(validarMail);
	$('#mail').keyup(validarMailChange);
	$('#id').focusout(validarRut);
	$('#id').keyup(validarRutChange);
	$('#tel').focusout(validarTelefono);
	$('#tel').keyup(validarTelefonoChange);
	$('#tel').focusin(addCodarea);
	$('#pwd').focusout(validarPwd);
	$('#pwd').keyup(validarPwdChange);
	$('#pwdreveal').click(revelarPwd);
	$('#edad').focusout(validarEdad);
	$('#edad').keyup(validarEdadChange);
	$('#terminos').change(aceptoTerminos);
	$('#direccion').focusout(validarDireccion);
	$('#direccion').keyup(validarDireccionChange);
	$('#numeracion').focusout(validarNumeracion);
	$('#numeracion').focusin(addGato);
	$('#numeracion').keyup(validarNumeracionChange);
	$('#regisform')[0].addEventListener('reset', function() {
		nombreFirst = true;
		apellidoFirst = true;
		correoFirst = true;
		idFirst = true;
		pwdFirst = true;
		edadFirst = true;
		direccionFirst = true;
		numeracionFirst = true;
		allValidado = false;
		var resetCiudad = setInterval(function() {
			$('#region').trigger('change');
			if($('#ciudad').val() == '189') {
				clearInterval(resetCiudad);
			}
		}, 100)
		
		$('input:not(#codarea, #limpiar, #registrarse, #tel, #registrarusuario)').css('border-color', 'rgba(255, 99, 71, 1)');
	});
}

function aceptoTerminos() {
	terminosValido = $('#terminos').prop('checked');
	if(!$('#terminos').prop('checked')) {
		$('#terminosReq').html('<br>Debe aceptar los terminos y condiciones para registrarse.');
	} else {
		$('#terminosReq').html('');
	}
}

function validacionErronea(id) {
	var nombre = $(id)[0];
	nombre.style.borderColor = 'rgba(255, 99, 71, 1)';
}

function validacionNormal(id) {
	var nombre = $(id)[0];
	nombre.style.borderColor = 'lightgreen';
}

function addGotInput(elem) {
	if(elem.value.length>0) {
		elem.classList.add('gotinput');
	} else {
		elem.classList.remove('gotinput');
	}
}

function revelarPwd() {
	var elem = $('#pwd');
	var icon = $('#pwdreveal');
	if(elem[0].getAttribute('type')=='password') {
		elem.attr('type', 'text');
		icon.html('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="2" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />');
	} else {
		elem.attr('type', 'password');
		icon.html('<path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="3" y1="3" x2="21" y2="21" /><path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" /><path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />');
	}
}

function validarNombre() {
	addGotInput($('#nombre')[0]);
	var i = 0;
	var aux = 0;
	var input = $('#nombre').val();
	var arr = input.split(' ');
	for(letra of arr[0]) {
		if(i==0 && isUpperCase(letra)) {
			aux = 1;
		}
		else if(i!=0 && isLowerCase(letra)) {
			aux++;
		}
		i++;
	}
	arr.forEach(function (elem, i) {
		if(i>0) {
			for(letter of elem) {
				if(isAlpha(letter)) {
					aux++;
				}
			}
		}
	})
	var nombre = $('#nombre')[0];
	if(aux+arr.length-1==input.length && input.length != 0 && !haveTwoSpace(input)) {
		nombreValidado = true;
		validacionNormal('#nombre');
		nombre.setCustomValidity('');
	}
	else {
		nombreValidado = false;
		nombreFirst = true;
		validacionErronea('#nombre');
		nombre.setCustomValidity('Debes ingresar un nombre válido.');
	}
}

function validarApellido() {
	addGotInput($('#apellido')[0]);
	var i = 0;
	var aux = 0;
	var input = $('#apellido').val();
	var arr = input.split(' ');
	for(letra of arr[0]) {
		if(i==0 && isUpperCase(letra)) {
			aux = 1;
		}
		else if(i!=0 && isLowerCase(letra)) {
			aux++;
		}
		i++;
	}
	arr.forEach(function (elem, i) {
		if(i>0) {
			for(letter of elem) {
				if(isAlpha(letter)) {
					aux++;
				}
			}
		}
	})
	var apellido = $('#apellido')[0];
	if(aux+arr.length-1==input.length && input.length != 0 && !haveTwoSpace(input)) {
		apellidoValidado = true;
		validacionNormal('#apellido');
		apellido.setCustomValidity('');
	}
	else {
		apellidoValidado = false;
		apellidoFirst = true;
		validacionErronea('#apellido');
		apellido.setCustomValidity('Debes ingresar un apellido válido.');
	}
}

function validarNombreChange() {
	if(nombreFirst) {
		validarNombre();
	}
}

function validarApellidoChange() {
	if(apellidoFirst) {
		validarApellido();
	}
}

function validarMail() {
	var mail = $('#mail')[0];
	addGotInput(mail);
	if(isEmail($('#mail').val())) {
		correoValidado = true;
		validacionNormal('#mail');
		mail.setCustomValidity('');
	} else {
		correoFirst = true;
		correoValidado = false;
		validacionErronea('#mail');
		mail.setCustomValidity('Debe ingresar un correo válido. \n (example@mail.com)');
	}
}

function validarMailChange() {
	if(correoFirst) {
		validarMail();
	}
}

function validarRut() {
	var rut = $('#id')[0];
	var input = $('#id').val();
	addGotInput(rut);
	if(isRut(input) && mod11(input)) {
		idValidado = true;
		validacionNormal('#id');
		rut.setCustomValidity('');
	}
	else {
		idFirst = true;
		idValidado = false;
		validacionErronea('#id');
		rut.setCustomValidity('Debe ingresar un rut válido.');
	}
}

function validarRutChange() {
	if(idFirst) {
		validarRut();
	}
}

function mod11(input) {
    var numero = input.substring(0, input.length-2);
    var dv = input.substring(input.length-1);
    var reverse_rut = ''
    for(digit of numero) {
        reverse_rut = digit.toString() + reverse_rut;
    }
    var reverse_rut_arr = reverse_rut.split('');
    var j = 2;
    var suma_total = 0;
    for(let i = 0; i<reverse_rut_arr.length; i++) {
        reverse_rut_arr[i] *= j;
        suma_total += reverse_rut_arr[i];
        j++;
        if(j==8) {
            j = 2;
        }
    }
    var mod = 11-(suma_total%11);
    if(mod==10) {
        mod = 'K';
    }
    else if(mod==11) {
        mod = 0;
    }
    return mod==dv;
}

function validarTelefono() {
	var tel = $('#tel').val();
	var telefono = $('#tel')[0];
	addGotInput(telefono);
	if(!$('#tel').hasClass('gotinput') && !$('#tel').is(':focus')) {
		$('#codarea').html('');
	}
	if(isTelefono(tel) || tel.length==0) {
		numeroValido = true;
		validacionNormal('#tel');
		telefono.setCustomValidity('');
	} 
	else {
		numeroFirst = true;
		numeroValido = false;
		validacionErronea('#tel');
		telefono.setCustomValidity('Debe ingresar un número válido:\n-Debe tener entre 6 y 10 dígitos.\n');
	}
}

function addCodarea() {
	$('#codarea').html('+56');
}

function validarTelefonoChange() {
	if(numeroFirst) {
		validarTelefono();
	}
}

function validarPwd() {
	var elem = $('#pwd')[0];
	var input = $('#pwd').val();
	addGotInput(elem);
	if(isPwd(input)) {
		pwdValido = true;
		validacionNormal('#pwd');
		elem.setCustomValidity('');
	} else {
		pwdValido = false;
		pwdFirst = true;
		validacionErronea('#pwd');
		elem.setCustomValidity('La contraseña debe tener:\n-Mínimo 8 caracteres\n')
	}
}

function validarPwdChange() {
	if(pwdFirst) {
		validarPwd();
	}
}

function validarEdad() {
	var elem = $('#edad')[0];
	var input = $('#edad').val();
	addGotInput(elem);
	var edad = parseInt(input);
	if(edad>14 && edad<111 && isEdad(input)) {
		edadValido = true;
		validacionNormal('#edad');
		elem.setCustomValidity('');
	} else {
		edadValido = false;
		edadFirst = true;
		validacionErronea('#edad');
		elem.setCustomValidity('Debe ingresar una edad válida:\n\t-Debe ser mayor de 14 años.\n\t-No puede sobrepasar los 110 años.')
	}
}

function validarEdadChange() {
	if(edadFirst) {
		validarEdad();
	}
}

function validarDireccion() {
	var elem = $('#direccion')[0];
	var input = $('#direccion').val();
	addGotInput(elem);
	if(isDireccion(input) && !haveTwoSpace(input)) {
		direccionValido = true;
		validacionNormal('#direccion');
		elem.setCustomValidity('');
	} else {
		direccionValido = false;
		direccionFirst = true;
		validacionErronea('#direccion');
		elem.setCustomValidity('La dirección debe tener:\n-Mínimo 6 caracteres.\n-No pueden haber dos espacios seguidos.')
	}
}

function validarDireccionChange() {
	if(direccionFirst) {
		validarDireccion();
	}
}

function validarNumeracion() {
	var elem = $('#numeracion')[0];
	var input = $('#numeracion').val();
	addGotInput(elem);
	if(!$('#numeracion').hasClass('gotinput') && !$('#numeracion').is(':focus')) {
		$('#gato').html('');
	}
	if(isNumeracion(input)) {
		numeracionValido = true;
		validacionNormal('#numeracion');
		elem.setCustomValidity('');
	} else {
		numeracionValido = false;
		numeracionFirst = true;
		validacionErronea('#numeracion');
		elem.setCustomValidity('La numeración de la casa debe tener:\n-Mínimo 2 números.\n-Máximo 6 números.')
	}
}

function validarNumeracionChange() {
	if(numeracionFirst) {
		validarNumeracion();
	}
}

function addGato() {
	$('#gato').html('#');
}

function testFailModal() {
	$('#failModal').modal('toggle');
}

$(document).ready(init);