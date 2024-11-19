import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reserva } from '../interfaces/interfaceReserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservas: Reserva[] = [];
  private lastId = 0;

  constructor() {}

  getReservas(): Observable<Reserva[]> {
    return of(this.reservas);
  }

  getReservaById(id: number): Observable<Reserva | undefined> {
    return of(this.reservas.find(reserva => reserva.id === id));
  }

  getReservasByCliente(nomeCliente: string): Observable<Reserva[]> {
    return of(this.reservas.filter(reserva => 
      reserva.nomeCliente.toLowerCase().includes(nomeCliente.toLowerCase())
    ));
  }

  criarReserva(reserva: Omit<Reserva, 'id'>): Observable<Reserva> {
    const novaReserva = {
      ...reserva,
      id: ++this.lastId,
      status: reserva.status || 'Pendente'  // Status padrão se não fornecido
    };
    this.reservas.push(novaReserva);
    return of(novaReserva);
  }

  atualizarReserva(id: number, atualizacoes: Partial<Reserva>): Observable<boolean> {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservas[index] = {
        ...this.reservas[index],
        ...atualizacoes,
        id // Mantém o ID original
      };
      return of(true);
    }
    return of(false);
  }

  atualizarStatus(id: number, novoStatus: string): Observable<boolean> {
    return this.atualizarReserva(id, { status: novoStatus });
  }

  cancelarReserva(id: number): Observable<boolean> {
    return this.atualizarStatus(id, 'Cancelado');
  }

  confirmarReserva(id: number): Observable<boolean> {
    return this.atualizarStatus(id, 'Confirmado');
  }

  deletarReserva(id: number): Observable<boolean> {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservas.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  getReservasPorPeriodo(dataInicio: Date, dataFim: Date): Observable<Reserva[]> {
    const reservasFiltradas = this.reservas.filter(reserva => {
      const dataReserva = new Date(reserva.data);
      return dataReserva >= dataInicio && dataReserva <= dataFim;
    });
    return of(reservasFiltradas);
  }
}