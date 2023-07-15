from transbank.webpay.webpay_plus.transaction import Transaction

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

    if int(total-sustraer)>0:
        buy_order = str(500000)
        session_id = str(123)
        amount = int(total-sustraer)
        return_url = 'http://127.0.0.1:8000/comprar/'
        response = (Transaction()).create(buy_order, session_id, amount, return_url)
        return {'total':int(total), "total_carro":int(total - sustraer), 'sustraer': sustraer, 'wpurl':response['url'], 'wptoken':response['token']}
    else:
        return {'total':int(total), "total_carro":int(total - sustraer), 'sustraer': sustraer}
