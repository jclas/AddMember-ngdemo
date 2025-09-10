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
  readonly MAX_PHONE_DIGITS = 10;
  readonly MAX_PHONE_LENGTH = 12; //10 digits + 2 separators
  fromReview = false;

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fromReview = !!history.state.fromReview;
    const currentMember = this.memberService.getCurrentMember();
    this.phoneNumber = currentMember.phoneNumber || '';
    this.birthdate = currentMember.birthdate || '';
  }

  /* next page */
  next() {
    if (this.isFormValid()) {
      this.memberService.updateCurrentMember({
        phoneNumber: this.phoneNumber,
        birthdate: this.birthdate
      });
      if (this.fromReview) {
        this.router.navigate(['/add-member/review']);
      } else {
        this.router.navigate(['/add-member/review']); // This is the last step, so always go to review
      }
    }
  }

  back() {
    if (this.fromReview) {
      this.router.navigate(['/add-member/review']);
    } else {
      this.router.navigate(['/add-member/address']);
    }
  }

  isFormValid(): boolean {
    return !!(this.phoneNumber && this.isPhoneValid(this.phoneNumber) && this.birthdate);
  }

  isPhoneValid(phone: string): boolean {
    // US phone number pattern: 555-123-4567 and must contain exactly 10 digits
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return false;
    // Check for any extra characters after the 10th digit
    const reg = /^(\d{3}-\d{3}-\d{4})(.*)$/;
    // const match = phone.match(/^(\d{3}-\d{3}-\d{4})(.*)$/)
    const match = phone.match(reg)

    if (match && match[2].trim().length > 0) return false;
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  }

  onPhoneKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    console.log("event.key:" + event.key);
    
    if (event.key && event.key.length == 1) {
      if (event.ctrlKey && (event.key.toLowerCase() =="c" || event.key.toLowerCase() == "v")) {
        console.log("control c or v combo!");
      } else {
        console.log("else...");

        if (input.value.length >= this.MAX_PHONE_LENGTH || !/[0-9]/.test(event.key)) {
          event.preventDefault(); //block non-digit characters or too many characters
          return;
        }
      }
    }
  }

  onPhoneInput(event: Event) {
    let input = event.target as HTMLInputElement;
    let digits = input.value.replace(/\D/g, '');
    digits = digits.slice(0, this.MAX_PHONE_DIGITS);

    let result = "";

    for (let i=0; i < digits.length; i++) {
      if (i == 3 || i == 6) {
        result += "-";
      }
      result += digits[i];
    }
    
    input.value = result; //this line is needed to correct the input immediately, since the next line won't update the input because of where are in the event cycle.
    this.phoneNumber = result;
  }

}
