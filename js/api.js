const API_BASE_URL = 'http://localhost:8080';

// Configuração padrão dos headers
const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

// Serviço de Autenticação
export const authService = {
    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro no login');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data;
    },

    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Erro no cadastro');
        }
        return response.json();
    },

    logout() {
        localStorage.removeItem('token');
        window.location.href = '/login.html';
    }
};

// Serviço de Passeios
export const passeioService = {
    async listarTodos() {
        const response = await fetch(`${API_BASE_URL}/passeios`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erro ao buscar passeios');
        return response.json();
    },

    async criar(passeioData) {
        const response = await fetch(`${API_BASE_URL}/passeios`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(passeioData)
        });
        if (!response.ok) throw new Error('Erro ao criar passeio');
        return response.json();
    },

    async atualizar(id, passeioData) {
        const response = await fetch(`${API_BASE_URL}/passeios/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(passeioData)
        });
        if (!response.ok) throw new Error('Erro ao atualizar passeio');
        return response.json();
    },

    async deletar(id) {
        const response = await fetch(`${API_BASE_URL}/passeios/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erro ao deletar passeio');
        return response.json();
    }
};

// Serviço de Reservas
export const reservaService = {
    async criar(reservaData) {
        const response = await fetch(`${API_BASE_URL}/reservas`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(reservaData)
        });
        if (!response.ok) throw new Error('Erro ao criar reserva');
        return response.json();
    },

    async listarPorUsuario() {
        const response = await fetch(`${API_BASE_URL}/reservas/usuario`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erro ao buscar reservas');
        return response.json();
    },

    async atualizarStatus(id, status) {
        const response = await fetch(`${API_BASE_URL}/reservas/${id}/status`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('Erro ao atualizar status');
        return response.json();
    }
};

// Serviço de Usuários (Admin)
export const userService = {
    async listarTodos() {
        const response = await fetch(`${API_BASE_URL}/users`, {
            headers: getHeaders()
        });
        if (!response.ok) throw new Error('Erro ao buscar usuários');
        return response.json();
    },

    async atualizarRole(id, role) {
        const response = await fetch(`${API_BASE_URL}/users/${id}/role`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ role })
        });
        if (!response.ok) throw new Error('Erro ao atualizar papel do usuário');
        return response.json();
    }
};