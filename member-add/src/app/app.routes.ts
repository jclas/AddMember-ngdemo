import { Routes } from '@angular/router';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberBasicInfoComponent } from './components/member-basic-info/member-basic-info.component';
import { MemberAddressComponent } from './components/member-address/member-address.component';
import { MemberOtherInfoComponent } from './components/member-other-info/member-other-info.component';
import { MemberReviewComponent } from './components/member-review/member-review.component';

export const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' },
  { path: 'members', component: MemberListComponent },
  { path: 'add-member/basic', component: MemberBasicInfoComponent },
  { path: 'add-member/address', component: MemberAddressComponent },
  { path: 'add-member/other', component: MemberOtherInfoComponent },
  { path: 'add-member/review', component: MemberReviewComponent },
  { path: 'edit-member/basic/:id', loadComponent: () => import('./components/edit-basic-info/edit-basic-info.component').then(m => m.EditBasicInfoComponent) },
  { path: 'edit-member/address/:id', loadComponent: () => import('./components/edit-address/edit-address.component').then(m => m.EditAddressComponent) },
  { path: 'edit-member/other/:id', loadComponent: () => import('./components/edit-other-info/edit-other-info.component').then(m => m.EditOtherInfoComponent) },
];
