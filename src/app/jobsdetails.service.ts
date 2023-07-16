import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsdetailsService {
  selectedJob: any;

  constructor(private http:HttpClient) { }


baseUrl = 'https://localhost:7058/api/Jobs/Addjobsdata';
Url = 'https://localhost:7058/api/Jobs/Jobs';
applicantUrl = "https://localhost:7058/api/applicant";
applyjobsurl = "https://localhost:7058/api/Applied/ApplyForJob";
getappliedurl = "https://localhost:7058/api/Applied/AppliedJobs";


resumesupload = "https://localhost:7058/api/Resumes"




//client jobs get method
getmethod(): Observable<any>{
  return this.http.get<any>(this.Url)
}

//client jobs post method
postmethod(data:any): Observable<any>{

  return this.http.post(this.baseUrl,data)
}

//client jobs edit method
editmethod(jobId: number, data: any): Observable<any> {
  const editurl = `https://localhost:7058/api/Jobs/editjobsdata/${jobId}`;
  return this.http.put(editurl, data);
}


getapplicant(): Observable<any>{
  return this.http.get<any>(this.applicantUrl)
}



getapplied(){
  return this.http.get(this.getappliedurl)
}


getResume(id: number): Observable<any> {
  const url = `https://localhost:7058/api/ResumeClass/${id}`;
  return this.http.get(url);
}






deletemethod(jobId: number){
  const deleteurl = `https://localhost:7058/api/Jobs/deletejobsdata/${jobId}`;
  return this.http.delete(deleteurl)
}






}
