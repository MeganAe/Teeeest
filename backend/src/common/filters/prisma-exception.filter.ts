import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    let status = 400
    let message = 'Erreur base de données'

    switch (exception.code) {
      case 'P2002':
        message = 'Un enregistrement avec ces données existe déjà'
        break
      case 'P2003':
        message = 'Référence invalide'
        break
      case 'P2025':
        status = 404
        message = 'Enregistrement non trouvé'
        break
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      code: exception.code,
    })
  }
}