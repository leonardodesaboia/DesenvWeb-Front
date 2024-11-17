document.addEventListener("DOMContentLoaded", function () {
    const reservas = [
        {
            id: 1,
            cliente: "João Silva",
            passeio: "Passeio nas Dunas",
            data: "2024-12-10",
            horario: "10:00",
            status: "Confirmado"
        },
        {
            id: 2,
            cliente: "Maria Oliveira",
            passeio: "Praia de Jericoacoara",
            data: "2024-12-15",
            horario: "08:00",
            status: "Confirmado"
        }
    ];

    const reservasBody = document.getElementById("reservas-body");

    // Função para renderizar as reservas
    function renderReservas() {
        reservasBody.innerHTML = ""; // Limpa o conteúdo existente
        reservas.forEach((reserva) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${reserva.id}</td>
                <td>${reserva.cliente}</td>
                <td>${reserva.passeio}</td>
                <td>${reserva.data}</td>
                <td>${reserva.horario}</td>
                <td class="${reserva.status === "Cancelado" ? "text-danger" : "text-success"}">${reserva.status}</td>
                <td>
                    <button class="btn btn-info btn-sm ver-mais-btn" data-id="${reserva.id}">Ver Mais</button>
                    <button class="btn btn-danger btn-sm cancelar-btn" data-id="${reserva.id}" ${reserva.status === "Cancelado" ? "disabled" : ""}>Cancelar</button>
                </td>
            `;
            reservasBody.appendChild(row);
        });

        // Adicionar eventos aos botões
        document.querySelectorAll(".ver-mais-btn").forEach(button => {
            button.addEventListener("click", function () {
                const reservaId = this.getAttribute("data-id");
                const reserva = reservas.find(r => r.id == reservaId);
                if (reserva) abrirDetalhesReserva(reserva);
            });
        });

        document.querySelectorAll(".cancelar-btn").forEach(button => {
            button.addEventListener("click", function () {
                const reservaId = this.getAttribute("data-id");
                cancelarReserva(reservaId);
            });
        });
    }

    // Função para abrir detalhes do passeio
    function abrirDetalhesReserva(reserva) {
        const productPageHTML = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${reserva.passeio}</title>
            <link rel="stylesheet" href="css/bootstrap.min.css">
            <link rel="stylesheet" href="css/PaginaProduto.css">
        </head>
        <body>
            <header>
                <nav class="navbar navbar-expand-lg navbar-light bg-white px-4">
                    <a class="navbar-brand" href="#">BM Turismo</a>
                </nav>
            </header>
            <main class="container my-5">
                <h1 class="text-primary">${reserva.passeio}</h1>
                <p><strong>Cliente:</strong> ${reserva.cliente}</p>
                <p><strong>Data:</strong> ${reserva.data}</p>
                <p><strong>Horário:</strong> ${reserva.horario}</p>
                <p><strong>Status:</strong> ${reserva.status}</p>
            </main>
            <footer class="text-center py-3 bg-light">
                <p>© 2024 BM Turismo. Todos os direitos reservados.</p>
            </footer>
        </body>
        </html>
        `;

        const newWindow = window.open("", "_blank");
        newWindow.document.write(productPageHTML);
        newWindow.document.close();
    }

    // Função para cancelar uma reserva
    function cancelarReserva(reservaId) {
        const confirmacao = confirm("Você tem certeza que deseja cancelar esta reserva?");
        if (confirmacao) {
            const reserva = reservas.find(r => r.id == reservaId);
            if (reserva) {
                reserva.status = "Cancelado"; // Atualiza o status para "Cancelado"
                alert("Reserva marcada como cancelada.");
                renderReservas(); // Re-renderiza a tabela com o novo status
            }
        }
    }

    // Renderizar reservas ao carregar a página
    renderReservas();
});

document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logout-btn");

    // Redirecionar para a página index.html ao clicar em "Sair"
    logoutBtn.addEventListener("click", function () {
        window.location.href = "index.html"; // Substitua pelo caminho correto, se necessário
    });
});

