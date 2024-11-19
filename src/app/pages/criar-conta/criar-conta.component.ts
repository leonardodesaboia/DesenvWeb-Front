// criar-conta.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule  // Adicione aqui
  ]
})
export class CriarContaComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      nomeCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  formatarTelefone(event: any): void {
    let telefone = event.target.value;
    
    telefone = telefone.replace(/\D/g, '');

    if (telefone.length <= 10) {
      telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    } else {
      telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }

    event.target.value = telefone;
    this.loginForm.patchValue({ telefone: telefone });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.router.navigate(['/login']);
    }
  }
}