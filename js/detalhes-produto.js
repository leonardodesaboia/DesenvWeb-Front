// produto-detalhes.js
document.addEventListener('DOMContentLoaded', function() {
    // Recuperar os detalhes do passeio do localStorage
    const passeioDetalhesStr = localStorage.getItem('passeioDetalhes');
    if (!passeioDetalhesStr) {
        console.error('Detalhes do passeio não encontrados');
        return;
    }

    const passeio = JSON.parse(passeioDetalhesStr);

    // Atualizar título da página
    document.querySelector('.display-3.text-white').textContent = passeio.nome;

    // Atualizar descrição
    document.querySelector('.mb-4').textContent = passeio.descricao;

    // Atualizar local
    const localSpan = document.querySelector('.text-primary span');
    if (localSpan) {
        localSpan.textContent = passeio.lugar;
    }

    // Atualizar preço por pessoa na seção de reserva
    const precoTexto = document.querySelector('.text-muted');
    if (precoTexto) {
        precoTexto.textContent = `R$ ${passeio.valor.toFixed(2)} por pessoa`;
    }

    // Atualizar preço total inicial
    const totalElement = document.getElementById('totalPrice');
    if (totalElement) {
        totalElement.textContent = `R$ ${passeio.valor.toFixed(2)}`;
    }

    // Armazenar informações para a reserva
    window.passeioAtual = passeio;
});