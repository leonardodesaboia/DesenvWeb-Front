export interface Passeio {
  id?: number;   // Adicionado o id como opcional
  nome: string;
  descricao: string;
  preco: number;
  capacidade: number;
  localizacao: string;
  data: string;
  horario: string;
  imagens: File[];
  status?: string;   // Opcional, caso queira controlar o status do passeio
}