import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {
  readonly MAX_PHONE_DIGITS = 10;
  readonly MAX_PHONE_LENGTH = 12; // 10 digits + 2 separators

  onPhoneKeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key && event.key.length == 1) {
      if (event.ctrlKey && (event.key.toLowerCase() == "c" || event.key.toLowerCase() == "v")) {
        // allow copy/paste
      } else {
        if (input.value.length >= this.MAX_PHONE_LENGTH || !/[0-9]/.test(event.key)) {
          event.preventDefault();
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
    for (let i = 0; i < digits.length; i++) {
      if (i == 3 || i == 6) {
        result += "-";
      }
      result += digits[i];
    }
    input.value = result;
    if (this.editMember) this.editMember.phoneNumber = result;
  }

  isPhoneValid(phone: string): boolean {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) return false;
    const reg = /^(\d{3}-\d{3}-\d{4})(.*)$/;
    const match = phone.match(reg);
    if (match && match[2].trim().length > 0) return false;
    return /^\d{3}-\d{3}-\d{4}$/.test(phone);
  }
  member: Member | undefined;
  editMember: Member | undefined;

  constructor(
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.member = this.memberService.getMembers().find(m => m.id === id);
    this.editMember = this.member ? { ...this.member } : undefined;
  }

  save() {
    if (this.editMember) {
      this.memberService.updateMember(this.editMember);
      this.router.navigate(['/members']);
    }
  }

  cancel() {
    this.router.navigate(['/members']);
  }

  isFormValid(): boolean {
    return !!(this.editMember?.phoneNumber && this.isPhoneValid(this.editMember.phoneNumber) && this.editMember?.birthdate);
  }
}
