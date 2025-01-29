import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeService } from '../../services/grade.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Grade } from '../../models/grade.model';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.css']
})
export class GradeListComponent{
  studentForm: FormGroup;
  editForm: FormGroup;
  grades: any[] = [];
  student: Student | null = null;
  message: string | null = null;
  displayedColumns: string[] = ['subject', 'score', 'grade', 'note', 'actions'];
  editingGrade: any = null;
  gradeOptions: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  constructor(private fb: FormBuilder, private gradeService: GradeService) {
    this.studentForm = this.fb.group({
      studentId: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      studentId: ['', Validators.required],
      subject: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      gradeLetter: ['', Validators.required],
      note: ['']
    });
  }

 
  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentId = this.studentForm.value.studentId;

      this.grades = [];
      this.student = null;
      this.message = null;

      this.gradeService.getStudentById(studentId).subscribe({
        next: (student) => {
          this.student = student;
          this.loadGrades(studentId);
        },
        error: (error) => {
          this.message = 'Error fetching student information';
        }
      });
    } else {
      this.message = 'Please fill in all required fields';
    }
  }

  loadGrades(studentId: number): void {
    this.gradeService.getGradesByStudentId(studentId).subscribe({
      next: (grades) => {
        this.grades = grades;
        if (grades.length === 0) {
          this.message = 'No grades found for this student';
        } else {
          this.message = 'Grades fetched successfully';
        }
      },
      error: (error) => {
        this.message = 'Error fetching grades';
      }
    });
  }

  editGrade(grade: Grade): void {
    this.editingGrade = grade;
    this.editForm.patchValue({
      score: grade.score,
      gradeLetter: grade.gradeLetter,
      note: grade.note
    });
  }

  onUpdate(): void {
    if (this.editForm.valid && this.editingGrade) {
      const studentId = this.editingGrade.studentId;
      const subject = this.editingGrade.subject;
      const { score, gradeLetter, note } = this.editForm.value;
      this.gradeService.updateGradeByStudentIdAndSubject(studentId!, subject, score, gradeLetter, note).subscribe({
        next: (response) => {
          this.message = 'Grade updated successfully';
          this.loadGrades(studentId!);
          this.editingGrade = null;
        },
        error: (error) => {
          this.message = 'Error updating grade';
        }
      });
    } else {
      this.message = 'Please fill in all required fields';
    }
  }

  deleteGrade(studentId: number, subject: string): void {
    this.gradeService.deleteGradeByStudentIdAndSubject(studentId, subject).subscribe({
      next: () => {
        this.message = 'Grade deleted successfully';
        this.loadGrades(studentId);
      },
      error: (error) => {
        this.message = 'Error deleting grade';
      }
    });
  }
}