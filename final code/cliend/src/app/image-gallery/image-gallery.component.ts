import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {

  ImageList =[];
  img :any;
  constructor(private fs: FileService) { }

  ngOnInit() {
    this.fs.displayImage().subscribe(data => {
       console.log(data.images);
       for(let image of data.images){
         const imageName = "../../assets/uploads/"+image.originalname;
         console.log(imageName);


         this.ImageList.push(imageName);
       }
      //  if(data.success){
      //     data.images.forEach(element => {
      //       const imgurl = "assets/uploads/"+element.imgurl;
      //       this.ImageList.push(new img(imgurl));
            
          });
       }
      }