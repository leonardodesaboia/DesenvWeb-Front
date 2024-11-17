document.addEventListener("DOMContentLoaded", function () {
 // Adicionar classe 'filled' ao preencher um campo
 $('#create-tour-form input, #create-tour-form textarea').on('input change', function () {
    if ($(this).val().trim() !== '') {
        $(this).addClass('filled');
    } else {
        $(this).removeClass('filled');
    }
});
});

// Atualizar pré-visualização dinamicamente
$('#create-tour-form').on('input change', function () {
    const name = $('#tour-name').val() || 'Nome do Passeio';
    const description = $('#tour-description').val() || 'Descrição do passeio';
    const price = $('#tour-price').val() || '0.00';
    const capacity = $('#tour-capacity').val() || 'N/A';
    const location = $('#tour-location').val() || 'Localização não informada';
    const date = $('#tour-date').val() || 'Data não definida';
    const time = $('#tour-time').val() || 'Horário não definido';

    // Atualizar pré-visualização
    const previewHTML = `
        <h5><strong>${name}</strong></h5>
        <p>${description}</p>
        <p><strong>Preço:</strong> R$ ${price} por pessoa</p>
        <p><strong>Capacidade:</strong> ${capacity} pessoas</p>
        <p><strong>Localização:</strong> ${location}</p>
        <p><strong>Data:</strong> ${date}</p>
        <p><strong>Horário:</strong> ${time}</p>
    `;

    $('#tour-preview').html(previewHTML);
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("create-tour-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Capturar os dados do formulário
        const tourData = {
            name: document.getElementById("tour-name").value,
            description: document.getElementById("tour-description").value,
            price: document.getElementById("tour-price").value,
            capacity: document.getElementById("tour-capacity").value,
            location: document.getElementById("tour-location").value,
            date: document.getElementById("tour-date").value,
            time: document.getElementById("tour-time").value,
            images: Array.from(document.getElementById("tour-images").files).map(file =>
                URL.createObjectURL(file)
            )
        };

        // Verificar se todos os campos foram preenchidos
        if (!tourData.name || !tourData.description || !tourData.price || !tourData.capacity || !tourData.location || !tourData.date || !tourData.time || tourData.images.length === 0) {
            alert("Por favor, preencha todos os campos e adicione pelo menos uma imagem.");
            return;
        }

        // Gera o layout da nova página
        const productPageHTML = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${tourData.name}</title>
            <link rel="stylesheet" href="css/bootstrap.min.css">
            <link rel="stylesheet" href="css/PaginaProduto.css">
        </head>
        <body>
            <header>
                <nav class="navbar navbar-expand-lg navbar-light bg-white px-4">
                    <a class="navbar-brand" href="#">BM Turismo</a>
                </nav>
            </header>
            <main class="container my-5">
                <div class="row">
                    <!-- Coluna de Imagens -->
                    <div class="col-lg-6">
                        <div class="row">
                            ${tourData.images.map((src, index) => `
                                <div class="col-6 mb-3">
                                    <img src="${src}" alt="Imagem ${index + 1}" class="img-fluid rounded">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <!-- Coluna de Informações -->
                    <div class="col-lg-6">
                        <h1 class="text-primary">${tourData.name}</h1>
                        <p>${tourData.description}</p>
                        <ul class="list-unstyled">
                            <li><strong>Preço por pessoa:</strong> R$ ${tourData.price}</li>
                            <li><strong>Capacidade:</strong> ${tourData.capacity} pessoas</li>
                            <li><strong>Localização:</strong> ${tourData.location}</li>
                            <li><strong>Data:</strong> ${tourData.date}</li>
                            <li><strong>Horário:</strong> ${tourData.time}</li>
                        </ul>
                    </div>
                </div>
            </main>
            <footer class="text-center py-3 bg-light">
                <p>© 2024 BM Turismo. Todos os direitos reservados.</p>
            </footer>
        </body>
        </html>
        `;

        // Abre a página em uma nova aba
        const newWindow = window.open("", "_blank");
        newWindow.document.write(productPageHTML);
        newWindow.document.close();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("tour-location");
    const suggestionsList = document.getElementById("location-suggestions");

    // Função para buscar locais da Nominatim API
    async function fetchLocations(query) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`;

        try {
            const response = await fetch(url, {
                headers: {
                    "User-Agent": "BM Turismo/1.0 (felipeplinsesilva@gmail.com)" // Recomendado pela Nominatim
                }
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error("Erro ao buscar locais:", response.statusText);
                return [];
            }
        } catch (error) {
            console.error("Erro na requisição à Nominatim API:", error);
            return [];
        }
    }

    // Mostrar sugestões na lista
    function showSuggestions(locations) {
        suggestionsList.innerHTML = "";
        if (locations.length > 0) {
            locations.forEach((location) => {
                const li = document.createElement("li");
                li.textContent = location.display_name;
                li.classList.add("list-group-item");
                li.addEventListener("click", () => {
                    locationInput.value = location.display_name;
                    suggestionsList.style.display = "none";
                });
                suggestionsList.appendChild(li);
            });
            suggestionsList.style.display = "block";
        } else {
            suggestionsList.style.display = "none";
        }
    }

    // Monitorar a entrada do usuário no campo de localização
    locationInput.addEventListener("input", async function () {
        const query = locationInput.value.trim();
        if (query.length > 2) {
            const locations = await fetchLocations(query);
            showSuggestions(locations);
        } else {
            suggestionsList.style.display = "none";
        }
    });

    // Esconder a lista ao clicar fora
    document.addEventListener("click", function (event) {
        if (!suggestionsList.contains(event.target) && event.target !== locationInput) {
            suggestionsList.style.display = "none";
        }
    });
});



