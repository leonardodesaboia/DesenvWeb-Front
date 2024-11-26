import { reservaService } from './api.js';
const API_BASE_URL = 'http://localhost:8080';
let currentPasseio = null;

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
            precoElement.textContent = `${parseFloat(passeio.valor).toFixed(2)} por pessoa`;
        }

        // Atualizar data nos radio buttons
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

        // Atualizar preço total inicial
        updateTotalPrice(parseFloat(passeio.valor));

        // Salvar ID do passeio para a reserva
        localStorage.setItem('currentPasseioId', passeioId);
        currentPasseio = passeio; // Salvar o passeio atual em uma variável global
    } catch (error) {
        console.error('Erro ao carregar detalhes do passeio:', error);
    }
}

function updateTotalPrice(basePrice) {
    const total = basePrice * (parseInt(document.getElementById('adultsCount').value) || 1);
    document.getElementById('totalPrice').textContent = `${total.toFixed(2)}`;
}

// Adicionar evento de clique no botão "Reservar Agora"
const reservarButton = document.querySelector('.btn-primary.w-100.py-3');
reservarButton.addEventListener('click', reservarPasseio);

async function reservarPasseio() {
    // Recuperar os dados do passeio da variável currentPasseio
    const urlParams = new URLSearchParams(window.location.search);
    const passeioId = urlParams.get('id');
    const response = await fetch(`${API_BASE_URL}/passeio/${passeioId}`);
    const passeio = await response.json();
    const { id_passeio, nome, descricao, hora, lugar, valor } = passeio;
    const userId = localStorage.getItem('userId');
  
    // Recuperar a data selecionada pelo usuário
    const selectedDateElement = document.querySelector('input[name="tourTime"]:checked');
    const selectedDate = selectedDateElement ? selectedDateElement.value : null;
  
    if (!selectedDate) {
      alert('Por favor, selecione uma data para o passeio');
      return;
    }
  
    const reservaData = {
      id_passeio: passeio.id,
      id_cliente: parseInt(userId),
      valor_total: document.getElementById('totalPrice').textContent,
    };
  
    try {
        console.log("passeio:"+currentPasseio);
        const reservaResponse = await reservaService.criar(reservaData);
        console.log('Reserva criada com sucesso:', reservaResponse);
        // Redirecionar o usuário para a página de pagamento
        window.location.href = 'PaginaPagamento.html';
      } catch (error) {
        console.error('Erro ao criar reserva:', error);
        alert('Erro ao fazer reserva: ' + error.message);
      }
  }
// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', loadPasseioDetails);

// Exportar funções necessárias
window.updateTotalPrice = updateTotalPrice;