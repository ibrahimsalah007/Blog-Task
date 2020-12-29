import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data service/data.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts:Array<any>=[]
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
   // this.posts.length = 10
    this.dataService.get("posts").subscribe(
      (response:any) => {
        console.log("res",response)
        this.posts = response
      }
    )
  }

}
