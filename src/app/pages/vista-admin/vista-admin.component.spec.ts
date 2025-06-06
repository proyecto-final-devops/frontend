import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaAdminComponent } from './vista-admin.component';

describe('VistaAdminComponent', () => {
  let component: VistaAdminComponent;
  let fixture: ComponentFixture<VistaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
