import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

const SmallWidthBreakpoint = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;

  events: string[] = [];
  opened = true;

  private mobileQueryListener: () => void;

  users: Observable<User[]>;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private userService: UserService) {
    this.mobileQuery = media.matchMedia(`(max-width: ${SmallWidthBreakpoint}px)`);
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.users.subscribe((data) => {
      console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  isScreenSmall(): boolean {
    return this.mobileQuery.matches;
  }
}
