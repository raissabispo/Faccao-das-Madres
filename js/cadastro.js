function enviar(event) {
    event.preventDefault(); 
  
    let email = document.getElementById('email').value.trim();
    let senha = document.getElementById('senha').value.trim();
  
    let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '' || senha === '') {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return false;
    } 
    
    if (!emailValido.test(email)) {
        alert('Por favor, insira um e-mail válido!');
        return false;
    }
  
    alert('Cadastro realizado com sucesso!'); 
    window.location.href = "/telas/telaInicial.html";
    

    return true;
}

document.getElementById('senhaMostrar').addEventListener('change', function () {
    let senhaInput = document.getElementById('senha');
    senhaInput.type = this.checked ? 'text' : 'password';
});
