// detalhes-passeio.js
const API_BASE_URL = 'http://localhost:8080';

async function loadPasseioDetails() {
    try {
        // Pegar o ID do passeio da URL
        const urlParams = new URLSearchParams(window.location.search);
        const passeioId = urlParams.get('id');

        if (!passeioId) {
            console.error('ID do passeio não encontrado');
            return;
        }

        const response = await fetch(`${API_BASE_URL}/passeio/${passeioId}`);
        const passeio = await response.json();

        // Atualizar os elementos da página com os dados do passeio
        document.querySelector('.display-3.text-white').textContent = passeio.nome;
        document.querySelector('.mb-4 > p').textContent = passeio.descricao;
        
        // Atualizar informações do card de reserva
        document.querySelector('.text-muted').textContent = 
            `R$ ${parseFloat(passeio.valor).toFixed(2)} por pessoa`;
        
        // Atualizar detalhes do passeio
        document.querySelector('.duration small').textContent = passeio.hora;
        document.querySelector('.location small').textContent = passeio.lugar;
        document.querySelector('.distance small').textContent = '30 km'; // Você pode adicionar isso ao seu DTO se necessário

        // Atualizar preço total inicial
        updateTotalPrice(parseFloat(passeio.valor));

        // Armazenar o ID do passeio para a reserva
        document.getElementById('passeioId').value = passeioId;

    } catch (error) {
        console.error('Erro ao carregar detalhes do passeio:', error);
    }
}

// Carregar detalhes quando a página for carregada
document.addEventListener('DOMContentLoaded', loadPasseioDetails);