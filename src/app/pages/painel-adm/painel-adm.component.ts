import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reserva } from '../../interfaces/interfaceReserva';
import { Passeio } from '../../interfaces/interfacePasseio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './painel-adm.component.html',
  styleUrls: ['./painel-adm.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ]
})

export class AdminPanelComponent implements OnInit {
  passeioForm: FormGroup;
  reservas: Reserva[] = [];
  previewData: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.passeioForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      capacidade: ['', Validators.required],
      localizacao: ['', Validators.required],
      data: ['', Validators.required],
      horario: ['', Validators.required],
      imagens: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarReservas();
    this.passeioForm.valueChanges.subscribe(values => {
      this.previewData = values;
    });
  }

  onSubmit(): void {
    if (this.passeioForm.valid) {
      console.log(this.passeioForm.value);
      // Implementar lógica de criação do passeio
    }
  }

  carregarReservas(): void {
    // Implementar carregamento de reservas
    this.reservas = [
      // Adicione dados de exemplo ou carregue do backend
    ];
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    this.passeioForm.patchValue({
      imagens: files
    });
  }

  logout(): void {
    // Implementar lógica de logout
    this.router.navigate(['/login']);
  }

  atualizarStatusReserva(id: number, status: string): void {
    // Implementar atualização de status
  }
}