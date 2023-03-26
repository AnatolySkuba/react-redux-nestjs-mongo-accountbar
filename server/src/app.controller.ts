import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Company } from '@prisma/client';

import { AppService } from './app.service';

@Controller('companies')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getCompanies(): Promise<Company[]> {
    console.log(12, 'getCompanies');
    return this.appService.getCompanies();
  }

  @Post()
  async createCompany(@Body() newCompany: Company): Promise<Company> {
    const maxAccount = await this.appService.getMaxAccount();
    return this.appService.createCompany({
      ...newCompany,
      account: typeof maxAccount === 'number' ? maxAccount + 1 : 0,
    });
  }

  @Put(':id')
  async updateAccount(@Param('id') id: string): Promise<Company> {
    return this.appService.updateAccount(id);
  }
}
