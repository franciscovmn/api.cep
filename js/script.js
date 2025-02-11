document.querySelector("#cep").addEventListener("blur", async function () {
    // Remove caracteres não numéricos
    let cep = this.value.replace(/\D/g, ""); 
    let cepInput = document.getElementById("cep");
    let errorMessage = document.getElementById("cepError");

    if (!errorMessage) return; // Garante que o elemento de erro existe

    // Se o campo estiver vazio, esconde a mensagem de erro e deixa o campo do cep normal
    if (cep === "") {
        errorMessage.classList.add("hidden"); // Esconde a mensagem
        cepInput.style.border = "1px solid #ccc"; // Restaura a borda
                // Esvazia os campos caso nao tenho nada no cep
                document.getElementById("rua").value = "";
                document.getElementById("numero").value = "";
                document.getElementById("bairro").value = "";
                document.getElementById("cidade").value = "";
                document.getElementById("estado").value = "";
        return;
    }
    
    if (cep.length !== 8) {
        errorMessage.classList.remove("hidden"); // Exibe a mensagem de erro
        cepInput.style.border = "2px solid red"; // Deixa as bordas em vermelho
        errorMessage.style.color = "red"; // Deixa o texto em vermelho
        return; // Para a execução se o CEP for inválido
    }

    try {
        let api = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // api do cep para consulta, onde o cep do usuario vai ficar na $
        let data = await api.json(); // extrair as informações que estao em json, para ser legivel para se utilizar

        if (data.erro) { // CEP não encontrado
            errorMessage.textContent = "CEP não encontrado!"; // mensagem de erro
            errorMessage.classList.remove("hidden"); // Exibe a mensagem de erro
            cepInput.style.border = "2px solid red"; 
            errorMessage.style.color = "red"; // Deixa o texto em vermelho
            return;
        }

        // Se não houver erro, esconde a mensagem e restaura o estilo padrao
        errorMessage.classList.add("hidden");
        cepInput.style.border = "1px solid #ccc";

        // Preenche os campos do formulário, deixando o numero em aberto para ser preenchido pelo usuario
        document.getElementById("rua").value = data.logradouro || "";
        document.getElementById("bairro").value = data.bairro || "";
        document.getElementById("cidade").value = data.localidade || "";
        document.getElementById("estado").value = data.uf || "";
    } catch (error) { // Caso ocorra erro na consulta
        errorMessage.textContent = "Erro ao consultar o CEP!";
        errorMessage.classList.remove("hidden"); // Exibe a mensagem de erro
        cepInput.style.border = "2px solid red";
        errorMessage.style.color = "red"; // Deixa o texto em vermelho
    }
});
