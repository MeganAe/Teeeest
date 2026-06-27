export class ExamResultEntity {
  id: string
  examRequestId: string
  result: string
  fileUrl?: string
  validatedBy: string
  validatedAt: Date
}