import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPPage } from './inicio-p.page';

describe('InicioPPage', () => {
  let component: InicioPPage;
  let fixture: ComponentFixture<InicioPPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InicioPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
