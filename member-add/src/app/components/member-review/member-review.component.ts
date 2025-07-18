import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-review.component.html',
  styleUrl: './member-review.component.css'
})
export class MemberReviewComponent implements OnInit {
  memberData: Partial<Member> = {};

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.memberData = this.memberService.getCurrentMember();
    
    // Redirect to basic info if no data
    if (!this.memberData.email) {
      this.router.navigate(['/add-member/basic']);
    }
  }

  save() {
    if (this.isDataComplete()) {
      this.memberService.addMember(this.memberData as Member);
      this.memberService.clearCurrentMember();
      this.router.navigate(['/members']);
    }
  }

  back() {
    this.router.navigate(['/add-member/contact']);
  }

  edit(section: string) {
    switch (section) {
      case 'basic':
        this.router.navigate(['/add-member/basic']);
        break;
      case 'address':
        this.router.navigate(['/add-member/address']);
        break;
      case 'contact':
        this.router.navigate(['/add-member/contact']);
        break;
    }
  }

  isDataComplete(): boolean {
    return !!(
      this.memberData.email &&
      this.memberData.displayName &&
      this.memberData.firstName &&
      this.memberData.lastName &&
      this.memberData.street &&
      this.memberData.city &&
      this.memberData.state &&
      this.memberData.postalCode &&
      this.memberData.phoneNumber &&
      this.memberData.birthdate
    );
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
