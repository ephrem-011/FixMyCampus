import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../../Core/models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5000/api/tickets';

  getTickets(
    building?: string,
    status?: string
  ): Observable<Ticket[]> {
    let params = new HttpParams();

    if (building) {
      params = params.set('building', building);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Ticket[]>(this.apiUrl, { params });
  }

  getMyTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/my`);
  }

  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
    return this.http.post<Ticket>(this.apiUrl, ticket);
  }
}