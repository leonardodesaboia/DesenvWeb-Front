import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pagamento',
  templateUrl: './pagina-pagamento.component.html',
  styleUrls: ['./pagina-pagamento.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class PagamentoComponent implements OnInit {
  resumoPedido = {
    adultos: 0,
    horario: '',
    precoAdulto: 180,
    total: 0
  };

  pixCode = '00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarDadosReserva();
  }

  carregarDadosReserva(): void {
    // Carregar dados do localStorage
    const adultos = localStorage.getItem('adultsCount');
    const horario = localStorage.getItem('selectedTime');
    const total = localStorage.getItem('totalPrice');

    if (adultos && horario && total) {
      this.resumoPedido = {
        adultos: parseInt(adultos),
        horario: horario,
        precoAdulto: 180,
        total: parseFloat(total)
      };
    }
  }

  copyPixCode(): void {
    navigator.clipboard.writeText(this.pixCode)
      .then(() => {
        // Poderia usar um serviço de notificação aqui
        console.log('Código PIX copiado!');
      })
      .catch(err => {
        console.error('Erro ao copiar:', err);
      });
  }

  checkPayment(): void {
    // Aqui você implementaria a verificação real do pagamento
    // Por enquanto, apenas simulação
    if (confirm('Pagamento confirmado com sucesso! Você receberá um e-mail com os detalhes da sua reserva.')) {
      this.router.navigate(['/resumo-pedido']);
    }
  }
}