import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SekyuGuard } from './services/sekyu.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'marketplace', component: MarketplaceComponent, canActivate: [SekyuGuard]},
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
