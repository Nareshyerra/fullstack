import { Component, OnInit } from '@angular/core';

import { JobsdetailsService } from 'src/app/jobsdetails.service';

@Component({
  selector: 'app-app-applied',
  templateUrl: './app-applied.component.html',
  styleUrls: ['./app-applied.component.scss']
})
export class AppAppliedComponent implements OnInit {
  appliedJobs: any[]=[];
  itemsPerPage: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  pages: number[] = [];

  displayedAppliedJobs: any[] = [];


  constructor(private jobsint: JobsdetailsService) {
    this.totalPages = Math.ceil(this.appliedJobs.length / this.itemsPerPage);
    this.generatePageNumbers();
  }
  ngOnInit() {
    this.appliedJobs=[];
    this.jobsint.getapplied().subscribe((data:any)=>{
    this.appliedJobs = data;
    this.totalPages = Math.ceil(this.appliedJobs.length / this.itemsPerPage);
    this.generatePageNumbers();
    this.updateDisplayedAppliedJobs();


   })
}
updateDisplayedAppliedJobs() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.displayedAppliedJobs = this.appliedJobs.slice(startIndex, endIndex);
}

previousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDisplayedAppliedJobs();
    this.generatePageNumbers();
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updateDisplayedAppliedJobs();
    this.generatePageNumbers();
  }
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updateDisplayedAppliedJobs();
  }
}

generatePageNumbers() {
  this.pages = [];
  for (let i = 1; i <= this.totalPages; i++) {
    this.pages.push(i);
  }
}

  
getresumesbyid="https://localhost:7058/api/Resumes/1";



}
