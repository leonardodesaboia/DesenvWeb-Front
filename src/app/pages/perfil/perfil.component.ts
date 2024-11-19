import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Reserva {
  id: number;
  passeio: string;
  data: string;
  horario: string;
  status: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario = {
    nome: 'Nome Completo',
    email: 'usuario@email.com',
    cpf: '000.000.000-00',
    dataNascimento: '01/01/2000',
    foto: 'https://via.placeholder.com/100'
  };

  reservas: Reserva[] = [
    {
      id: 1,
      passeio: 'Passeio nas Dunas',
      data: '2024-12-10',
      horario: '10:00',
      status: 'Confirmado'
    },
    {
      id: 2,
      passeio: 'Praia de Jericoacoara',
      data: '2024-12-15',
      horario: '08:00',
      status: 'Confirmado'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  cancelarReserva(reserva: Reserva): void {
    if (confirm(`Tem certeza que deseja cancelar o passeio "${reserva.passeio}"?`)) {
      this.reservas = this.reservas.filter(r => r.id !== reserva.id);
      alert(`O passeio "${reserva.passeio}" foi cancelado com sucesso!`);
    }
  }

  logout(): void {
    if (confirm('Tem certeza que deseja sair?')) {
      this.router.navigate(['/']);
    }
  }
}