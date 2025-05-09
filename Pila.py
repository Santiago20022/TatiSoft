class Pila:
    def __init__(self) -> None:
        self.cab = None
        self.fin = None
        
    
    def estaVacia(self):
        return self.cab == None
    
    
    def apilar(self, valor):
        nodo = nodo(valor)
        if self.estaVacia():
            self.cab = nodo
            self.fin = nodo
        else:
            nodo.sig = self.cab
            self.cab = nodo
            
            
    # Mostrar pila no es una fuincion oficial
    
    def mostrarPila(self):
        actual = self.cab
        print('tope')
        while actual != None:
            print(actual.valor)
            actual =actual.sig
        print('base')
            
    
    def tope(self):
        return self.cab
            
    
    def desapilar(self):
        if self.estaVacia():
            return None
        
        eliminado = self.cab
        
        if self.cab == self.fin:
            self.cab = None
            self.fin = None
        else:
            self.cab = self.cab.sig # recorre una lista
            
            eliminado.sig = None #quitarlela colita al que ya esta eliminado
            return eliminado.valor
        
    def eliminarPorValor(self, valor):
        while valor == valor:
            self.desapilar()
            
            