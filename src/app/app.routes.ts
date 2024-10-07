import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchBusesComponent } from './search-buses/search-buses.component';
import { ListBusesComponent } from './list-buses/list-buses.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { TicketsConfirmedComponent } from './tickets-confirmed/tickets-confirmed.component';
import { PassengerDetailsComponent } from './passenger-details/passenger-details.component';
import { BusopdbComponent } from './busopdb/busopdb.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageBusesComponent } from './manage-buses/manage-buses.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { ReportsComponent } from './reports/reports.component';
import { AdmindbComponent } from './admindb/admindb.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { ManageBoardingPointsComponent } from './manage-boarding-points/manage-boarding-points.component';
import { DroppingPointComponent } from './dropping-point/dropping-point.component';
import { ManageOperatorsComponent } from './manage-operators/manage-operators.component';
import { SelectSeatComponent } from './select-seat/select-seat.component';
import { BookingComponent } from './bookings/bookings.component';
import { OpBookingsComponent } from './op-bookings/op-bookings.component';
import { AdminGuard } from './Guard/admin.guard';
import { OperatorGuard } from './Guard/operator.guard';
import { UserGuard } from './Guard/user.guard';
export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'search-buses', component: SearchBusesComponent,canActivate: [UserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-buses', component: ListBusesComponent,canActivate:[UserGuard] },
  { path: 'book-ticket', component: BookTicketComponent,canActivate: [UserGuard] },
  { path: 'confirm', component: PassengerDetailsComponent,canActivate: [UserGuard] },
  { path: 'ticketsconfirmed', component: TicketsConfirmedComponent,canActivate: [UserGuard] },
  {path: 'admindb', component: AdmindbComponent,canActivate: [AdminGuard]},
  {path: 'busop',component:BusopdbComponent,canActivate: [OperatorGuard]},
  {path:'manageusers',component:ManageUsersComponent,canActivate: [AdminGuard]},
  {path:'managebuses',component:ManageBusesComponent,canActivate:[OperatorGuard]},
  {path:'amenities',component:AmenitiesComponent,canActivate:[OperatorGuard]},
  {path:'reports',component:ReportsComponent,canActivate: [AdminGuard]},
  { path:'manageprofile',component:ManageProfileComponent,canActivate:[UserGuard]},
  { path: 'manage-boarding-points', component: ManageBoardingPointsComponent,canActivate:[OperatorGuard] },
  { path: 'dropping-point', component: DroppingPointComponent,canActivate:[OperatorGuard] },
  { path: 'managebusoperators', component: ManageOperatorsComponent, canActivate: [AdminGuard] },
  { path: 'select-seat', component: SelectSeatComponent, canActivate: [UserGuard] },
  {path:'booking',component: BookingComponent, canActivate: [AdminGuard]},
  {path:'opbookings',component: OpBookingsComponent, canActivate: [OperatorGuard]}
];
