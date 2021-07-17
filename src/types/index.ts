export type Role = 'student' | 'coordinator' | 'admin'

export type AttemptStatus = 'in-progress' | 'completed' | 'expired'

export interface Answer {
  examItem: string
  answer: string[]
  hasPlagiarism: boolean
}

export interface UserToken {
  email: string
  id: string
}

export interface CourseGrades {
  courseName: string
  courseId: string
  courseSlug: string
  exams: {
    slug: string
    label: string
    id: string
    weight: number
    weightPercentage: string
    grade: number
  }[]
  courseTotal: number
}
