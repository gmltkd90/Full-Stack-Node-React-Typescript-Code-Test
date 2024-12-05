import React from 'react';

interface InvoiceModalProps {
  invoice: {
    id: number;
    vendor_name: string;
    amount: number;
    due_date: string;
    description: string;
    paid: boolean;
  };
  onClose: () => void;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Invoice Details</h2>
        <button onClick={onClose}>Close</button>
        <table>
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{invoice.id}</td>
            </tr>
            <tr>
              <td>Vendor Name:</td>
              <td>{invoice.vendor_name}</td>
            </tr>
            <tr>
              <td>Amount:</td>
              <td>${invoice.amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Due Date:</td>
              <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{invoice.description}</td>
            </tr>
            <tr>
              <td>Paid:</td>
              <td>{invoice.paid ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceModal;
