import { passeioService } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-tour-form');
    const responseElement = document.getElementById('registerResponse');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const horaInput = document.getElementById('tour-time').value;
        // Formata a hora para o formato HH:mm:ss
        const horaFormatada = horaInput + ':00';

        const createPasseioDTO = {
            nome: document.getElementById('tour-name').value,
            lugar: document.getElementById('tour-location').value,
            descricao: document.getElementById('tour-description').value,
            data: document.getElementById('tour-date').value, // Já vem no formato correto YYYY-MM-DD
            hora: horaFormatada, // Agora envia no formato HH:mm:ss
            valor: parseFloat(document.getElementById('tour-price').value)
        };

        try {
            console.log('Enviando dados:', createPasseioDTO);
            await passeioService.criar(createPasseioDTO);
            responseElement.textContent = 'Passeio criado com sucesso!';
            responseElement.style.color = 'green';
            form.reset();
        } catch (error) {
            console.error('Erro no formulário:', error);
            responseElement.textContent = `Erro ao criar passeio: ${error.message}`;
            responseElement.style.color = 'red';
        }
    });
});