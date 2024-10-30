import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/Prisma.service';
import { Prisma, Employee } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async find(
    employeeWhereUniqueInput: Prisma.EmployeeWhereUniqueInput,
    select?: Prisma.EmployeeSelect,
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: employeeWhereUniqueInput,
      select,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
    select?: Prisma.EmployeeSelect;
  }): Promise<Employee[]> {
    const { skip, take, cursor, where, orderBy, select } = params;

    return this.prisma.employee.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select,
    });
  }

  async create(
    data: Prisma.EmployeeCreateInput,
    select?: Prisma.EmployeeSelect,
  ): Promise<Employee> {
    return this.prisma.employee.create({
      data,
      select,
    });
  }

  async update(params: {
    where: Prisma.EmployeeWhereUniqueInput;
    data: Prisma.EmployeeUpdateInput;
    select?: Prisma.EmployeeSelect;
  }): Promise<Employee> {
    const { where, data, select } = params;
    return this.prisma.employee.update({
      data,
      where,
      select,
    });
  }

  async delete(
    where: Prisma.EmployeeWhereUniqueInput,
    select?: Prisma.EmployeeSelect,
  ): Promise<Employee> {
    return this.prisma.employee.delete({
      where,
      select,
    });
  }
}
