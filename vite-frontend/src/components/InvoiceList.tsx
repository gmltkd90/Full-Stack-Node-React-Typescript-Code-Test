import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInvoices, setError, setLoading } from '../slices/invoiceSlice';
import { RootState } from '../store';
import axios from 'axios';
import InvoiceModal from './InvoiceModal';

const InvoiceList = () => {
  const dispatch = useDispatch();
  const { invoices, status, error } = useSelector((state: RootState) => state.invoices);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get('http://localhost:3000/invoices');
        dispatch(setInvoices(response.data));
      } catch (err: any) {
        dispatch(setError('Failed to fetch invoices.'));
      }
    };

    fetchInvoices();
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>{error}</div>;

  // Open modal on click
  const handleInvoiceClick = (invoice: any) => {
    setSelectedInvoice(invoice);
  };

  // close modal
  const handleCloseModal = () => {
    setSelectedInvoice(null); 
  };

  return (
    <div>
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Description</th>
            <th>Paid</th>
          </tr>
        </thead>
        <tbody>
          {invoices?.map((invoice) => (
            <tr key={invoice.id} onClick={() => handleInvoiceClick(invoice)}>
              <td>{invoice.id}</td>
              <td>{invoice.vendor_name}</td>
              <td>{invoice.amount}</td>
              <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
              <td>{invoice.description}</td>
              <td>{invoice.paid ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInvoice && (
        <InvoiceModal invoice={selectedInvoice} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default InvoiceList;
