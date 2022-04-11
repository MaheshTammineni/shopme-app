import { Component, OnInit } from '@angular/core';
import { UsersService } from '@shopsite/users';

@Component({
  selector: 'shopsite-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private usersService: UsersService){

  }
  ngOnInit(): void {
      {
        this.usersService.initAppSession();
      }
  }
  title = 'shopeasy';
}
