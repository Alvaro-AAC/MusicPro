class Carro:
    def __init__(self, request):
        self.request = request
        self.session = request.session
        carro = self.session.get("carro")
        if not carro:
            carro = self.session["carro"] = {}
        self.carro=carro
    
    def agregar(self,producto):
        if str(producto.id_producto) not in self.carro.keys():
            self.carro[producto.id_producto] = {
                "producto_id":producto.id_producto,
                "nombre":producto.nombre,
                "precio":str(producto.precio),
                "cantidad":1,
                "stock":producto.stock,
                "precioU": int(producto.precio)
            }
        else:
            for key, value in self.carro.items():
                if key == str(producto.id_producto):
                    value["cantidad"] = value["cantidad"]+1
                    value["precio"] = int(value["precio"])+producto.precio
                    break
        self.guardar_carro()

    def guardar_carro(self):
        self.session["carro"] = self.carro
        self.session.modified = True
    
    def eliminar(self,producto):
        producto.id_producto = str(producto.id_producto)
        if producto.id_producto in self.carro:
            del self.carro[producto.id_producto]
            self.guardar_carro()
    
    def restar_producto(self, producto):
        for key, value in self.carro.items():
            if key == str(producto.id_producto):
                value["cantidad"] = value["cantidad"]-1
                value["precio"] = int(value["precio"])-producto.precio
                if value["cantidad"] < 1:
                    self.eliminar(producto)
                break
        self.guardar_carro()
    
    def limpiar_carro(self):
        self.session["carro"] = {}
        self.session.modified = True
