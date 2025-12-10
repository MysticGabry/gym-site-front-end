import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  auth = inject(AuthService);
  http = inject(HttpClient);

  username: string | null = null;
  email: string = '';
  newEmail: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  showOldPw = false;
  showNewPw = false;


  orders: any[] = [];

  ngOnInit(): void {
    this.username = this.auth.username;
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<any[]>(`http://localhost:8080/api/orders/mine`)
      .subscribe({
        next: (orders) => {
          console.log("ORDINI RICEVUTI:", orders);
          this.orders = orders;
        },
        error: (err) => console.error("Errore caricamento ordini:", err)
      });
  }

  updateEmail() {
    this.http.put('http://localhost:8080/api/user/email', {
      email: this.newEmail
    }).subscribe({
      next: () => {
        alert("Email aggiornata!");
        this.email = this.newEmail;
      },
      error: () => alert("Errore aggiornamento email")
    });
  }

  updatePassword() {
    this.http.put('http://localhost:8080/api/user/password', {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        alert("Password aggiornata!");
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: () => alert("Errore aggiornamento password")
    });
  }
}
