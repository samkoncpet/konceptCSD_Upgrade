import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-notifications',
  templateUrl: './navbar-notifications.component.html',
  styleUrls: []
})
export class NavbarNotificationsComponent {

  notifications = [
    {
      "title": "Followers" ,
      "icon": "fab fa-twitter" ,
      "icon-color": "bgc-blue-tp1" ,
      "badge" : "- 4" ,
      "badge-color" : "badge-danger"
    },
  
    {
      "title": "New Comments" ,
      "icon": "fa fa-comment" ,
      "icon-color": "bgc-pink-tp1" ,
      "badge" : "+12" ,
      "badge-color" : "badge-info"
    },
  
    {
      "title": "New Orders" ,
      "icon": "fa fa-shopping-cart" ,
      "icon-color": "bgc-success-tp1" ,
      "badge" : "+8" ,
      "badge-color" : "badge-success"
    },
   
    {
      "title": "Finished processing data!" ,
      "icon": "far fa-clock" ,
      "icon-color": "bgc-purple-tp1"
    }
  ]

  messages =
    [
      {
         "name": "Alex" ,
       "img": "avatar.png",
       "time": "a moment ago" ,
       "summary": "Ciao sociis natoque penatibus et auctor ..."
      },
     
      {
       "name": "Susan" ,
       "img": "avatar3.png",
       "time": "20 minutes ago" ,
       "summary": "Vestibulum id ligula porta felis euismod ..."
      },
     
      {
       "name": "Bob" ,
       "img": "avatar4.png",
       "time": "3:15 pm" ,
       "summary": "Nullam quis risus eget urna mollis ornare ..."
      },
     
      {
       "name": "Kate" ,
       "img": "avatar2.png",
       "time": "1:33 pm" ,
       "summary": "Ciao sociis natoque eget urna mollis ornare ..."
      },
     
      {
       "name": "Fred" ,
       "img": "avatar5.png",
       "time": "10:09 am" ,
       "summary": "Vestibulum id penatibus et auctor  ..."
      }
     ]
 
  
  constructor() { }

}
