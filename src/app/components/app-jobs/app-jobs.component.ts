import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppliedJobsService } from 'src/app/applied-jobs.service';
import { JobsdetailsService } from 'src/app/jobsdetails.service';

@Component({
  selector: 'app-app-jobs',
  templateUrl: './app-jobs.component.html',
  styleUrls: ['./app-jobs.component.scss']
})
export class AppJobsComponent implements OnInit {
  jobsList: any[] = [];
  itemsPerPage: number = 12; 
  currentPage: number = 1; 
  totalPages: number = 0; 
  pages: number[] = []; 
  
  
  displayedJobsList: any[] = [];

  
  // jobId!: string; 
  jobId!: number;

  showUploadPopupFlag: boolean = false;
 
  resumeData: any = {}; // Object to store resume data
  


 
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

  
  apply(item: any) {
    const endpoint = 'https://localhost:7058/api/Applied/ApplyForJob';
  
    this.http.post(endpoint, { jobsObj: item }).subscribe(
      response => {
        console.log('Applied for the job:', response);
        alert("Job applied success")
        console.log(response);
         item.isApplied=true
  
        
       
      }
    );

       }
      
       cancelUpload() {
        this.showUploadPopupFlag = false;
       
       }

       openUploadPopup(jobId: number) {
        this.showUploadPopupFlag = true;
        this.resumeData.jobId = jobId; // Assign the jobId to the resumeData object
      }



      onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.resumeData.resumeFile = file;
      }

      uploadResume() {
        const formData = new FormData();
        formData.append('Name', this.resumeData.name);
        formData.append('Email', this.resumeData.email);
        formData.append('ResumeFile', this.resumeData.resumeFile);
      
        const jobId = this.resumeData.jobId; // Get the jobId from resumeData
      
        this.http.post(`https://localhost:7058/api/uploadsClass/${jobId}`, formData)
          .subscribe(
            response => {
              // Handle the successful response
              console.log('Resume uploaded successfully.');
              this.cancelUpload(); // Close the upload popup
            },
            error => {
              // Handle the error
              console.error('Error uploading resume:', error);
            }
          );
      }
            

  

      downloadResume(jobId: number) {
        const url = `https://localhost:7058/api/uploadsClass/${jobId}/Download`;
    
        this.http.get(url, { responseType: 'blob' })
          .subscribe(
            (response: Blob) => {
              const blob = new Blob([response], { type: 'application/octet-stream' });
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `resume_${jobId}.pdf`; // Provide a suitable filename here
              link.click();
              window.URL.revokeObjectURL(url);
            },
            error => {
              console.error('Error downloading resume:', error);
            }
          );
      }
    }