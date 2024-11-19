// app.routes.ts
import { Routes } from '@angular/router';
import { CriarContaComponent } from './pages/criar-conta/criar-conta.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminPanelComponent } from './pages/painel-adm/painel-adm.component';
import { PagamentoComponent } from './pages/pagina-pagamento/pagina-pagamento.component';
import { DestinoDetalheComponent } from './pages/pagina-produto/pagina-produto.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ConfirmacaoPedidoComponent } from './pages/resumo-pedido/resumo-pedido.component';
import { LoginAdmComponent } from './pages/login-adm/login-adm.component';





export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'criar-conta', component: CriarContaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'painel-adm', component: AdminPanelComponent },
  { path: 'pagamento', component: PagamentoComponent },
  { path: 'destino/:id', component: DestinoDetalheComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'confirmacao-pedido', component: ConfirmacaoPedidoComponent },
  { path: 'login-adm', component: LoginAdmComponent },




];