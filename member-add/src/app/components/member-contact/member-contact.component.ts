  import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-member-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-contact.component.html',
  styleUrl: './member-contact.component.css'
})
export class MemberContactComponent implements OnInit {
  phoneNumber: string = '';
  birthdate: string = '';

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    const currentMember = this.memberService.getCurrentMember();
    this.phoneNumber = currentMember.phoneNumber || '';
    this.birthdate = currentMember.birthdate || '';
  }

  onPhonePaste(event: ClipboardEvent) {
    const pasted = event.clipboardData && event.clipboardData.getData('text') ? event.clipboardData.getData('text') : '';
    this.onPhoneInput(pasted);
    event.preventDefault();
  }

    onPhoneInput(value: string) {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');
      let formatted = digits;
      if (digits.length > 3 && digits.length <= 6) {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3);
      } else if (digits.length > 6) {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3, 6) + '-' + digits.slice(6, 10);
      }
      this.phoneNumber = formatted;
    }

  next() {
    if (this.isFormValid()) {
      this.memberService.updateCurrentMember({
        phoneNumber: this.phoneNumber,
        birthdate: this.birthdate
      });
      this.router.navigate(['/add-member/review']);
    }
  }

  back() {
    this.memberService.updateCurrentMember({
      phoneNumber: this.phoneNumber,
      birthdate: this.birthdate
    });
    this.router.navigate(['/add-member/address']);
  }

  isFormValid(): boolean {
      return !!(this.phoneNumber && this.isPhoneValid(this.phoneNumber) && this.birthdate);
    }

    isPhoneValid(phone: string): boolean {
    // US phone number pattern: 555-123-4567 or 555.123.4567
      return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  }
}
