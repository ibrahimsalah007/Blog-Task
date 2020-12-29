import { Component, OnInit } from '@angular/core';
import { PusherService } from 'src/app/pusher.service';
import { DataService } from 'src/app/shared/data service/data.service';
import { TokenService } from 'src/app/shared/token service/token.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
logged=false
view=false;
notifications:any;
user:any
count=0
  constructor(private tokenService:TokenService,private dataService:DataService,private pusherService:PusherService) { 
   
  }

  ngOnInit(): void {
    this.dataService.get('user/current').subscribe(
      (response:any) => {
        console.log("res",response)
        this.user = response
        this.pusherService.subScribeToChannel('Notification', ['commentCreated.' +  this.user.id], (data) => {
          // console.log(data)
          console.log('data from pusher', data)
          if(data)
          {
            this.count ++;
          }
        });
      }
    )
    
    if(this.tokenService.getToken())
    {
      this.logged = true
    }
  else
  {
    this.logged = false
  }
  }
  getNotifications()
{
  this.count = 0
  this.dataService.get('notifications').subscribe(
    (response:any) => {
      console.log("res",response)
      this.notifications = response
    }
  )

}
logout()
{
  this.tokenService.removeToken()
  this.logged = false
}
}
