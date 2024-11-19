import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetalhePedido, CronogramaItem, InfoCard } from '../../interfaces/interfaceDetalhePedido';

@Component({
  selector: 'app-confirmacao-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './resumo-pedido.component.html',
  styleUrls: ['./resumo-pedido.component.css']
})

export class ConfirmacaoPedidoComponent implements OnInit {
  detalhes: DetalhePedido = {
    numeroPedido: 'BM2024051234',
    dataPasseio: '15/05/2024',
    duracao: '8 horas (08:00 - 17:00)',
    localSaida: 'Hotel Marina Park',
    adultos: 2,
    valorAdultos: 360.00,
    taxaServico: 45.00,
    total: 405.00
  };

  cronograma: CronogramaItem[] = [
    { horario: '08:00', titulo: 'Saída', descricao: 'Encontro no Hotel Marina Park' },
    { horario: '09:00', titulo: 'Chegada', descricao: 'Café da manhã regional' },
    { horario: '10:00', titulo: 'Atividades', descricao: 'Passeio de buggy pelas dunas' },
    { horario: '12:30', titulo: 'Almoço', descricao: 'Restaurante local' },
    { horario: '17:00', titulo: 'Retorno', descricao: 'Chegada ao hotel' }
  ];

  infoCards: InfoCard[] = [
    {
      icon: 'fa-suitcase',
      titulo: 'O que levar',
      descricao: 'Protetor solar, roupas de banho, toalha'
    },
    {
      icon: 'fa-id-card',
      titulo: 'Documentos',
      descricao: 'Documento com foto para embarque'
    },
    {
      icon: 'fa-phone-alt',
      titulo: 'Suporte 24h',
      descricao: '(85) 9999-9999'
    },
    {
      icon: 'fa-envelope',
      titulo: 'E-mail',
      descricao: 'Confirmação enviada'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  imprimirComprovante(): void {
    window.print();
  }
}