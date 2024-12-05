import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path based on your project structure

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  // Grab all invoices
  async findAll() {
    try {
      const invoices = await this.prisma.invoice.findMany();

      if (!invoices || invoices.length === 0) {
        throw new NotFoundException('No invoices found');
      }

      return invoices;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while retrieving invoices');
    }
  }

  // Grab invoice per ID
  async getInvoiceById(id: number) {
    try {
      const invoice = await this.prisma.invoice.findUnique({
        where: { id },
      });

      if (!invoice) {
        throw new NotFoundException(`Invoice with ID ${id} not found`);
      }

      return invoice;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while retrieving the invoice');
    }
  }

  // Grab total amount of all invoices due by due date
  async getTotalAmount(): Promise<number> {
    try {
      const invoices = await this.prisma.invoice.findMany({
        where: {
          paid: false, // unpaid invoices only
          due_date: {
            gt: new Date(), // only invoices due by
          },
        },
      });

      if (!invoices || invoices.length === 0) {
        throw new NotFoundException('No unpaid invoices found with a valid due date');
      }

      return invoices.reduce((total, invoice) => total + invoice.amount, 0);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while calculating the total amount');
    }
  }
}
