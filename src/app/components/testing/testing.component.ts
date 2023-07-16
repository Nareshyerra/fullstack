import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

  jobsList: any[] = [];
  itemsPerPage: number = 12; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  
  jobId!: number;
  displayedJobsList: any[] = [];
  showUploadPopupFlag: boolean = false;
  resumeData: any = { Name: '', Email: '', ResumeFile: null };
  constructor(private jobsint:JobsdetailsService, private appliedJobsService: AppliedJobsService, private http: HttpClient) { 
    this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
    this.generatePageNumbers();
  }
  updateDisplayedJobs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedJobsList = this.jobsList.slice(startIndex, endIndex);

  

  }
  toggleDetails(item: any) {
    item.showDetails = !item.showDetails;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedJobs();
      this.generatePageNumbers(); 
      window.scrollTo(0, 0);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedJobs();
      // this.generatePageNumbers(); 
    }
  }
 
  generatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
  
  istrue = false
  ngOnInit(): void {
    this.jobsint.getmethod().subscribe(data => {
      this.jobsList = data;
      
      this.totalPages = Math.ceil(this.jobsList.length / this.itemsPerPage);
      this.generatePageNumbers();
      this.updateDisplayedJobs();

      
    });
  }






// Method to open the upload popup and set the selected job ID
showUploadPopup(jobId:number) {
  
  this.showUploadPopupFlag = true;
  // this.jobId = jobId;
}

// Method to cancel the upload and close the popup
cancelUpload() {
  this.showUploadPopupFlag = false;
}

// Method to handle file selection
onFileSelected(event: any) {
  this.resumeData.file = event.target.files[0];
}

uploadResume() {
  const formData = new FormData();
  formData.append('name', this.resumeData.Name);
  formData.append('email', this.resumeData.Email);
  formData.append('file', this.resumeData.Resumefile);

  const apiUrl = `https://localhost:7058/api/uploadsClass/${this.jobId}`;

  this.http.post(apiUrl, formData).subscribe(
    (response) => {
      // Handle success response here
      console.log('Resume uploaded successfully.', response);
      this.showUploadPopupFlag = false;
    }
  );
}







}
