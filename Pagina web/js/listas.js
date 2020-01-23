// datos
const productosList = document.querySelector('.productos');

function ponerX(tipo){
    portadaInicio.forEach(item => item.style.display = 'none');
db.collection('productos').where('tipo','==',tipo).onSnapshot(snapshot => {
    setupComponentes(snapshot.docs);
});
}

const setupComponentes = (data) => {

    let html = '';
    productosList.innerHTML = '';
    data.forEach(doc => {
       const comp = doc.data();
       const li = `
       <div class="contenedor">
            <div class="contenedor_imagen">
                <img src="../img/productos/${comp.tipo}/${comp.foto}"></img>      
            </div>

            <div class="contenedor_texto">
                <div class="contenedor_titulo">
                    <h3>${comp.nombre}
                </div>
                ${comp.descripcion}
            </div>

            <div class="contenedor_precio">
                <p><b>Precio: ${comp.precio}€</b>
            </div>

            <div class="contenedor_boton">
                <button onclick="sumCarro(\'${doc.id}\')" class="btn btn-danger botCompras" role="button" id="botC">Añadir al carrito</button>
            </div>
        </div>
       `;
       html += li;
    });

    productosList.innerHTML = html;
}


function hola(){
    console.log(activeUser);
}

function sumCarro(id){
    if(activeUser == ""){ return;}
    var docRef = db.collection('users').doc(activeUser);

docRef.get().then(function(doc) {
    if (doc.exists) {
        //console.log("Document data:", doc.data());
        const userData = doc.data();
    var nuevoCarrito = userData.carrito + " " + id;
    db.collection('users').doc(activeUser).update({
        carrito: nuevoCarrito
    });
    setupCarrito(function() {
        console.log("SetupCarrito completed");
    });
    } else {
        return;
    }
});
    
}

function resCarro(id){
    if(activeUser == ""){ return;}
    var docRef = db.collection('users').doc(activeUser);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log(id);
        const userData = doc.data();
    var nuevoCarrito = userData.carrito.replace(' ' + id,'');
    db.collection('users').doc(activeUser).update({
        carrito: nuevoCarrito
    });
    setupCarrito(function() {
        console.log("SetupCarrito completed");
    });
    } else {
        return;
    }
});
}

function principal(){
    portadaInicio.forEach(item => item.style.display = 'block');
    productosList.innerHTML = '';
}