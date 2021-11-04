jQuery(document).ready(function( $ ) {
  
});


//calculando y mostrando parte riego
function calcularriego () {
    let parametro1 =parseInt( prompt ("Ingrese el tamaño de su maceta en litros"));

    let parametro2 =parseInt( prompt ("Ingrese la altura de su planta en centimetros"))
    
    
    let resultado1 = 0;
    
    let resultado2 = 0;
    
    function sumar (parametro1, parametro2,) {
    
    resultado1 = parametro1 + parametro2; 
    
    }
    
    function dividir () {
    
    resultado2 = resultado1 / 40;
    
    }
    
    function mostrar () {
        let parrafo = document.createElement ("div");
        parrafo.innerHTML = "<h2>Deberias regar tu planta con" + "  " + resultado2 + "  " + "litros"
        document.getElementById("resultadoriego").appendChild (parrafo);
    }
    
    sumar (parametro1, parametro2,);
    dividir (resultado1, 40)
    mostrar (resultado2);
}


//Aca empieza el carrito de compras


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var sacarDelCarrito = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < sacarDelCarrito.length; i++) {
        var button = sacarDelCarrito[i]
        button.addEventListener('click', quitarItem)
    }

    var cantidadInputs = document.getElementsByClassName('cantidad-input')
    for (var i = 0; i < cantidadInputs.length; i++) {
        var input = cantidadInputs[i]
        input.addEventListener('change', cambiar)
    }

    var anadirAlCarro = document.getElementsByClassName('item-boton')
    for (var i = 0; i < anadirAlCarro.length; i++) {
        var button = anadirAlCarro[i]
        button.addEventListener('click', anadirClick)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    // alert("GRACIAS POR SU COMPRA")
    Swal.fire(
        'Gracias!',
        'por su compra',
        'success'
      )
    var cartItems = document.getElementsByClassName('items-carrito')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotal()
}

function quitarItem(event) {
    var botonClicked = event.target
    botonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function cambiar(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

function anadirClick(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('item-titulo')[0].innerText
    var price = shopItem.getElementsByClassName('item-precio')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-imagen')[0].src
    agregarItemACarro(title, price, imageSrc)
    updateTotal()
}

function agregarItemACarro(title, price, imageSrc) {
    var carrito = document.createElement('div')
    carrito.classList.add('carrito')
    var itemsCarrito = document.getElementsByClassName('items-carrito')[0]
    var nombreItems = itemsCarrito.getElementsByClassName('item-title')
    for (var i = 0; i < nombreItems.length; i++) {
        if (nombreItems[i].innerText == title) {
            // alert("Ya se encuentra en el carrito")
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ese elemento ya está en el carrito!',
                // footer: '<a href="">Why do I have this issue?</a>'
              })
            return
        }
    }
    var carritoContenido = `
        <div class="item columna">
            <img class="item-image" src="${imageSrc}" width="100" height="100">
            <span class="item-title">${title}</span>
        </div>
        <span class="precio columna">${price}</span>
        <div class="cantidad columna">
            <input class="cantidad-input" type="number" value="1">
            <button class="btn btn-danger" type="button">QUITAR</button>
        </div>`
    carrito.innerHTML = carritoContenido
    itemsCarrito.append(carrito)
    carrito.getElementsByClassName('btn-danger')[0].addEventListener('click', quitarItem)
    carrito.getElementsByClassName('cantidad-input')[0].addEventListener('change', cambiar)
}

function updateTotal() {
    var contenedorCarrito = document.getElementsByClassName('items-carrito')[0]
    var filasCarrito = contenedorCarrito.getElementsByClassName('carrito')
    var total = 0
    for (var i = 0; i < filasCarrito.length; i++) {
        var filaCarro = filasCarrito[i]
        var precioItem = filaCarro.getElementsByClassName('precio')[0]
        var cantidadItem = filaCarro.getElementsByClassName('cantidad-input')[0]
        var price = parseFloat(precioItem.innerText.replace('$', ''))
        var quantity = cantidadItem.value
        total = total + (price * quantity)
    }
    
    document.getElementsByClassName('total-carrito-precio')[0].innerText = '$' + total
}

