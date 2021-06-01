export type Role = 'student' | 'coordinator' | 'admin'

export interface Event {
  location: string
  locationUrl: string
  subject: string
  subjectId: string
  subjectUrl: string
  action: string
  date: Date
  avatarUrl: string
}

export interface UserToken {
  email: string
  id: string
}

export interface AttemptToken {
  attemptId: string
  userId: string
}

export interface CourseGrades {
  courseName: string
  courseId: string
  exams: {
    label: string
    id: string
    weight: number
    weightPercentage: string
    grade: number
  }[]
  courseTotal: number
}
