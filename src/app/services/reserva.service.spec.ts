import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reserva } from '../interfaces/interfaceReserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservas: Reserva[] = [
    // Dados de exemplo
    {
      id: 1,
      nomeCliente: 'João Silva',
      passeio: 'Praia do Cumbuco',
      data: '2024-03-20',
      horario: '09:00',
      status: 'Confirmado'
    }
  ];

  getReservas(): Observable<Reserva[]> {
    return of(this.reservas);
  }

  getReservaById(id: number): Observable<Reserva | undefined> {
    return of(this.reservas.find(reserva => reserva.id === id));
  }

  criarReserva(reserva: Reserva): Observable<Reserva> {
    // Simula criação de nova reserva
    const novaReserva = { ...reserva, id: this.reservas.length + 1 };
    this.reservas.push(novaReserva);
    return of(novaReserva);
  }

  atualizarStatus(id: number, novoStatus: string): Observable<boolean> {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservas[index].status = novoStatus;
      return of(true);
    }
    return of(false);
  }

  cancelarReserva(id: number): Observable<boolean> {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservas.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}