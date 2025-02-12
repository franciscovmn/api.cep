document.querySelector("#cep").addEventListener("blur", async function () {
    let cep = this.value.replace(/\D/g, ""); 
    let cepInput = document.getElementById("cep");
    let errorMessage = document.getElementById("cepError");
<<<<<<< HEAD:js/script.js

    if (!errorMessage) return; // Garante que o elemento de erro existe
=======
    let loadingField = document.querySelector('img#loading');

    if (!errorMessage) return;
>>>>>>> ae484cb (invalida):script.js

    if (cep === "") {
        errorMessage.classList.add("hidden");
        cepInput.style.border = "1px solid #ccc";
        document.getElementById("rua").value = "";
        document.getElementById("numero").value = "";
        document.getElementById("bairro").value = "";
        document.getElementById("cidade").value = "";
        document.getElementById("estado").value = "";
        return;
    }
    
    if (cep.length !== 8) {
<<<<<<< HEAD:js/script.js
        errorMessage.classList.remove("hidden"); // Exibe a mensagem de erro
        cepInput.style.border = "2px solid red"; // Deixa as bordas em vermelho
        errorMessage.style.color = "red"; // Deixa o texto em vermelho
        return; // Para a execução se o CEP for inválido
    }

    try {
        let api = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // api do cep para consulta, onde o cep do usuario vai ficar na $
        let data = await api.json(); // extrair as informações que estao em json, para ser legivel para se utilizar
=======
        errorMessage.classList.remove("hidden");
        cepInput.style.border = "2px solid red";
        errorMessage.style.color = "red";
        return;
    }

    try {
        // Exibe o spinner ao iniciar a consulta
        loadingField.classList.remove("hidden");
>>>>>>> ae484cb (invalida):script.js

        let api = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let data = await api.json();

        if (data.erro) {
            errorMessage.textContent = "CEP não encontrado!";
            errorMessage.classList.remove("hidden");
            cepInput.style.border = "2px solid red";
            errorMessage.style.color = "red";
            return;
        }

        errorMessage.classList.add("hidden");
        cepInput.style.border = "1px solid #ccc";

        document.getElementById("rua").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("estado").value = data.uf || "";
<<<<<<< HEAD:js/script.js
    } catch (error) { // Caso ocorra erro na consulta
=======
    } catch (error) {
>>>>>>> ae484cb (invalida):script.js
        errorMessage.textContent = "Erro ao consultar o CEP!";
        errorMessage.classList.remove("hidden");
        cepInput.style.border = "2px solid red";
        errorMessage.style.color = "red";
    } finally {
        // Oculta o spinner ao finalizar a consulta (com ou sem sucesso)
        loadingField.classList.add("hidden");
    }
});
