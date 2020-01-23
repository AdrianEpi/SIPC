// Cambios de identificacion
auth.onAuthStateChanged(user => {
    if (user) {
        setupUi(user);
    } else {
        setupUi()
    }
});


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    // evita refrescar la pagina
    e.preventDefault();

    // informacion de usuario
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // Anyadir usuario
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            email: signupForm['signup-email'].value,
            direccion: signupForm['signup-direccion'].value,
            cp: signupForm['codigo-postal'].value,
            carrito: ""
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    // evita refrescar la pagina
    e.preventDefault();

    // informacion del usuario
    const emailL = loginForm['login-email'].value;
    const passwordL = loginForm['login-password'].value; 

    auth.signInWithEmailAndPassword(emailL, passwordL).then(cred => {
        // reiniciar el formulario
        const modalL = document.querySelector('#modal-login');
        M.Modal.getInstance(modalL).close();
        loginForm.reset();
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    activeUser = '';
    auth.signOut();
});