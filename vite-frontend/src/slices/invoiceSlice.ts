import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Invoice {
  id: number;
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  paid: boolean;
}

interface InvoiceState {
  invoices: Invoice[];
  status: 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  status: 'loading',
  error: null,
};

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
      state.status = 'succeeded';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading: (state) => {
      state.status = 'loading';
    },
  },
});

export const { setInvoices, setError, setLoading } = invoiceSlice.actions;

export default invoiceSlice.reducer;
