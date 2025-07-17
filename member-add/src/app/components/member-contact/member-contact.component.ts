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
    return !!(this.phoneNumber && this.birthdate);
  }
}
