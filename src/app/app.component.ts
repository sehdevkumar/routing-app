import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing-app';

  appRoutes = [
    'first-child',
    'first-child/second-child',
    'first-child/second-child/third-child'
  ]

}
