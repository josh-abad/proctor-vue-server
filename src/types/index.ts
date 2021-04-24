export interface Event {
  location: string;
  locationUrl: string;
  subject: string;
  subjectId: string;
  subjectUrl: string;
  action: string;
  date: Date;
}

export interface UserToken {
  email: string;
  id: string;
}

export interface AttemptToken {
  attemptId: string;
  userId: string;
}
