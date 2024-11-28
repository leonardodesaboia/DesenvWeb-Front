import { reservaService } from './api.js';
const API_BASE_URL = 'http://localhost:8080';
let currentPasseio = null;
let adultsCount = 1;
let passeioValor = 0;

  

async function loadPasseioDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const passeioId = urlParams.get('id');

        if (!passeioId) {
            console.error('ID do passeio não encontrado na URL');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/passeio/${passeioId}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar dados do passeio');
        }

        const passeio = await response.json();
        console.log('Dados do passeio:', passeio);
        currentPasseio = passeio;
        passeioValor = passeio.valor;

        // Atualizar título e nome do passeio
        document.title = `BM Turismo - ${passeio.nome}`;
        document.querySelector('.display-3.text-white').textContent = passeio.nome;

        // Atualizar descrição
        const descriptionElement = document.querySelector('.mb-4');
        if (descriptionElement) {
            descriptionElement.textContent = passeio.descricao;
        }

        // Atualizar cards info
        const horaElement = document.querySelector('.duration small');
        if (horaElement) {
            horaElement.textContent = passeio.hora || 'Horário a definir';
        }

        const localElement = document.querySelector('.location small');
        if (localElement) {
            localElement.textContent = passeio.lugar;
        }

        // Atualizar preço
        const precoElement = document.querySelector('.text-muted');
        if (precoElement) {
            precoElement.textContent = `R$ ${parseFloat(passeio.valor).toFixed(2)} por pessoa`;
        }

        // Atualizar data
        const dataPasseio = new Date(passeio.data);
        const radioButtons = document.querySelectorAll('input[name="tourTime"]');
        radioButtons.forEach((radio, index) => {
            const date = new Date(dataPasseio);
            date.setDate(date.getDate() + index);
            radio.value = date.toISOString().split('T')[0];
            const label = radio.nextElementSibling;
            if (label) {
                label.textContent = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit'
                });
            }
        });

        updateTotalPrice();
        localStorage.setItem('currentPasseioId', passeioId);

    } catch (error) {
        console.error('Erro ao carregar detalhes do passeio:', error);
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

function updateTotalPrice() {
    const total = adultsCount * passeioValor;
    const totalElement = document.getElementById('totalPrice');
    if (totalElement) {
        totalElement.textContent = `R$ ${total.toFixed(2)}`;
    }
}

async function reservarPasseio() {
    if (!currentPasseio) {
        alert('Erro: dados do passeio não encontrados');
        return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
        alert('Por favor, faça login primeiro');
        window.location.href = 'Login.html';
        return;
    }

    const selectedDateElement = document.querySelector('input[name="tourTime"]:checked');
    if (!selectedDateElement) {
        alert('Por favor, selecione uma data para o passeio');
        return;
    }

    const reservaData = {
        id_cliente: userId,
        id_passeio: currentPasseio.id,
        valor_total: adultsCount * passeioValor,
        data: selectedDateElement.value
    };

    localStorage.setItem('adultsCount', adultsCount);
    localStorage.setItem('selectedDate', selectedDateElement.value);
    localStorage.setItem('totalPrice', adultsCount * passeioValor);
    localStorage.setItem('currentPasseioId', currentPasseio.id);

    try {
        const reservaResponse = await reservaService.criar(reservaData);
        console.log('Reserva criada com sucesso:', reservaResponse);
        
        // Salvar o ID da reserva atual
        localStorage.setItem('reservaId', reservaResponse.id_reserva); // usando id_reserva conforme retorno da API
        
        window.location.href = 'PaginaPagamento.html';
    } catch (error) {
        console.error('Erro ao criar reserva:', error);
        alert('Erro ao criar reserva. Por favor, tente novamente.');
    }
}


// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadPasseioDetails();
    const reservarButton = document.querySelector('.btn-primary.w-100.py-3');
    if (reservarButton) {
        reservarButton.addEventListener('click', reservarPasseio);
    }
});

// Exportar funções para uso global
window.incrementAdults = incrementAdults;
window.decrementAdults = decrementAdults;
window.updateTotalPrice = updateTotalPrice;
window.reservarPasseio = reservarPasseio;
