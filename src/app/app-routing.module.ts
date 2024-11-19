import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'login-adm', component: LoginAdmComponent },
  { path: 'resumo-pedido', component: ResumoPedidoComponent },
  { path: 'pagamento', component: PaginaPagamentoComponent },
  { path: 'produto', component: PaginaProdutoComponent },
  { path: 'perfil', component: PerfilComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }