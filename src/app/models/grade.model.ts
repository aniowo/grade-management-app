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