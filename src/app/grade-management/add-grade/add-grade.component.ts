import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeService } from '../../services/grade.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-grade',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatOptionModule
  ],
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.css']
})
export class AddGradeComponent {
  gradeForm: FormGroup;
  message: string | null = null;
  grades: string[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  constructor(private fb: FormBuilder, private gradeService: GradeService) {
    this.gradeForm = this.fb.group({
      studentId: ['', Validators.required],
      studentName: ['', Validators.required],
      studentClass: ['', Validators.required],
      subject: ['', Validators.required],
      score: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      grade: ['', Validators.required],
      note: ['']
    });
  }

  onSubmit() {
    if (this.gradeForm.valid) {
      const formData = this.gradeForm.value;
      this.gradeService.addGrade(formData).subscribe({
        next: (response) => {
          this.message = 'Grade added successfully';
          this.gradeForm.reset();
        },
        error: (error) => {
          this.message = 'Error adding grade';
          console.error('Error adding grade', error);
        }
      });
    }
    else {
      this.message = 'Please fill in all required fields';
    }
  }
}