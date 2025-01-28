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
  message: string | null = null;
  displayedColumns: string[] = ['subject', 'score', 'grade', 'note', 'actions'];
  editingGrade: any = null;
  gradeOptions: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  constructor(private fb: FormBuilder, private gradeService: GradeService) {
    this.studentForm = this.fb.group({
      studentId: ['', Validators.required],
      studentName: ['', Validators.required],
      studentClass : ['', Validators.required]

    });

    this.editForm = this.fb.group({
      studentId: ['', Validators.required],
      subject: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      grade: ['', Validators.required],
      note: ['']
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentId = this.studentForm.value.studentId;
      this.gradeService.getGradesByStudentId(studentId).subscribe({
        next: (grades) => {
          this.message = 'Grades fetched successfully';
          this.grades = grades;
        },
        error: (error) => {
          this.message = 'Error fetching grades';
        }
      });
    } else {
      this.message = 'Please fill in all required fields';
    }
  }

  editGrade(grade: any): void {
    this.editingGrade = grade;
    this.editForm.patchValue({
      studentId: grade.studentId,
      subject: grade.subject,
      score: grade.score,
      grade: grade.grade,
      note: grade.note
    });
  }

  onUpdate(): void {
    if (this.editForm.valid) {
      const updatedGrade = this.editForm.value;
      this.gradeService.updateGradeByStudentIdAndSubject(updatedGrade.studentId, updatedGrade.subject, updatedGrade).subscribe({
        next: (response) => {
          this.message = 'Grade updated successfully';
          this.onSubmit(); 
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
    this.gradeService.deleteGradeByStudentIdAndSubject(studentId, subject).subscribe(() => {
      this.onSubmit(); 
    });
  }
}