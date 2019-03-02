import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

const SmallWidthBreakpoint = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  @ViewChild('sidenav') sideNav;

  opened = true;

  private mobileQueryListener: () => void;

  users: Observable<User[]>;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private userService: UserService,
              private router: Router) {
    this.mobileQuery = media.matchMedia(`(max-width: ${SmallWidthBreakpoint}px)`);
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sideNav.close();
      }
    });

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  isScreenSmall(): boolean {
    return this.mobileQuery.matches;
  }
}
