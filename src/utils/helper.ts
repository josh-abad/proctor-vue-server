import Course from '../models/course'
import { ExamDocument } from '../models/exam'
import { Event } from '../types'

const isAfterToday = (date: Date): boolean => {
  const today = new Date().toDateString()
  return new Date(date.toDateString()) > new Date(today)
}

const getEvents = async (exams: ExamDocument[]): Promise<Event[]> => {
  const events: Event[] = []
  for (const exam of exams) {
    if (exam.startDate && exam.endDate) {
      const { name } = await Course.findById(exam.course) ?? { name: '' }
      const sharedEventInfo = {
        location: name,
        locationUrl: `/courses/${exam.course}`,
        subject: exam.label,
        subjectId: exam.id,
        subjectUrl: `/courses/${exam.course}/exams/${exam.id}`
      }

      if (isAfterToday(exam.startDate)) {
        const openEvent: Event = {
          ...sharedEventInfo,
          action: 'opens',
          date: exam.startDate
        }
        events.push(openEvent)
      }

      if (isAfterToday(exam.endDate)) {
        const closeEvent: Event = {
          ...sharedEventInfo,
          action: 'closes',
          date: exam.endDate
        }
        events.push(closeEvent)
      }
    }
  }
  return events
    .filter((event, _i, self) => (
      event.action === 'closes'
        ? !self.some(e => e.subjectId === event.subjectId && e.action === 'opens')
        : true
    ))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
    .reverse()
}

export default { getEvents }
