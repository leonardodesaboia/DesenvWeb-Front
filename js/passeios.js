// passeios.js
const API_BASE_URL = 'http://localhost:8080';

async function loadPasseios() {
    try {
        const response = await fetch(`${API_BASE_URL}/passeio`);
        if (!response.ok) {
            throw new Error('Erro ao carregar passeios');
        }

        const data = await response.json();
        console.log('Passeios carregados:', data);

        const container = document.getElementById('passeios-container');
        if (!container) {
            console.error('Container de passeios não encontrado');
            return;
        }

        // Limpar o container
        container.innerHTML = '';

        // Verificar se há conteúdo e é um array
        if (data.content && Array.isArray(data.content)) {
            data.content.forEach(passeio => {
                const passeioElement = createPasseioCard(passeio);
                container.appendChild(passeioElement);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar passeios:', error);
    }
}

function createPasseioCard(passeio) {
    const element = document.createElement('div');
    element.className = 'col-lg-4 col-md-6 wow fadeInUp';

    // Descrições pré-definidas por local
    const descricoes = {
       
    };

    // Pegar a descrição baseada no lugar ou usar a descrição padrão
    const descricao = descricoes[passeio.lugar] || passeio.descricao || 'Descubra este incrível destino turístico cheio de belezas naturais e experiências únicas.';

    // Formatar o preço
    const preco = parseFloat(passeio.valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    element.innerHTML = `
        <div class="package-item">
            <div class="d-flex border-bottom">
                <small class="flex-fill text-center border-end py-2">
                    <i class="fa fa-map-marker-alt text-primary me-2"></i>${passeio.lugar}
                </small>
                <small class="flex-fill text-center border-end py-2">
                    <i class="fa fa-clock text-primary me-2"></i>${passeio.hora || 'Horário a definir'}
                </small>
                <small class="flex-fill text-center py-2">
                    <i class="fa fa-calendar text-primary me-2"></i>${passeio.data || 'Data a definir'}
                </small>
            </div>
            <div class="text-center p-4">
                <h3 class="mb-0">${preco}</h3>
                <div class="mb-3">
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                </div>
                <p>${descricao}</p>
                <div class="d-flex justify-content-center mb-2">
                    <a href="PaginaProduto.html?id=${passeio.id}" 
                       class="btn btn-sm btn-primary px-3 border-end"
                       style="border-radius: 30px 0 0 30px;">
                        Ler mais
                    </a>
                    <a href="PaginaProduto.html?id=${passeio.id}" 
                       class="btn btn-sm btn-primary px-3"
                       style="border-radius: 0 30px 30px 0;">
                        Reservar Agora
                    </a>
                </div>
            </div>
        </div>
    `;

    return element;
}

// Carregar passeios quando a página for carregada
document.addEventListener('DOMContentLoaded', loadPasseios);