import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {

  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) { }

  // Method to get the list of coins with their current prices
  getCoins(): Observable<any> {
    return this.http.get(`${this.apiUrl}/coins/markets?vs_currency=usd`);
  }

  // Method to get details for a specific coin (e.g., Bitcoin)
  getCoinDetails(coinId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/coins/${coinId}`);
  }

}
