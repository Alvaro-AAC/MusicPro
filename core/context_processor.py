from .models import Macro_Categoria, Mid_Categoria, Micro_Categoria

def tipos_productos(request):
    dictionary = dict()
    dictionary['navbarprods'] = {}
    macros = Macro_Categoria.objects.all()
    mids = Mid_Categoria.objects.all()
    micros = Micro_Categoria.objects.all()
    for macro in macros:
        dictionary['navbarprods'][macro.__str__()] = {}
        for mid in mids.filter(macro_categoria = macro):
            dictionary['navbarprods'][macro.__str__()][mid.__str__()] = [micro.__str__() for micro in micros.filter(mid_categoria = mid)]
    return dictionary