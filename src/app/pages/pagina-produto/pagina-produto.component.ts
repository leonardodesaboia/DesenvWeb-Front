import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destino-detalhe',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pagina-produto.component.html',
  styleUrls: ['./pagina-produto.component.css']
})
export class DestinoDetalheComponent {
  adultsCount: number = 1;
  readonly adultPrice: number = 180;
  totalPrice: number = this.adultPrice;
  selectedTime: string = '';

  availableTimes = [
    { value: '07:00', label: '07:00' },
    { value: '08:00', label: '08:00' },
    { value: '09:00', label: '09:00' },
    { value: '10:00', label: '10:00' }
  ];

  galleryImages = [
    { url: 'assets/img/Cumbuco.jpg', alt: 'Cumbuco 1' },
    { url: 'assets/img/Cumbuco3.jpg', alt: 'Cumbuco 2' },
    { url: 'assets/img/praia-cumbuco.webp', alt: 'Cumbuco 3' },
    { url: 'assets/img/jericoacoara.jpg', alt: 'Jericoacoara' },
    { url: 'assets/img/praia-do-futuro.jpg', alt: 'Praia do Futuro' },
    { url: 'assets/img/praia-de-canoa-quebrada.jpg', alt: 'Canoa Quebrada' }
  ];

  constructor(private router: Router) {}

  incrementAdults(): void {
    if (this.adultsCount < 8) {
      this.adultsCount++;
      this.updatePrice();
    }
  }

  decrementAdults(): void {
    if (this.adultsCount > 1) {
      this.adultsCount--;
      this.updatePrice();
    }
  }

  updatePrice(): void {
    this.totalPrice = this.adultsCount * this.adultPrice;
  }

  bookTour(): void {
    if (!this.selectedTime) {
      alert('Por favor, selecione um horário para o passeio.');
      return;
    }

    localStorage.setItem('adultsCount', this.adultsCount.toString());
    localStorage.setItem('selectedTime', this.selectedTime);
    localStorage.setItem('totalPrice', this.totalPrice.toFixed(2));

    this.router.navigate(['/pagamento']);
  }
}