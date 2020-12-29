import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/data service/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  // afuConfig = {
  //   multiple: false,
  //   formatsAllowed: ".jpg,.png",
  //   maxSize: "1",
  //   uploadAPI:  {
  //     url:"https://example-file-upload-api",
  //     method:"POST",
  //     headers: {
  //    "Content-Type" : "text/plain;charset=UTF-8",
  //   //  "Authorization" : `Bearer ${token}`
  //     },
  //     params: {
  //       'page': '1'
  //     },
  //     responseType: 'blob',
  //   },
  //   theme: "dragNDrop",
  //   hideProgressBar: true,
  //   hideResetBtn: true,
  //   hideSelectBtn: true,
  //   fileNameIndex: true,
  //   replaceTexts: {
  //     selectFileBtn: 'Select Files',
  //     resetBtn: 'Reset',
  //     uploadBtn: 'Upload',
  //     dragNDropBox: 'Drag N Drop',
  //     attachPinBtn: 'Attach Files...',
  //     afterUploadMsg_success: 'Successfully Uploaded !',
  //     afterUploadMsg_error: 'Upload Failed !',
  //     sizeLimit: 'Size Limit'
  //   }
  // };
  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
};
addForm:FormGroup
name = "Tags input";
tagsInput = [];
limit = 5;
header = 'Tags input'
placeholder = "Enter tags";
mode = "success";



  constructor(private _formBuilder:FormBuilder,private dataService:DataService) { }

  ngOnInit(): void {
    this.addForm = this._formBuilder.group(
      {
        title:[''],
        content:[''],
        cover:[''],
        published:[''],
        tages:['']
      }
    )
  }
  displayTags(tag) {
    this.tagsInput = tag;
    console.log("tag",tag,this.tagsInput)
  }
addPost()
{
  console.log("add",this.addForm.value)
  let obj = {
    title:this.addForm.get("title").value,
    content:this.addForm.get("content").value,
    cover:'path/image',
    tags:this.tagsInput,
    published:true

  }
  this.dataService.post("posts",obj).subscribe(
    (response:any) => {
      console.log("res",response)
    }
  )
}
}
