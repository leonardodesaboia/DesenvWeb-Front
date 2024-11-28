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

        // Update page title
        document.title = `BM Turismo - Pagamento - ${passeio.nome}`;
        document.querySelector('.mb-5').textContent = `Finalizar Reserva - ${passeio.nome}`;

        // Update passeio name
        document.getElementById('passeio-name').textContent = passeio.nome;

        // Update adults count
        document.getElementById('summary-adults').textContent = localStorage.getItem('adultsCount') || '1';

        // Update price per person
        document.getElementById('summary-adults-price').textContent = `R$ ${parseFloat(passeio.valor).toFixed(2)}`;

        // Update selected date
        document.getElementById('summary-time').textContent = localStorage.getItem('selectedDate') || '01-01-2024';

        // Update total
        document.getElementById('summary-total').textContent = "R$" + localStorage.getItem('totalPrice') || 'R$ 0.00';

    } catch (error) {
        console.error('Erro ao carregar detalhes do pagamento:', error);    
    }
}

async function confirmarReserva(id) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/reserva/confirmar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Resposta do servidor:', errorText);
            throw new Error(errorText || 'Erro ao confirmar reserva');
        }

        const responseData = await response.json();
        console.log('Resposta sucesso:', responseData);
        return responseData;
    } catch (error) {
        console.error('Erro detalhado:', error);
        throw error;
    }
}

function copyPixCode() {
    const pixCodeInput = document.querySelector('.form-control[value="00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000"]');
    if (pixCodeInput) {
        pixCodeInput.select();
        document.execCommand('copy');
        alert('Código PIX copiado para a área de transferência!');
    }
}

document.getElementById('confirm-payment').addEventListener('click', async () => {
    const reservaId = localStorage.getItem('reservaId'); // Mudança aqui: usando reservaId em vez de currentPasseioID
    if (reservaId) {
        try {
            await confirmarReserva(reservaId);
            console.log('Reserva confirmada com sucesso!');
            window.location.href = 'ResumoPedido.html';
        } catch (error) {
            console.error('Erro ao confirmar reserva:', error);
            alert('Erro ao confirmar reserva: ' + error.message); // Adicionado feedback ao usuário
        }
    } else {
        console.error('ID da reserva não encontrado no localStorage');
        alert('ID da reserva não encontrado. Por favor, tente novamente.'); // Adicionado feedback ao usuário
    }
});

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', loadPaymentDetails);

// Export functions for global use
window.copyPixCode = copyPixCode;