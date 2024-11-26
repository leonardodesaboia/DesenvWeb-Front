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
        'Praia do Futuro': 'Desfrute de três dias inesquecíveis na famosa Praia do Futuro, onde o cenário deslumbrante do litoral cearense convida você a relaxar e aproveitar. Mergulhe nas águas cristalinas, caminhe nas areias douradas e aproveite a infraestrutura de barracas que oferecem delícias regionais e o clima acolhedor. Um verdadeiro paraíso para os amantes do mar, com brisa suave e pores do sol espetaculares.',
        'Canoa Quebrada': 'Descubra o paraíso escondido de Canoa Quebrada, onde falésias coloridas encontram o azul infinito do mar. Aproveite três dias neste destino icônico do litoral cearense, conhecido por sua vibração boêmia e belezas naturais. Explore a vila charmosa, faça passeios emocionantes de buggy pelas dunas, e relaxe ao som das ondas tranquilas. O pôr do sol visto das dunas é uma experiência única, seguido de noites animadas com música ao vivo e a gastronomia local incomparável.',
        'Cumbuco': 'Viva a experiência tropical em Cumbuco, destino conhecido por suas dunas, lagoas e ventos perfeitos para a prática de esportes aquáticos como kitesurf. Passe três dias imersos neste cenário paradisíaco, onde você pode relaxar ao som das ondas, fazer passeios de buggy pelas dunas ou simplesmente aproveitar a beleza natural ao redor. Aproveite o pôr do sol com uma vista privilegiada enquanto saboreia a culinária local.',
        'Jericoacoara': 'Descubra a magia de Jericoacoara, um verdadeiro paraíso no litoral cearense. Com suas dunas douradas, lagoas de água doce e praias deslumbrantes, Jeri oferece uma experiência única. Faça passeios de buggy, pratique kitesurf, visite a famosa Pedra Furada e não perca o espetacular pôr do sol na Duna do Pôr do Sol. A vila encantadora, com suas ruas de areia e ambiente rústico-chique, completa essa experiência inesquecível.'
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
            <div class="overflow-hidden">
                <img class="img-fluid" style="height: 350px; width: 500px;" 
                     src="img/${passeio.lugar.toLowerCase().replace(/\s+/g, '-')}.jpg" 
                     alt="${passeio.lugar}"
                     onerror="this.src='img/placeholder.jpg'">
            </div>
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