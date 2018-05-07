import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { FileService } from '../services/file.service';
import {saveAs} from 'file-saver';
import {ImageGalleryComponent} from './../image-gallery/image-gallery.component';

const uri = 'http://localhost:8080/file/imgtodb';


@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  uploader:FileUploader = new FileUploader({url:uri});
  attachmentList:any = [];
  imageGalleryComponent:ImageGalleryComponent;
  constructor(private fileService: FileService) { 
    this.imageGalleryComponent=new ImageGalleryComponent(fileService);
    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      console.log(response);
      this.attachmentList.push(JSON.parse(response));

  }

  
}

upload(it){
  it.upload();
  this.imageGalleryComponent.ngOnInit();
}

//   download(index){
//     var filename = this.attachmentList[index].uploadname;

//     this.fileService.downloadFile(filename)
//     .subscribe(
//         data => saveAs(data, filename),
//         error => console.error(error)
//     );
// }
  ngOnInit() {
  }

}
