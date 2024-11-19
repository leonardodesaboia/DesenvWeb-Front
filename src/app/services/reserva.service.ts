import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DetalhePedido } from '../interfaces/interfaceDetalhePedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: DetalhePedido[] = [];
  private readonly PREFIXO_PEDIDO = 'BM';

  constructor() {}

  getPedidos(): Observable<DetalhePedido[]> {
    return of(this.pedidos);
  }

  getPedidoByNumero(numeroPedido: string): Observable<DetalhePedido | undefined> {
    return of(this.pedidos.find(pedido => pedido.numeroPedido === numeroPedido));
  }

  criarPedido(pedido: Omit<DetalhePedido, 'numeroPedido'>): Observable<DetalhePedido> {
    const novoPedido: DetalhePedido = {
      ...pedido,
      numeroPedido: this.gerarNumeroPedido()
    };
    this.pedidos.push(novoPedido);
    return of(novoPedido);
  }

  atualizarPedido(numeroPedido: string, atualizacoes: Partial<DetalhePedido>): Observable<boolean> {
    const index = this.pedidos.findIndex(p => p.numeroPedido === numeroPedido);
    if (index !== -1) {
      this.pedidos[index] = {
        ...this.pedidos[index],
        ...atualizacoes,
        numeroPedido // Mantém o número do pedido original
      };
      return of(true);
    }
    return of(false);
  }

  deletarPedido(numeroPedido: string): Observable<boolean> {
    const index = this.pedidos.findIndex(p => p.numeroPedido === numeroPedido);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  calcularTotal(valorAdultos: number, taxaServico: number): number {
    return valorAdultos + taxaServico;
  }

  private gerarNumeroPedido(): string {
    const data = new Date();
    const ano = data.getFullYear();
    const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${this.PREFIXO_PEDIDO}${ano}${random}`;
  }

  getPedidosPorPeriodo(dataInicio: Date, dataFim: Date): Observable<DetalhePedido[]> {
    const pedidosFiltrados = this.pedidos.filter(pedido => {
      const dataPedido = new Date(pedido.dataPasseio);
      return dataPedido >= dataInicio && dataPedido <= dataFim;
    });
    return of(pedidosFiltrados);
  }

  getPedidosPorValorTotal(valorMinimo: number, valorMaximo: number): Observable<DetalhePedido[]> {
    const pedidosFiltrados = this.pedidos.filter(pedido => 
      pedido.total >= valorMinimo && pedido.total <= valorMaximo
    );
    return of(pedidosFiltrados);
  }

  getResumoFinanceiro(): Observable<{
    totalVendas: number;
    quantidadePedidos: number;
    ticketMedio: number;
  }> {
    const totalVendas = this.pedidos.reduce((sum, pedido) => sum + pedido.total, 0);
    const quantidadePedidos = this.pedidos.length;
    const ticketMedio = quantidadePedidos > 0 ? totalVendas / quantidadePedidos : 0;

    return of({
      totalVendas,
      quantidadePedidos,
      ticketMedio
    });
  }
}