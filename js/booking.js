let adultsCount = 1;
const adultPrice = 180;

function updatePrice() {
    const total = (adultsCount * adultPrice);
    document.getElementById('totalPrice').textContent = `R$ ${total.toFixed(2)}`;
}

function incrementAdults() {
    if (adultsCount < 8) {
        adultsCount++;
        document.getElementById('adultsCount').value = adultsCount;
        updatePrice();
    }
}

function decrementAdults() {
    if (adultsCount > 1) {
        adultsCount--;
        document.getElementById('adultsCount').value = adultsCount;
        updatePrice();
    }
}

async function bookTour() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Por favor, faça login para realizar a reserva.');
            window.location.href = '/login.html';
            return;
        }

        // Captura os dados do formulário
        const quantidade_pessoas = document.getElementById('adultsCount').value;
        const data_passeio = document.querySelector('input[name="tourTime"]:checked')?.value;
        
        if (!data_passeio) {
            alert('Por favor, selecione um dia para o passeio.');
            return;
        }

        const valor_total = quantidade_pessoas * adultPrice;

        // Cria o objeto reserva
        const reservaDTO = {
            quantidade_pessoas: parseInt(quantidade_pessoas),
            data_passeio,
            valor_total,
            passeio_id: 1 // ID do passeio do Cumbuco
        };

        // Envia a reserva para o backend
        const response = await reservaService.criar(reservaDTO);

        if (response) {
            // Armazena os dados para a página de confirmação
            localStorage.setItem('reservaAtual', JSON.stringify({
                id: response.id,
                quantidade_pessoas,
                data_passeio,
                valor_total: valor_total.toFixed(2)
            }));

            alert('Reserva realizada com sucesso!');
            window.location.href = "PaginaPagamento.html";
        }
    } catch (error) {
        alert('Erro ao realizar reserva: ' + (error.message || 'Tente novamente mais tarde'));
    }
}