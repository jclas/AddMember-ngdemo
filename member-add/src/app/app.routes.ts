import { Routes } from '@angular/router';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberBasicInfoComponent } from './components/member-basic-info/member-basic-info.component';
import { MemberAddressComponent } from './components/member-address/member-address.component';
import { MemberContactComponent } from './components/member-contact/member-contact.component';
import { MemberReviewComponent } from './components/member-review/member-review.component';

export const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'members', component: MemberListComponent },
  { path: 'add-member/basic', component: MemberBasicInfoComponent },
  { path: 'add-member/address', component: MemberAddressComponent },
  { path: 'add-member/contact', component: MemberContactComponent },
  { path: 'add-member/review', component: MemberReviewComponent }
];
