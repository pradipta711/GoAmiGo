
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Observable} from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';




@Injectable()

export class FileService {
    images = [];
    constructor(private http:Http){}

    // downloadFile(file:String){
    //     var body = {filename:file};

    //     console.log("filename", file)

    //     return this.http.post('http://localhost:8080/file/download',body,{
    //         responseType : 'blob',
    //         headers:new HttpHeaders().append('Content-Type','application/json')
    //     });
    // }


    displayImage(){
        return this.http.get('http://localhost:8080/file/getimages').map(res=>res.json())
    }
    


}