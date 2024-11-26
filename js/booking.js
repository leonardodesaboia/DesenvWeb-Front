// booking.js
let adultsCount = 1;
const PRICE_PER_PERSON = 180.00;

async function bookTour() {
    // booking.js
let adultsCount = 1;
const PRICE_PER_PERSON = 180.00;

async function bookTour() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Por favor, faça login primeiro');
            window.location.href = '/login.html';
            return;
        }

        const selectedDate = document.querySelector('input[name="tourTime"]:checked');
        if (!selectedDate) {
            alert('Por favor, selecione uma data para o passeio');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Erro: ID do usuário não encontrado');
            return;
        }

        const totalPrice = adultsCount * PRICE_PER_PERSON;
        const reservaData = {
            id_passeio: 1,
            id_cliente: parseInt(userId),
            valor_total: totalPrice,
            data: selectedDate.value
        };

        console.log('Enviando dados da reserva:', reservaData);

        const response = await fetch('http://localhost:8080/reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reservaData)
        });

        const data = await response.json();
        console.log('Resposta da criação da reserva:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao criar reserva');
        }

        // Armazenar os dados da reserva - usando ID_reserva conforme backend
        localStorage.setItem('reservaId', data.ID_reserva); // Ajustado para maiúsculo
        localStorage.setItem('adultsCount', adultsCount.toString());
        localStorage.setItem('selectedDate', selectedDate.value);
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));

        console.log('Dados salvos:', {
            reservaId: data.ID_reserva,
            adultsCount,
            selectedDate: selectedDate.value,
            totalPrice
        });

        window.location.href = 'PaginaPagamento.html';
    } catch (error) {
        console.error('Erro completo:', error);
        alert('Erro ao fazer reserva: ' + error.message);
    }
}
}


function incrementAdults() {
    if (adultsCount < 8) {
        adultsCount++;
        updateUI();
    }
}

function decrementAdults() {
    if (adultsCount > 1) {
        adultsCount--;
        updateUI();
    }
}

function updateUI() {
    const countInput = document.getElementById('adultsCount');
    if (countInput) {
        countInput.value = adultsCount;
        updateTotalPrice();
    }
}

export function updateTotalPrice() {
    const total = adultsCount * PRICE_PER_PERSON;
    const totalElement = document.getElementById('totalPrice');
    if (totalElement) {
        totalElement.textContent = ` ${total.toFixed(2)}`;
    }
}

// Inicializar a UI
document.addEventListener('DOMContentLoaded', updateUI);

// Expor funções necessárias globalmente
window.bookTour = bookTour;
window.incrementAdults = incrementAdults;
window.decrementAdults = decrementAdults;
