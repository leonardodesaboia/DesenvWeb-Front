import { authService } from './api.js';

// Atualiza a Navbar com base no status do login
const updateNavbar = () => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('name');
    const userRole = localStorage.getItem('role');

    const registerButton = document.getElementById('register-button');
    if (!registerButton) return;

    if (token && userName) {
        // Substitui o botão "Registrar" pelo nome e ícone de perfil
        

        registerButton.outerHTML = `
            <div class="nav-item dropdown">
                <a href="${userRole === 'ADM' ? 'paginaADM.html' : 'Perfil2.html'}" 
                   role="button">
                    <i class="fas fa-user me-2"></i>${userName}
                </a>
            </div>
        `;
        setupLogoutButton();
    }
};

// Função para logout
const setupLogoutButton = () => {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();

            const confirmLogout = confirm('Tem certeza que deseja sair?');
            if (confirmLogout) {
                localStorage.removeItem('token');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                window.location.href = 'login.html';
            }
        });
    }
};

// Evitar redirecionamento repetido
const redirectAfterLogin = () => {
    const role = localStorage.getItem('role');
    const currentPage = window.location.pathname;

    if (role === 'ADM' && currentPage !== '/paginaADM.html') {
        window.location.href = './paginaADM.html';
    } else if (role === 'CLIENTE' && currentPage !== '/index.html') {
        window.location.href = './index.html';
    }
};

// Atualiza a navbar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    // Apenas redireciona após login, para evitar loops
    if (localStorage.getItem('token') && !localStorage.getItem('redirected')) {
        redirectAfterLogin();
        localStorage.setItem('redirected', true); // Marca como redirecionado
    }
});
