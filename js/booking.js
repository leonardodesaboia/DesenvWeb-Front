// booking.js
let adultsCount = 1;
let currentPasseio = null;

async function loadPasseioData() {
    const passeioId = localStorage.getItem('currentPasseioId');
    if (!passeioId) return;

    try {
        const response = await fetch(`${API_BASE_URL}/passeio/${passeioId}`);
        if (!response.ok) throw new Error('Erro ao carregar dados do passeio');
        
        currentPasseio = await response.json();
        updateTotalPrice();
    } catch (error) {
        console.error('Erro ao carregar dados do passeio:', error);
    }
}

function incrementAdults() {
    if (currentPasseio && adultsCount < currentPasseio.capacidade) {
        adultsCount++;
        updateUI();
    } else if (!currentPasseio && adultsCount < 8) {
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
    if (!currentPasseio) return;
    
    const total = adultsCount * currentPasseio.valor;
    const totalElement = document.getElementById('totalPrice');
    if (totalElement) {
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadPasseioData();
    updateUI();
});

// Exportar funções necessárias
window.incrementAdults = incrementAdults;
window.decrementAdults = decrementAdults;
window.bookTour = bookTour;