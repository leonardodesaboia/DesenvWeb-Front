const updateNavbar = () => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const authButton = document.querySelector('.navbar .btn-primary');
    
    if (token) {
        const userHtml = `
            <div class="nav-item dropdown">
                <a href="/Perfil2.html" class="nav-link dropdown-toggle text-primary">
                    <i class="fas fa-user me-2"></i>${userName || 'Usuário'}
                </a>
            </div>
        `;
        
        authButton.outerHTML = userHtml;
    } else {
        authButton.innerHTML = 'Registrar';
        authButton.href = 'Login.html';
    }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/index.html';
};

document.addEventListener('DOMContentLoaded', updateNavbar);