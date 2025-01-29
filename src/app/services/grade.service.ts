import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../models/grade.model';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'https://localhost:7009/api/Grades';

  constructor(private http: HttpClient) {}

  addGrade(grade: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, grade);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${studentId}`);
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