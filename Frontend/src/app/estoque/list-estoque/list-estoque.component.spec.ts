import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEstoqueComponent } from './list-estoque.component';

describe('ListEstoqueComponent', () => {
  let component: ListEstoqueComponent;
  let fixture: ComponentFixture<ListEstoqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEstoqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
