import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-member-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-basic-info.component.html',
  styleUrl: './member-basic-info.component.css'
})
export class MemberBasicInfoComponent implements OnInit {
  email: string = '';
  displayName: string = '';
  firstName: string = '';
  lastName: string = '';
  fromReview = false;

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fromReview = !!history.state.fromReview;
    const currentMember = this.memberService.getCurrentMember();
    this.email = currentMember.email || '';
    this.displayName = currentMember.displayName || '';
    this.firstName = currentMember.firstName || '';
    this.lastName = currentMember.lastName || '';
  }

  next() {
    if (this.isFormValid()) {
      this.memberService.updateCurrentMember({
        email: this.email,
        displayName: this.displayName,
        firstName: this.firstName,
        lastName: this.lastName
      });
      if (this.fromReview) {
        this.router.navigate(['/add-member/review']);
      } else {
        this.router.navigate(['/add-member/address']);
      }
    }
  }

  back() {
    if (this.fromReview) {
      this.router.navigate(['/add-member/review']);
    } else {
      this.router.navigate(['/members']);
    }
  }

  isFormValid(): boolean {
      return !!(this.email && this.isEmailValid(this.email) && this.displayName && this.firstName && this.lastName);
    }

    isEmailValid(email: string): boolean {
      // Simple email regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
