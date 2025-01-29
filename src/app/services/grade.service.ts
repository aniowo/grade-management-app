import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Grade {
  studentId?: number;
  studentName: string;
  studentClass?: string;
  subject: string;
  score: number;
  gradeLetter: string;
  note?: string;

  constructor(studentId: number, studentName: string, studentClass: string, subject: string, score: number, gradeLetter: string, note?: string) {
    this.studentId = studentId;
    this.studentName = studentName;
    this.studentClass = studentClass;
    this.subject = subject;
    this.score = score;
    this.gradeLetter = gradeLetter;
    this.note = note;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'https://localhost:7009/api/Grades';

  constructor(private http: HttpClient) {}
  
  addGrade(grade: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, grade);
  }

  getGradesByStudentId(studentId: number): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.baseUrl}/student/${studentId}`);
  }

  updateGradeByStudentIdAndSubject(studentId: number, subject: string, score: number, gradeLetter: string, note: string): Observable<any> {
    const updateGradeDto = { score, gradeLetter, note };
    return this.http.put<any>(`${this.baseUrl}/student/${studentId}/subject/${subject}`, updateGradeDto);
  }


  deleteGradeByStudentIdAndSubject(studentId: number, subject: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/student/${studentId}/subject/${subject}`);
  }
  
}