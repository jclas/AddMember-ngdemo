import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];

  constructor(
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit() {
    this.memberService.members$.subscribe(members => {
      this.members = members;
    });
  }

  addMember() {
    this.memberService.clearCurrentMember();
    this.router.navigate(['/add-member/basic']);
  }

  deleteMember(id: number) {
    if (confirm('Are you sure you want to delete this member?')) {
      this.memberService.deleteMember(id);
    }
  }
}
