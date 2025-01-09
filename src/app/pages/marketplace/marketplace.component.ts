import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit{

  coins: any[] = [];
  loading = true;
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
  }

  

  onLogout() {
    this.authService.logout();
  }

}
