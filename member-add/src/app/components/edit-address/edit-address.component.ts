import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-address.component.html',
  styleUrl: './edit-address.component.css'
})
export class EditAddressComponent implements OnInit {
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
    return !!(this.editMember?.street && this.editMember?.city && this.editMember?.state && this.editMember?.postalCode);
  }
}
