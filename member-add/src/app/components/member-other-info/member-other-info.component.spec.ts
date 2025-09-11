import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOtherInfoComponent } from './member-other-info.component';

describe('MemberOtherInfoComponent', () => {
  let component: MemberOtherInfoComponent;
  let fixture: ComponentFixture<MemberOtherInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberOtherInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MemberOtherInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
