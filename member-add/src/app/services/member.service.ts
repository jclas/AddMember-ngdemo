import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private membersSubject = new BehaviorSubject<Member[]>([]);
  public members$ = this.membersSubject.asObservable();

  private currentMemberSubject = new BehaviorSubject<Partial<Member>>({});
  public currentMember$ = this.currentMemberSubject.asObservable();

  private nextId = 1;

  constructor() {
    // Load members from localStorage if available
    const savedMembers = localStorage.getItem('members');
    if (savedMembers) {
      const members = JSON.parse(savedMembers);
      this.membersSubject.next(members);
      this.nextId = Math.max(...members.map((m: Member) => m.id || 0), 0) + 1;
    }
  }

  getMembers(): Member[] {
    return this.membersSubject.value;
  }

  addMember(member: Member): void {
    const members = this.membersSubject.value;
    const newMember = { ...member, id: this.nextId++ };
    const updatedMembers = [...members, newMember];
    this.membersSubject.next(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  }

  updateCurrentMember(memberData: Partial<Member>): void {
    const current = this.currentMemberSubject.value;
    this.currentMemberSubject.next({ ...current, ...memberData });
  }

  getCurrentMember(): Partial<Member> {
    return this.currentMemberSubject.value;
  }

  clearCurrentMember(): void {
    this.currentMemberSubject.next({});
  }

  deleteMember(id: number): void {
    const members = this.membersSubject.value;
    const updatedMembers = members.filter(member => member.id !== id);
    this.membersSubject.next(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  }
}
