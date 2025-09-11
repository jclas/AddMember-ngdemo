import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-edit-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-basic-info.component.html',
  styleUrl: './edit-basic-info.component.css'
})
export class EditBasicInfoComponent implements OnInit {
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
    return !!(this.editMember?.email && this.isEmailValid(this.editMember.email) && this.editMember?.displayName && this.editMember?.firstName && this.editMember?.lastName);
  }

  isEmailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
