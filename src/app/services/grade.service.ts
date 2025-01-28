import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Grade {
  id?: number;
  studentName: string;
  subject: string;
  score: number;
  grade: string;
  note?: string;

  constructor(studentName: string, subject: string, score: number, grade: string, note?: string) {
    this.studentName = studentName;
    this.subject = subject;
    this.score = score;
    this.grade = grade;
    this.note = note;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'https://your-api-endpoint.com/api/grades'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  /*getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.baseUrl);
  }

  updateGrade(id: number, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.baseUrl}/${id}`, grade);
  }

  deleteGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }*/

  addGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(this.baseUrl, grade);
  }

  getGradesByStudentId(studentId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.baseUrl}/student/${studentId}`);
  }

  updateGradeByStudentIdAndSubject(studentId: number, subject: string, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.baseUrl}/student/${studentId}/subject/${subject}`, grade);
  }

  deleteGradeByStudentIdAndSubject(studentId: number, subject: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/student/${studentId}/subject/${subject}`);
  }
  
}