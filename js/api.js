const API_BASE_URL = 'http://localhost:8080';

// Configuração padrão dos headers
const getHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('ola');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

// Serviço de Autenticação
export const authService = {
    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro no login');
            
        }
        const data = await response.json();
        const tokenArray = data.token.split('.');
        const tokenPayload = JSON.parse(atob(tokenArray[1]))
        localStorage.setItem('name', tokenPayload.name);
        localStorage.setItem('role', tokenPayload.role);
        localStorage.setItem('cpf', tokenPayload.cpf); 
        localStorage.setItem('email',tokenPayload.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.id);
        return data;
        
    },



    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/user`, {
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
        console.log('Executando logout...'); // Log para verificar
        localStorage.clear();
        console.log('LocalStorage limpo. Redirecionando...');
        window.location.href = '/index.html';
    }
    
};

// Serviço de Passeios
export const passeioService = {
    async listarTodos() {
        const response = await fetch(`${API_BASE_URL}/passeio`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log('oi')
        if (!response.ok) throw new Error('Erro ao buscar passeios');
        return response.json();
    },

    async criar(passeioData) {
        try {
            const token = localStorage.getItem('token');
            console.log('Token armazenado:', token);

            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await fetch(`${API_BASE_URL}/passeio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(passeioData)
            });

            console.log('Status da resposta:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro detalhado:', errorText);
                throw new Error(`Erro ao criar passeio: ${response.status} - ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro completo:', error);
            throw error;
        }
    },
    

    async atualizar(id, passeioData) {
        const response = await fetch(`${API_BASE_URL}/passeio/${id}`, {
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
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);
            console.log('Dados da reserva:', reservaData);
    
            if (!token) {
                throw new Error('Usuário não autenticado');
            }
    
            const response = await fetch(`${API_BASE_URL}/reserva`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id_cliente: reservaData.id_cliente,
                    id_passeio: reservaData.id_passeio,
                    valor_total: reservaData.valor_total,
                    data: reservaData.data
                }),
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro ao criar reserva:', errorText);
                throw new Error(errorText || 'Erro ao criar reserva');
            }
    
            const responseData = await response.json();
            console.log('Reserva criada com sucesso:', responseData);
    
            // Salvar apenas o ID da reserva atual
            localStorage.setItem('reservaId', responseData.id_reserva);
    
            return responseData;
        } catch (error) {
            console.error('Erro ao criar reserva:', error);
            throw error;
        }
    },

    async deletarReserva(id) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/cancelar/confirmar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Resposta do servidor:', errorText);
                throw new Error(errorText || 'Erro ao cancelar reserva');
            }
    
            const responseData = await response.json();
            console.log('Resposta sucesso:', responseData);
            return responseData;
        } catch (error) {
            console.error('Erro detalhado:', error);
            throw error;
        }
    },
    
    async listarReservasPorCliente(clienteId) {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Usuário não autenticado');
            }
    
            const response = await fetch(`${API_BASE_URL}/reserva/cliente/${clienteId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro ao carregar reservas:', errorText);
                throw new Error(errorText || 'Erro ao carregar reservas');
            }
    
            const reservas = await response.json();
            console.log('Reservas carregadas do servidor:', reservas);
    
            // Salvar as reservas no localStorage (opcional)
            localStorage.setItem('reservas', JSON.stringify(reservas));
    
            return reservas;
        } catch (error) {
            console.error('Erro ao carregar reservas:', error);
            throw error;
        }
    },
        async listarReservas() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Usuário não autenticado');
                }
    
                const response = await fetch(`${API_BASE_URL}/reserva`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Erro ao carregar reservas confirmadas:', errorText);
                    throw new Error(errorText || 'Erro ao carregar reservas confirmadas');
                }
    
                const data = await response.json(); // Objeto Page<Reserva>
                console.log('Resposta do servidor:', data);
    
                // Acessar o array de reservas no campo "content"
                return data.content || [];
            } catch (error) {
                console.error('Erro ao carregar reservas confirmadas:', error);
                throw error;
            }
        },
        
        async listarReservasPaginadas(page = 0, size = 10) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Usuário não autenticado');
                }
    
                const response = await fetch(`${API_BASE_URL}/reserva?page=${page}&size=${size}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
    
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Erro ao carregar reservas paginadas:', errorText);
                    throw new Error(errorText || 'Erro ao carregar reservas paginadas');
                }
    
                const data = await response.json(); // Objeto Page<Reserva>
                console.log('Dados da página carregados:', data);
    
                return data; // Retorna o objeto completo
            } catch (error) {
                console.error('Erro ao carregar reservas paginadas:', error);
                throw error;
            }
        },

        
    };
    


