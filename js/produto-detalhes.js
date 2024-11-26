// produto-detalhes.js
const API_BASE_URL = 'http://localhost:8080';

async function loadPasseioDetails() {
    try {
        // Pegar o ID do passeio da URL
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

        // Atualizar título e nome do passeio
        document.title = `BM Turismo - ${passeio.nome}`;
        document.querySelector('.display-3.text-white').textContent = passeio.nome;

        // Atualizar descrição
        const descriptionElement = document.querySelector('.mb-4');
        if (descriptionElement) {
            descriptionElement.textContent = passeio.descricao;
        }

        // Atualizar informações dos cards
        // Duração/Horário
        const horaElement = document.querySelector('.duration small');
        if (horaElement) {
            horaElement.textContent = passeio.hora || 'Horário a definir';
        }

        // Capacidade máxima
        const capacidadeElement = document.querySelector('.capacity small');
        if (capacidadeElement) {
            capacidadeElement.textContent = `${passeio.capacidade} pessoas`;
        }

        // Distância/Local
        const localElement = document.querySelector('.location small');
        if (localElement) {
            localElement.textContent = passeio.lugar;
        }

        // Atualizar preço na seção de reserva
        const precoElement = document.querySelector('.text-muted');
        if (precoElement) {
            precoElement.textContent = `R$ ${parseFloat(passeio.valor).toFixed(2)} por pessoa`;
        }

        // Atualizar data nos radio buttons
        if (passeio.data) {
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
        }

        // Atualizar preço total inicial
        updateTotalPrice(parseFloat(passeio.valor));

        // Salvar ID do passeio para a reserva
        localStorage.setItem('currentPasseioId', passeioId);
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do passeio:', error);
    }
}

function updateTotalPrice(basePrice) {
    const total = basePrice * (parseInt(document.getElementById('adultsCount').value) || 1);
    document.getElementById('totalPrice').textContent = `R$ ${total.toFixed(2)}`;
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', loadPasseioDetails);

// Exportar funções necessárias
window.updateTotalPrice = updateTotalPrice;