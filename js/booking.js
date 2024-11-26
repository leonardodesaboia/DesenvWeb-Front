// booking.js
const PRICE_PER_PERSON = 180.00;
let adultsCount = 1;

async function checkUserAuthenticated() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token) {
        alert('Por favor, faça login primeiro');
        window.location.href = '/Login.html';
        return false;
    }
    return true;
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

function updateTotalPrice() {
    const total = adultsCount * PRICE_PER_PERSON;
    const totalElement = document.getElementById('totalPrice');
    if (totalElement) {
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}

async function bookTour() {
    try {
        if (!await checkUserAuthenticated()) {
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

        const reservaData = {
            id_passeio: 1,
            id_cliente: parseInt(userId),
            valor_total: adultsCount * PRICE_PER_PERSON,
            data: selectedDate.value
        };

        console.log('Enviando dados da reserva:', reservaData);

        const response = await fetch('http://localhost:8080/reserva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(reservaData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Erro ao criar reserva');
        }

        const result = await response.json();
        console.log('Reserva criada com sucesso:', result);
        alert('Reserva realizada com sucesso!');
        
    } catch (error) {
        console.error('Erro ao fazer reserva:', error);
        alert('Erro ao fazer reserva. Por favor, tente novamente.');
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

// Exportar funções para o window
window.incrementAdults = incrementAdults;
window.decrementAdults = decrementAdults;
window.bookTour = bookTour;