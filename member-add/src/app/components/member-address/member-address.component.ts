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
  fromReview = false;

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fromReview = !!history.state.fromReview;
    const newMember = this.memberService.getNewMember();
    this.street = newMember.street || '';
    this.street2 = newMember.street2 || '';
    this.city = newMember.city || '';
    this.state = newMember.state || '';
    this.postalCode = newMember.postalCode || '';
  }

  next() {
    if (this.isFormValid()) {
      this.memberService.updateNewMember({
        street: this.street,
        street2: this.street2,
        city: this.city,
        state: this.state,
        postalCode: this.postalCode
      });
      if (this.fromReview) {
        this.router.navigate(['/add-member/review']);
      } else {
        this.router.navigate(['/add-member/other']);
      }
    }
  }

  back() {
    if (this.fromReview) {
      this.router.navigate(['/add-member/review']);
    } else {
      this.memberService.updateNewMember({
        street: this.street,
        street2: this.street2,
        city: this.city,
        state: this.state,
        postalCode: this.postalCode
      });
      this.router.navigate(['/add-member/basic']);
    }
  }

  isFormValid(): boolean {
    return !!(this.street && this.city && this.state && this.postalCode);
  }
}
