// Cambio de menu
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const portadaInicio = document.querySelectorAll('.portada');
const accountDetails = document.querySelector('.account-details');
const carritoDetails = document.querySelector('.carrito-details');
const precioDetails = document.querySelector('#precioTotal');
const compraDetails = document.querySelector('.compraya');

var activeUser = '';
var precio = 0;

const setupUi = (user) => {
    if (user) {
        // Informacion de usuario
        db.collection('users').doc(user.uid).get().then(doc => {
            activeUser = user.uid;
        if (typeof(accountDetails) != 'undefined' && accountDetails != null)
        {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>Dirección: ${doc.data().direccion}</div>
            <div>Código Postal: ${doc.data().cp}</div>
            `;
        accountDetails.innerHTML = html;
        setupCarrito(function() {
            console.log("SetupCarrito completed");
        });
        }
        });
        
        
        // Menu de usuario conectado
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // Quitar informacion de usuario
        accountDetails.innerHTML = '';
        // Menu de usuario desconectado
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  });

function setupCarrito(_callback){
    console.log(activeUser);
    var docRef = db.collection('users').doc(activeUser);
    precio = 0;
    docRef.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());
            const userData = doc.data();
        var prodCarrito = userData.carrito.split(" ");
        prodCarrito.shift();
        var html = '';
        var html2 = '';
        precioDetails.innerHTML = html2;
        carritoDetails.innerHTML = html;
        if(prodCarrito.length == 0) {
            console.log('No matching documents.');
            return;
        }
        prodCarrito.forEach(prod => {
            console.log(prod);
            let docRef = db.collection('productos');
         let query = docRef.doc(prod).get()
         .then(doc => {
               
                var datos = doc.data();
                precio += datos.precio;
                    console.log(doc.data(), precio);
                html += `<div>${datos.nombre}; precio: ${datos.precio}€</div>
                <button onclick="resCarro(\'${doc.id}\')" class="btn btn-danger botCompras" role="button">Eliminar</button>
                        `;
                        carritoDetails.innerHTML = html;
            
            
        }).then(() => {

            html2 = `<div id="precioTotal">Precio total: ${precio}€</div>`
            precioDetails.innerHTML = html2;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    });
            console.log(precio);
                } else {
                    return;
                }
            });
                _callback();
}

