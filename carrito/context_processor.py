def total_carro(request):
    total = 0
    if 'usuario' in request.session:
        sus = 5 if request.session['usuario']['suscripcion'] else 0
        try:
            for key, value in request.session["carro"].items():
                total = total+int(value["precio"])
        except KeyError:
            request.session['carro']={}
            total = 0
        if 'descount' not in request.session:
            request.session['descount'] = sus
        sustraer = 0
    else:
        sustraer, sus = (0, 0)
    return {'total':int(total), "total_carro":int(total - sustraer), 'sustraer': sustraer}