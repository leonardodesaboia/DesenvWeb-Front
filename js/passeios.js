// passeios.js
const API_BASE_URL = 'http://localhost:8080';

async function loadPasseios() {
    try {
        const response = await fetch(`${API_BASE_URL}/passeio`);
        if (!response.ok) {
            throw new Error('Erro ao carregar passeios');
        }
        
        const data = await response.json();
        console.log('Passeios carregados:', data); // Debug
        
        const container = document.getElementById('passeios-container');
        if (!container) {
            console.error('Container de passeios não encontrado');
            return;
        }

        container.innerHTML = ''; // Limpa o conteúdo existente
        
        if (data.content && Array.isArray(data.content)) {
            data.content.forEach(passeio => {
                const passeioElement = createPasseioCard(passeio);
                container.appendChild(passeioElement);
            });
        } else {
            console.error('Formato de dados inválido:', data);
        }
    } catch (error) {
        console.error('Erro ao carregar passeios:', error);
    }
}

function createPasseioPage(passeio) {
    // ... resto do código igual ...
}

function createPasseioCard(passeio) {
    const element = document.createElement('div');
    element.className = 'col-lg-4 col-md-6 wow fadeInUp';
    
    element.innerHTML = `
        <div class="package-item">
            <div class="overflow-hidden">
                <img class="img-fluid" style="height: 350px; width: 500px;" 
                     src="img/placeholder.jpg" alt="${passeio.nome}">
            </div>
            <div class="d-flex border-bottom">
                <small class="flex-fill text-center border-end py-2">
                    <i class="fa fa-map-marker-alt text-primary me-2"></i>${passeio.lugar}
                </small>
                <small class="flex-fill text-center border-end py-2">
                    <i class="fa fa-clock text-primary me-2"></i>${passeio.hora}
                </small>
                <small class="flex-fill text-center py-2">
                    <i class="fa fa-calendar text-primary me-2"></i>${passeio.data}
                </small>
            </div>
            <div class="text-center p-4">
                <h3 class="mb-0">R$ ${passeio.valor.toFixed(2)}</h3>
                <div class="mb-3">
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                    <small class="fa fa-star text-primary"></small>
                </div>
                <p>${passeio.descricao}</p>
                <div class="d-flex justify-content-center mb-2">
                    <button onclick="mostrarDetalhes(${JSON.stringify(passeio)})" 
                            class="btn btn-sm btn-primary px-3 border-end"
                            style="border-radius: 30px 0 0 30px;">
                        Ler mais
                    </button>
                    <button onclick="mostrarDetalhes(${JSON.stringify(passeio)})" 
                            class="btn btn-sm btn-primary px-3"
                            style="border-radius: 0 30px 30px 0;">
                        Reservar Agora
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return element;
}

function mostrarDetalhes(passeio) {
    createPasseioPage(passeio);
}

// Expor a função globalmente
window.mostrarDetalhes = mostrarDetalhes;

// Carregar os passeios quando a página for carregada
document.addEventListener('DOMContentLoaded', loadPasseios);