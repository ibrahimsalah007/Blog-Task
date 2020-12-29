import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
posts:Array<any>=[]
  constructor() { }

  ngOnInit(): void {
    this.posts.length = 10
  }

}
