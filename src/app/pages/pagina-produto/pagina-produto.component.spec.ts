import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoDetalheComponent } from './pagina-produto.component';

describe('PaginaProdutoComponent', () => {
  let component: DestinoDetalheComponent;
  let fixture: ComponentFixture<DestinoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinoDetalheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
