import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { AccountingService } from './accounting.service'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'

@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Get('cash-journal')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getCashJournal(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.accountingService.getCashJournal(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    )
  }

  @Get('ledger')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getLedger(@Query('account') account?: string) {
    return this.accountingService.getLedger(account)
  }

  @Get('balance-sheet')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getBalanceSheet(@Query('date') date?: string) {
    return this.accountingService.getBalanceSheet(date ? new Date(date) : new Date())
  }

  @Get('income-statement')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getIncomeStatement(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.accountingService.getIncomeStatement(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    )
  }

  @Get('treasury')
  @Roles(Role.ADMIN, Role.COMPTABLE, Role.PERCEPTEUR)
  async getTreasury() {
    return this.accountingService.getTreasury()
  }

  @Post('expenses')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async createExpense(@Body() dto: CreateExpenseDto, @CurrentUser('id') userId: string) {
    return this.accountingService.createExpense(dto, userId)
  }

  @Get('expenses')
  @Roles(Role.ADMIN, Role.COMPTABLE)
  async getExpenses(@Query() query: any) {
    return this.accountingService.getExpenses(query)
  }
}