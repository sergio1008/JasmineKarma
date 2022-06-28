import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoModel } from '../models/producto-model';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { PersonaComponent } from './persona.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonaService } from '../services/persona.service';

const productos: Array<ProductoModel> = [
  {
    id: 1,
    name: "arroz",
    price: 12
  },
  {
    id: 1,
    name: "arroz",
    price: 1
  }
]
describe('PersonaComponent', () => {
  let component: PersonaComponent;
  let service: PersonaService;
  let fixture: ComponentFixture<PersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PersonaComponent],
      providers: [PersonaService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(PersonaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar total', () => {
    let total = component.getTotalPrice(productos);
    expect(total).toBeGreaterThan(0)
  });

  it('getProductByName', () => {
    let spyGetProductByName = spyOn(service, 'getProductByName').and.callFake(() => {
      return new Promise((resolve, reject) => {
        resolve([{
          id: 1,
          name: 'arroz',
          price: 58
        }]);
      });
    });
    component.getProductByName('arroz');
    expect(spyGetProductByName).toHaveBeenCalled();
  });

  it('getProductByNameError', () => {
    let spyGetProductByName = spyOn(service, 'getProductByName').and.rejectWith(new Error('error'));
    component.getProductByName('arroz');
    expect(spyGetProductByName).toHaveBeenCalled();
  });

});
