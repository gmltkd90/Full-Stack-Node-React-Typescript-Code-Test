import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }
  
  @Get('total')
  async getTotalAmount() {
    return { total: await this.invoicesService.getTotalAmount() };
  }
  
  @Get(':id')
  async getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return await this.invoicesService.getInvoiceById(id);
  }


}
