import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { PusherService } from 'src/app/pusher.service';
import { DataService } from 'src/app/shared/data service/data.service';
import { TokenService } from 'src/app/shared/token service/token.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
id:any;
post:any
  submitForm: FormGroup;
  comments: any=[];
  constructor(private pusherService:PusherService,private router:Router,private tokenService:TokenService,private route:ActivatedRoute, private dataService:DataService, private formBulider:FormBuilder) { }

  ngOnInit(): void {
   // this.socketService.setupSocketConnection();
 

    this.submitForm = this.formBulider.group({
      content: ['', [Validators.required]]
    });
    // this.socket.on('connection', ()=>{
    //   console.log('connected')
    // })
    this.route.paramMap.subscribe(params => {
      console.log('lklkll',params.get('id')) ;
      this.id = params.get('id');
      this.dataService.get(`posts/${this.id}`).subscribe(
        (response:any) => {
          console.log("res",response)
          this.post = response.post;
          this.comments = response.comments;
        }
      )
    })
  }
  submitComment() {
   if(this.tokenService.getToken())
    {this.dataService.post(`comments/${this.id}`,this.submitForm.value).subscribe(
      (response:any) => {
        console.log("res",response)
        this.dataService.get(`posts/${this.id}`).subscribe(
          (response:any) => {
            console.log("res",response)
            this.post = response.post;
            this.comments = response.comments;
          
          }
        )
         this.resetCommentInputs();
      }
    )}
    else
    {
      this.router.navigateByUrl('/login')
    }
    // let createdAt = new Date();
    //  let comment: any = { name, email, message, createdAt };
    // this.post.comments.push(comment);
  }
//   sendMessage(msg: string){
//     this.socket.emit("message", msg);
// }
//  getMessage() {
//      return this.socket
//          .fromEvent("message")
//         // .pipe(map((data) => data.msg));
// }
  // Set Comment Inputs to be empty.
  resetCommentInputs() {

    this.submitForm.get('content').setValue('');
  }
}
