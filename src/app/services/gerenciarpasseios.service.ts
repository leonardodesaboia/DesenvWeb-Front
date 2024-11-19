import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Passeio } from '../interfaces/interfacePasseio';

@Injectable({
  providedIn: 'root'
})
export class PasseioService {
  private passeios: Passeio[] = [];
  private lastId = 0;  // Para controlar os IDs incrementais

  getPasseios(): Observable<Passeio[]> {
    return of(this.passeios);
  }

  getPasseioById(id: number): Observable<Passeio | undefined> {
    return of(this.passeios.find(passeio => passeio.id === id));
  }

  criarPasseio(passeio: Omit<Passeio, 'id'>): Observable<Passeio> {
    const novoPasseio: Passeio = {
      ...passeio,
      id: ++this.lastId
    };
    this.passeios.push(novoPasseio);
    return of(novoPasseio);
  }

  atualizarPasseio(id: number, passeio: Partial<Passeio>): Observable<boolean> {
    const index = this.passeios.findIndex(p => p.id === id);
    if (index !== -1) {
      this.passeios[index] = { 
        ...this.passeios[index], 
        ...passeio,
        id  // Mantém o ID original
      };
      return of(true);
    }
    return of(false);
  }

  deletarPasseio(id: number): Observable<boolean> {
    const index = this.passeios.findIndex(p => p.id === id);
    if (index !== -1) {
      this.passeios.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  // Método auxiliar para buscar passeios por nome ou localização
  buscarPasseios(termo: string): Observable<Passeio[]> {
    const termoBusca = termo.toLowerCase();
    const resultados = this.passeios.filter(passeio => 
      passeio.nome.toLowerCase().includes(termoBusca) ||
      passeio.localizacao.toLowerCase().includes(termoBusca)
    );
    return of(resultados);
  }
}