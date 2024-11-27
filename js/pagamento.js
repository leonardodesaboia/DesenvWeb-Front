// pagamento.js
const API_BASE_URL = 'http://localhost:8080';

async function loadPaymentDetails() {
    try {
        // Pegar dados armazenados durante a criação da reserva
        const reservaId = localStorage.getItem('reservaId');
        const passeioId = localStorage.getItem('currentPasseioId');
        const token = localStorage.getItem('token');

        if (!token || !reservaId) {
            console.error('Informações necessárias não encontradas');
            return;
        }

        // Buscar detalhes do passeio
        const passeioResponse = await fetch(`${API_BASE_URL}/passeio/${passeioId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!passeioResponse.ok) {
            throw new Error('Erro ao carregar detalhes do passeio');
        }

        const passeio = await passeioResponse.json();

        // Buscar detalhes da reserva
        const reservaResponse = await fetch(`${API_BASE_URL}/reserva/${reservaId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!reservaResponse.ok) {
            throw new Error('Erro ao carregar detalhes da reserva');
        }

        const reserva = await reservaResponse.json();

        // Atualizar UI
        document.querySelector('.mb-5').textContent = `Finalizar Reserva - ${passeio.nome}`;
        document.getElementById('summary-adults').textContent = localStorage.getItem('adultsCount') || '1';
        document.getElementById('summary-adults-price').textContent = `R$ ${reserva.valor_total}`;
        document.getElementById('summary-time').textContent = passeio.hora;
        document.getElementById('summary-total').textContent = `R$ ${reserva.valor_total}`;

    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        alert('Erro ao carregar informações da reserva');
    }
}

async function checkPayment() {
    try {
        const reservaId = localStorage.getItem('reservaId');
        const token = localStorage.getItem('token');

        if (!reservaId || !token) {
            throw new Error('Informações necessárias não encontradas');
        }

        console.log('Confirmando pagamento para reserva:', reservaId);

        const response = await fetch(`${API_BASE_URL}/reserva/confirmar/${reservaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao confirmar pagamento');
        }

        alert('Pagamento confirmado com sucesso! Você receberá um e-mail com os detalhes da sua reserva.');
        
        // Limpar dados da reserva do localStorage
        localStorage.removeItem('reservaId');
        localStorage.removeItem('currentPasseioId');
        localStorage.removeItem('adultsCount');
        localStorage.removeItem('selectedDate');

        window.location.href = 'ResumoPedido.html';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao confirmar pagamento: ' + error.message);
    }
}

function copyPixCode() {
    const pixInput = document.querySelector('.input-group input');
    pixInput.select();
    document.execCommand('copy');
    
    const copyButton = document.querySelector('.copy-button');
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = '<i class="fas fa-check me-2"></i>Copiado!';
    setTimeout(() => {
        copyButton.innerHTML = originalText;
    }, 2000);
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', loadPaymentDetails);

// Exportar funções para uso global
window.checkPayment = checkPayment;
window.copyPixCode = copyPixCode;