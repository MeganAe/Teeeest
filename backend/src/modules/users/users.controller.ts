import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AssignRoleDto } from './dto/assign-role.dto'
import { Roles } from '../../common/decorators/roles.decorator'
import { CurrentUser } from '../../common/decorators/user.decorator'
import { Role } from '@prisma/client'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  async findAll(@Query() query: any) {
    return this.usersService.findAll(query)
  }

  @Get('me')
  async getMe(@CurrentUser() user: any) {
    return user
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async findById(@Param('id') id: string) {
    return this.usersService.findById(id)
  }

  @Post()
  @Roles(Role.ADMIN)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Put(':id/role')
  @Roles(Role.ADMIN)
  async assignRole(@Param('id') id: string, @Body() assignRoleDto: AssignRoleDto) {
    return this.usersService.assignRole(id, assignRoleDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id)
  }

  @Post(':id/activate')
  @Roles(Role.ADMIN)
  async activate(@Param('id') id: string) {
    return this.usersService.activate(id)
  }

  @Post(':id/deactivate')
  @Roles(Role.ADMIN)
  async deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(id)
  }
}