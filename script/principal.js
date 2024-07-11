import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
// Importações direto do firebase, assim como é usado na documentação
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCoT5t5tA2V_y2jr1DqGeQgEbpTPik9_kQ",
    authDomain: "projeto-testes-e2ce5.firebaseapp.com",
    projectId: "projeto-testes-e2ce5",
    storageBucket: "projeto-testes-e2ce5.appspot.com",
    messagingSenderId: "538778021372",
    appId: "1:538778021372:web:a43752610fbebd11db9679",
    measurementId: "G-S3P5JKT5PT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const email = document.getElementById('email');
const senha = document.getElementById('senha');
const botaoEntrar = document.getElementById('entrar');
const botaoCadastrar = document.getElementById('cadastrar');
const aviso = document.getElementById('messagem-aviso');
const caracteresParaSenha = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
const caracteresParaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const InfomacoesUsuario = document.getElementById('informacoes-usuario');

function avisoMensagem(mensagem, cor){
    aviso.textContent = mensagem;
    aviso.style.color = cor;
};

function verificarSeEmailJaExiste(){
/*  Esse metodo do firebase só funciona se tiver await e async.
    Como ainda não aprendi direito, vai ficar sem funcionar.
    
    const arrayUsuario = fetchSignInMethodsForEmail(auth, email.value);
    if(arrayUsuario.length > 0){ //Se o array não estiver vazio o email está registrado.
        return true; // Email já resgistrado.
    } else {
        return false;
    }  
        */
    
    return true; //Só para funcionar temporariamente.

}

onAuthStateChanged(auth, function(user){ //exibir nome de usuario
    if(user){
        (user.displayName === null) ? InfomacoesUsuario.innerHTML = user.email : InfomacoesUsuario.innerHTML = user.displayName;
    }
});

function verificarSeCredenciaisSaoValidas(){
    let senhaCaracteresValidos = caracteresParaSenha.test(senha.value);
    let emailCaracteresValidos = caracteresParaEmail.test(email.value);
    return(senha.value.length >= 6 && senha.value.length <= 10 && senhaCaracteresValidos && emailCaracteresValidos);
}

function validarCadastro(){
    if(verificarSeCredenciaisSaoValidas()){
        if(verificarSeEmailJaExiste()){
            createUserWithEmailAndPassword(auth, email.value, senha.value);
            email.value = '';
            senha.value = '';
        } else {
            throw new Error('Email já está cadastrado, tente entrar.');
        }
        
    } else {
        throw new Error('Não foi possivel criar o usuario. Verifique a se a senha e o email são validos.');
    }
}

function validarEntrada(){
    if(verificarSeCredenciaisSaoValidas()){
        if(verificarSeEmailJaExiste()){
            signInWithEmailAndPassword(auth, email.value, senha.value)
           console.log('usuario logado');
           //window.location.href = 'home.html';
           email.value = '';
           senha.value = '';
        } else {
            throw new Error('Email não está cadastrado. tente se cadastrar.');
        }
    } else {
        throw new Error('Não foi possivel criar o usuario. Verifique a se a senha e o email são validos.');
    }
}

botaoCadastrar.addEventListener('click', () => {
    try{
        validarCadastro();
    } catch(error){
        console.error('Erro capturado:', error.message);
        avisoMensagem(error.message, 'red');
    }
});

botaoEntrar.addEventListener('click', () => {
    try {
        validarEntrada();
    } catch(error){
        console.error('Erro capturado:', error.message);
        avisoMensagem(error.message, 'red');
    }
})