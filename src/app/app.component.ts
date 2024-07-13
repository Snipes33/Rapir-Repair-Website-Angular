import {Component} from '@angular/core';
import {UserStoargeService} from './basic/services/storage/user-stoarge.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'RapidRepairWeb';

  isClientLoggedIn: boolean = UserStoargeService.isClientLoggedIn();
  isCompanyLoggedIn: boolean = UserStoargeService.isCompanyLoggedIn();

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.isClientLoggedIn = UserStoargeService.isClientLoggedIn();
      this.isCompanyLoggedIn = UserStoargeService.isCompanyLoggedIn();
    })
  }

  logout() {
    UserStoargeService.signOut();
    this.router.navigateByUrl('login');
  }
}
