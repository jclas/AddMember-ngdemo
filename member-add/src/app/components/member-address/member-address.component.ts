import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-member-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-address.component.html',
  styleUrl: './member-address.component.css'
})
export class MemberAddressComponent implements OnInit {
  street: string = '';
  street2: string = '';
  city: string = '';
  state: string = '';
  postalCode: string = '';

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentMember = this.memberService.getCurrentMember();
    this.street = currentMember.street || '';
    this.street2 = currentMember.street2 || '';
    this.city = currentMember.city || '';
    this.state = currentMember.state || '';
    this.postalCode = currentMember.postalCode || '';
  }

  next() {
    if (this.isFormValid()) {
      this.memberService.updateCurrentMember({
        street: this.street,
        street2: this.street2,
        city: this.city,
        state: this.state,
        postalCode: this.postalCode
      });
      this.router.navigate(['/add-member/contact']);
    }
  }

  back() {
    this.memberService.updateCurrentMember({
      street: this.street,
      street2: this.street2,
      city: this.city,
      state: this.state,
      postalCode: this.postalCode
    });
    this.router.navigate(['/add-member/basic']);
  }

  isFormValid(): boolean {
    return !!(this.street && this.city && this.state && this.postalCode);
  }
}
