// pagamento.js
const API_BASE_URL = 'http://localhost:8080';

async function loadPaymentDetails() {
    try {
        const passeioId = localStorage.getItem('currentPasseioId');
        const token = localStorage.getItem('token');

        if (!passeioId || !token) {
            console.error('ID do passeio ou token não encontrado');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/passeio/${passeioId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar dados do passeio');
        }

        const passeio = await response.json();
        console.log('Dados do passeio:', passeio);

        // Atualizar título da página
        document.title = `BM Turismo - Pagamento - ${passeio.nome}`;
        document.querySelector('.mb-5').textContent = `Finalizar Reserva - ${passeio.nome}`;

        // Nome do passeio
        document.getElementById('passeio-name').textContent = passeio.nome;

        // Quantidade de adultos
        document.getElementById('summary-adults').textContent = localStorage.getItem('adultsCount') || '1';

        // Preço por pessoa
        document.getElementById('summary-adults-price').textContent = `R$ ${parseFloat(passeio.valor).toFixed(2)}`;

        // Horário
        document.getElementById('summary-time').textContent = localStorage.getItem('selectedDate') || '01-01-2024';

        // Total
        document.getElementById('summary-total').textContent = "R$" + localStorage.getItem('totalPrice') || 'R$ 0.00';

    } catch (error) {
        console.error('Erro ao carregar detalhes do pagamento:', error);    
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', loadPaymentDetails);

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', loadPaymentDetails);

// Exportar funções para uso global
window.checkPayment = checkPayment;
window.copyPixCode = copyPixCode;