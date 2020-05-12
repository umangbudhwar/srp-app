import { Component,ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from './shared/service/authentication.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public loginService : AuthenticationService) {
  }

}
