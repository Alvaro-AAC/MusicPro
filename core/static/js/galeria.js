$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
    $('#selectorCurrency').on('change', function() {
        location.replace(window.location.pathname + '?currency=' + this.value);
    });
});

function addParamDos(param) {
    const urlParams = new URLSearchParams(window.location.search)
    var url = window.location.pathname;
    for (const [key, value] of urlParams.entries()) {
        if(key == 'uno') {
            var uno = value;
            var isUno = true;
        }
        if(key == 'dos') {
            var dos = value;
            var isDos = true;
        }
        if(key == 'tres') {
            var tres = value;
            var isTres = true;
        }
    }
    if(isUno) {
        url+='?uno=' + uno;
        url+='&dos=' + encodeURIComponent(param);
    }
    location.replace(url);
}

function addParamUno(param) {
    var url = window.location.pathname;
    url+='?uno=' + encodeURIComponent(param);
    location.replace(url);
}

function addParamTres(param) {
    const urlParams = new URLSearchParams(window.location.search)
    var url = window.location.pathname;
    for (const [key, value] of urlParams.entries()) {
        if(key == 'uno') {
            var uno = value;
            var isUno = true;
        }
        if(key == 'dos') {
            var dos = value;
            var isDos = true;
        }
        if(key == 'tres') {
            var tres = value;
            var isTres = true;
        }
    }
    if(isUno) {
        url+='?uno=' + uno;
        if(isDos){
            url+='&dos=' + dos;
            url+='&tres=' + encodeURIComponent(param);
        }
    }
    location.replace(url);
}

function eliminarFiltro() {
    location.replace(window.location.pathname);
}


function eliminarUltimoFiltro() {
    const urlParams = new URLSearchParams(window.location.search)
    var url = window.location.pathname;
    for (const [key, value] of urlParams.entries()) {
        if(key == 'uno') {
            var uno = value;
            var isUno = true;
        }
        if(key == 'dos') {
            var dos = value;
            var isDos = true;
        }
        if(key == 'tres') {
            var tres = value;
            var isTres = true;
        }
    }
    if(isDos) {
        url+='?uno=' + uno;
        if(isTres){
            url+='&dos=' + dos;
        }
    }
    location.replace(url);
}

function abrirModal(id) {
    $('#' + id).modal('show');
}