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
        localStorage.setItem('name', data.name);
        localStorage.setItem('token', data.token);

        const tokenArray = data.token.split('.');
        const tokenPayload = JSON.parse(atob(tokenArray[1]))
        const CPF = tokenPayload.cpf
        
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
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            id_cliente: reservaData.id_cliente,
            id_passeio: reservaData.id_passeio,
            valor_total: reservaData.valor_total,
          })
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Resposta do servidor:', errorText);
          throw new Error(errorText || 'Erro ao criar reserva');
        }
  
        const responseData = await response.json();
        console.log('Resposta sucesso:', responseData);
        window.location.href = '/PaginaPagamento.html';
        return responseData;
      } catch (error) {
        console.error('Erro detalhado:', error);
        throw error;
      }
    },

    async confirmarReserva(id) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${API_BASE_URL}/reserva/confirmar/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
      
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Resposta do servidor:', errorText);
            throw new Error(errorText || 'Erro ao confirmar reserva');
          }
      
          const responseData = await response.json();
          console.log('Resposta sucesso:', responseData);
          return responseData;
        } catch (error) {
          console.error('Erro detalhado:', error);
          throw error;
        }
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