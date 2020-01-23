// Función de compra en el carrito

function compra(){
    portadaInicio.forEach(item => item.style.display = 'none');
    const modalL = document.querySelector('#modal-carrito');
        M.Modal.getInstance(modalL).close();
    
        var html = '';
        var html3 = '';
        var docRef = db.collection('users').doc(activeUser);
        var precio = 0;
        var vector = [""];

    docRef.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            const userData = doc.data();
        var prodCarrito = userData.carrito.split(" ");
        prodCarrito.shift();
        productosList.innerHTML = html;
        if(prodCarrito.length == 0) return;
        html += ` 
            <div class="contenedor_compra">
                <div class="compra_titulo">
                    <h2> Tramitar pedido (${prodCarrito.length} productos) </h2>
                    <hr class="linea">
                </div>
        `;

        html += ` 
            <div class="contenedor_direccion">
                <p class="tamaño"><b> 1º. Dirección de envío
                <p class="texto">Correo electrónico: ${userData.email}
                <p class="texto">Direccion de residencia: ${userData.direccion}
                <p class="texto">Código postal: ${userData.cp}
            </div>
            <hr class="linea">  
        `;

        html += `
            <p class="tamaño2"><b> 2º. Revisar productos y opciones de envío
            <hr>
        `;
        
        prodCarrito.forEach(function(prod,idx,array) {
            console.log(prod);
            let docRef = db.collection('productos');
            let query = docRef.doc(prod).get().then(docs => {
                var datos = docs.data();
                precio += datos.precio;
                console.log(docs.data(), precio);
                html += `
                    <li>
                        <div class="compra_producto">
                            <div class="compra_imagen">
                                <img src="../img/productos/${datos.tipo}/${datos.foto}"></img>
                            </div>

                            <div class="compra_texto_titulo">
                                ${datos.nombre}
                            </div>

                            <div class="compra_texto">
                                <p>${datos.texto}
                                <br><br><b>Precio</b>: ${datos.precio}€
                            </div>
                        </div>
                        <hr>
                    </li>
                `;
                       
            
        }).then(() => {
            if (idx === array.length - 1){ 
            console.log(html);
            html += `
                <hr class="linea"> 
                <p class="tamaño2"><b> 3º. Metodos de pago y envio
                <div class="compra_pago">
                    <div>Precio total: ${precio}€</div>
                        <form>Tarjeta de crédito:
                            <input type="text" name="tajeta"><br>CCV:
                            <input type="text" name="ccv">
                        </form>
                        
                        <button onclick="clearCarrito()" class="btn" role="button" id="boton-compra"><b>Tramitar pedido</button>

                        <div class="pago_fecha">
                            <div class="checkbox">
                                <br>Elija una opcion de envio:
                                <form action="">
                                    <input type="checkbox" id="normal" name="normal">
                                    <label for="normal">Envio normal.<br> Plazo de entrega 15 - 20 días</label>

                                    <input type="checkbox" id="premium" name="normal">
                                    <label for="premium">Envio premium. <br>Plazo de entrega 3-7 días</label>
                                </form>
                            </div>
                        </div>

                        <img src="img/otros/badges2.png" id="compraArriba2"></img>
                </div>
            `;
        productosList.innerHTML = html; 
            } 
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    });
                } else {
                    return;
                }   
            });

    
}

function clearCarrito(){
    if(activeUser == ""){ return;}
    alert("Gracias por su compra!");
    console.log(activeUser);
    db.collection('users').doc(activeUser).update({
        carrito: ''
    }).then(() => {
        setupCarrito(function() {
           console.log("SetupCarrito completed");
    });
    
            window.location.reload();   
    });   
}