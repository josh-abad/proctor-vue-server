export type Role = 'student' | 'coordinator' | 'admin'

export type AttemptStatus = 'in-progress' | 'completed' | 'expired'

export interface UserToken {
  email: string
  id: string
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
