export interface DetalhePedido {
    numeroPedido: string;
    dataPasseio: string;
    duracao: string;
    localSaida: string;
    adultos: number;
    valorAdultos: number;
    taxaServico: number;
    total: number;
  }
  
  export interface CronogramaItem {
    horario: string;
    titulo: string;
    descricao: string;
  }
  
  export interface InfoCard {
    icon: string;
    titulo: string;
    descricao: string;
  }