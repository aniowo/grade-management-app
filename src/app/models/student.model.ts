export class Student {
  id?: number; // Identity column
  studentId: number; // Regular column
  studentName: string;
  studentClass: string;

  constructor(studentId: number, studentName: string, studentClass: string, id?: number) {
    this.id = id;
    this.studentId = studentId;
    this.studentName = studentName;
    this.studentClass = studentClass;
  }
}