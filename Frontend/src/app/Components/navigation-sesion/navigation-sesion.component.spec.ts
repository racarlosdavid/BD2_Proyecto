import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSesionComponent } from './navigation-sesion.component';

describe('NavigationSesionComponent', () => {
  let component: NavigationSesionComponent;
  let fixture: ComponentFixture<NavigationSesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationSesionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
