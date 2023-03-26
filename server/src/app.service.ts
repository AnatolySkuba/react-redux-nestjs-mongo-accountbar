import { Injectable } from '@nestjs/common';
import { Company, Prisma } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanies(): Promise<Company[]> {
    console.log(11, 'prisma.company.findMany()');
    const res = this.prisma.company.findMany();
    const res2 = await this.prisma.company.findMany();
    console.log(13, res, res2[0]);

    return res;
  }

  async getMaxAccount() {
    const companyWithMaxAccount = await this.prisma.company.findMany({
      orderBy: {
        account: 'desc',
      },
      take: 1,
      select: {
        account: true,
      },
    });

    return companyWithMaxAccount.length
      ? companyWithMaxAccount[0].account
      : null;
  }

  async createCompany(data: Prisma.CompanyCreateInput) {
    return this.prisma.company.create({ data });
  }

  async updateAccount(id: string) {
    return this.prisma.company.update({
      where: { id },
      data: { payday: new Date() },
    });
  }
}
