import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seperate',
  templateUrl: './seperate.component.html',
  styleUrls: ['./seperate.component.scss']
})
export class SeperateComponent implements OnInit {
  uploadedJobs: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUploadedJobs() 
  }
  getUploadedJobs() {
    const url = 'https://localhost:7058/api/uploadsClass';

    this.http.get(url)
      .subscribe(data=>{
        this.uploadedJobs= data
      })

  }
}