$(document).ready(function() {
    var validaciones = {
        'nombre': '^[A-Z\\u00d1Á-Ú]{1}[a-zA-Zá-úÁ-Ú\\u00d1\\u00f1]{1,50}$',
        'apellido': '^[A-Z\\u00d1Á-Ú]{1}[a-zA-Zá-úÁ-Ú\\u00d1\\u00f1]{1,50}$',
        'edad': 'skip',
        'tel': '^[0-9]{6,10}$',
        'email': '^[a-zA-Z0-9.]{1,}@[a-zA-Z0-9.]{2,}$',
        'ciudad': 'skip',
        'direccion_numero': 'skip',
        'direccion_calle': '^[a-zA-Zá-úÁ-Ú\\u00f1\\u00d1\\s0-9]{1,}$'
    }
    for (var [key, value] of Object.entries(validaciones)) {
        if(value != 'skip') {
            $(`#id_${key}`).attr('pattern', value);
        }
    }
    $('#id_edad').attr('max', '110');
    $('#id_edad').attr('min', '10');
    $('#id_direccion_numero').attr('min', '10');
    $('#id_direccion_numero').attr('max', '999999');
    $('#id_tel').attr('min', '100000');
    $('#id_tel').attr('max', '9999999999');
});