function sumar(url) {
    $('.cantbtn').addClass('disabled');
    var id = `${url.slice(15, -1)}`;
    var stock = $(`#${id}-stock`).val();
    var id_cantidad = `#${id}-cant`;
    var id_subtotal = `#${id}-subtotal`;
    var id_preciou = `#${id}-preciou`;
    var preciou = $(id_preciou).val();
    var total = `#total`;
    var nueva_cant = 1 + parseInt($(id_cantidad)[0].innerHTML);
    if (nueva_cant <= stock) {
        $(id_cantidad).html(nueva_cant);
        var precioU = parseInt(preciou);
        var subTotal = parseInt($(id_subtotal)[0].innerHTML);
        $(id_subtotal).html(precioU + subTotal);
        $(total).html(parseInt($(total)[0].innerHTML) + precioU);
        $.ajax({
            type: "GET",
            headers: {'thisisajax': 'thisisajax'},
            url: url,
            success: (r) => ($('.cantbtn').removeClass('disabled'))
        });
    } else {
        $('.cantbtn').removeClass('disabled');
        window.alert('No existe más stock para este producto.');
    }
}

function restar(url) {
    $('.cantbtn').addClass('disabled')
    var id = `${url.slice(14, -1)}`;
    var id_cantidad = `#${id}-cant`;
    var id_subtotal = `#${id}-subtotal`;
    var id_preciou = `#${id}-preciou`;
    var preciou = $(id_preciou).val();
    var total = `#total`;
    var nueva_cant = -1 + parseInt($(id_cantidad)[0].innerHTML);
    if (nueva_cant >= 0) {
        $(id_cantidad).html(nueva_cant);
        var precioU = parseInt(preciou);
        var subTotal = parseInt($(id_subtotal)[0].innerHTML);
        $(id_subtotal).html(-precioU + subTotal);
        $(total).html(parseInt($(total)[0].innerHTML) - precioU);
        $.ajax({
            type: "GET",
            headers: {'thisisajax': 'thisisajax'},
            url: url,
            success: (r) => ($('.cantbtn').removeClass('disabled'))
        });
        if(nueva_cant == 0) {
            setTimeout(function() {window.location.reload();}, 500)
        }
    }
}

function limpiar_carrito() {
    $.ajax({
        url: '/carro/limpiar/',
        type: "GET"
    });
    setTimeout(function() {window.location.reload();}, 500)
}
var first = false;
function apply_discount() {
    $.ajax({
        url: '/get/descuento/' + $('#code').val(),
        type: "GET",
        success: function(data) {
            descuentototal = data.porcentaje;
            if (descuentototal == 0) {
                $('#descount').html('<center><p class="bg-danger rounded-pill p-3">No se ha encontrado descuento.</p></center>');
            }
            else {
                $('#descount').html('Se aplicara un descuento del ' + data.porcentaje + '% en el total de la compra.');
                var total = parseInt($('#totalprevio')[0].innerHTML);
                var apagar = parseInt($('#total')[0].innerHTML);
                var descuento = parseInt($('#descuentoresta')[0].innerHTML);
                var descuentoaplicado = parseInt(data.porcentaje)/100;
                $('#descuentoresta').html(parseInt(descuento + total*descuentoaplicado));
                $('#total').html(total - parseInt($('#descuentoresta').html()));

                $('#descountbtn').addClass('disabled');
                $('.cantbtn').addClass('disabled');
            }
        },
        error: function() {
            $('#descount').html('<center><p class="bg-danger rounded-pill p-3">No se ha encontrado descuento.</p></center>');
        }
    });
}

window.addEventListener('load', function() {
    var cerrar_sesion = document.getElementById('deslogearse');
    cerrar_sesion.addEventListener('click', function() {
        var cookies_array = document.cookie.split(';');
        var cookies_dict = [];
        var csrftoken;
        cookies_array.forEach(elem => {
            var temp = elem.split('=');
            cookies_dict.push({
                key: temp[0],
                value: temp[1]
            });
        })
        cookies_dict.forEach(elem => {
            if(elem.key == 'csrftoken') {
                csrftoken = elem.value;
            }
        })
        $.ajax({
            type: 'POST',
            url: '/post/logout/',
            data: {csrfmiddlewaretoken: csrftoken},
            success: function() {
                setTimeout(function() {
                    location.reload();
                }, 500);
            },
            error: function() {
                alert('error');
            }
        })
    }, false);
    if ($('#vacio').length) {
        $('#comprar-btn').addClass('disabled');
    }
    $.ajax({
        url: '/get/descuento/null/',
        type: "GET",
    })
}, false);