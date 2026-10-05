import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-duplicate-warning',
  imports: [RouterLink],
  templateUrl: './duplicate-warning.html',
  styleUrl: './duplicate-warning.scss',
})
export class DuplicateWarning {
  readonly visible = input(false);

  readonly ticketId = input<string | null>(null);

  readonly dismiss = output<void>();
}
