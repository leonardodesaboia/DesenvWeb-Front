document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("admin-login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); 
        const username = document.getElementById("admin-username").value;
        const password = document.getElementById("admin-password").value;

      
        const validAdmins = [
            { username: "admin", password: "1234" },
            { username: "gerente", password: "5678" }
        ];

        const isValid = validAdmins.some(
            admin => admin.username === username && admin.password === password
        );

        if (isValid) {
            alert("Login realizado com sucesso!");
            window.location.href = "paginaADM.html"; // Redireciona para o painel ADM
        } else {
            alert("Usuário ou senha inválidos.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const usernameField = document.getElementById("admin-username");
    const passwordField = document.getElementById("admin-password");

    // Função para adicionar/remover classe 'filled'
    function toggleFilledClass(field) {
        if (field.value.trim() !== "") {
            field.classList.add("filled");
        } else {
            field.classList.remove("filled");
        }
    }

    // Monitorar alterações nos campos
    usernameField.addEventListener("input", function () {
        toggleFilledClass(usernameField);
    });

    passwordField.addEventListener("input", function () {
        toggleFilledClass(passwordField);
    });
});
