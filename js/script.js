document.querySelector("#cep").addEventListener("blur", async function () {
    let cep = this.value.replace(/\D/g, ""); 
    let cepInput = document.getElementById("cep");
    let errorMessage = document.getElementById("cepError");

    if (!errorMessage) return; // Garante que o elemento de erro existe

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
        errorMessage.classList.remove("hidden"); // Exibe a mensagem de erro
        cepInput.style.border = "2px solid red"; // Deixa as bordas em vermelho
        errorMessage.style.color = "red"; // Deixa o texto em vermelho
        return; // Para a execução se o CEP for inválido
    }

    try {
        let api = await fetch(`https://viacep.com.br/ws/${cep}/json/`); // api do cep para consulta, onde o cep do usuario vai ficar na $
        let data = await api.json(); // extrair as informações que estao em json, para ser legivel para se utilizar
        
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
    } catch (error) { // Caso ocorra erro na consulta
        errorMessage.textContent = "Erro ao consultar o CEP!";
        errorMessage.classList.remove("hidden");
        cepInput.style.border = "2px solid red";
        errorMessage.style.color = "red";
    };
});
