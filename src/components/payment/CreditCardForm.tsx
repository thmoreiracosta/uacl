import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface CreditCardFormProps {
  onSubmit: (values: CreditCardFormValues) => void;
  isLoading?: boolean;
}

export interface CreditCardFormValues {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({ onSubmit, isLoading = false }) => {
  const formik = useFormik<CreditCardFormValues>({
    initialValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required('Número do cartão é obrigatório')
        .matches(/^\d{16}$/, 'Número do cartão deve ter 16 dígitos'),
      cardName: Yup.string()
        .required('Nome no cartão é obrigatório'),
      expiryDate: Yup.string()
        .required('Data de validade é obrigatória')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido. Use MM/AA'),
      cvv: Yup.string()
        .required('CVV é obrigatório')
        .matches(/^\d{3,4}$/, 'CVV deve ter 3 ou 4 dígitos'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    }
    
    return value;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    formik.setFieldValue('cardNumber', formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    formik.setFieldValue('expiryDate', value);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Número do Cartão
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formik.values.cardNumber}
          onChange={handleCardNumberChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border ${
            formik.touched.cardNumber && formik.errors.cardNumber ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
          maxLength={19}
          disabled={isLoading}
        />
        {formik.touched.cardNumber && formik.errors.cardNumber && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.cardNumber}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
          Nome no Cartão
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={formik.values.cardName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full px-3 py-2 border ${
            formik.touched.cardName && formik.errors.cardName ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
          disabled={isLoading}
        />
        {formik.touched.cardName && formik.errors.cardName && (
          <p className="mt-1 text-sm text-red-500">{formik.errors.cardName}</p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
            Data de Validade
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            placeholder="MM/AA"
            value={formik.values.expiryDate}
            onChange={handleExpiryDateChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border ${
              formik.touched.expiryDate && formik.errors.expiryDate ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            maxLength={5}
            disabled={isLoading}
          />
          {formik.touched.expiryDate && formik.errors.expiryDate && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.expiryDate}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            placeholder="123"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border ${
              formik.touched.cvv && formik.errors.cvv ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
            maxLength={4}
            disabled={isLoading}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <p className="mt-1 text-sm text-red-500">{formik.errors.cvv}</p>
          )}
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {isLoading ? 'Processando...' : 'Pagar com Cartão de Crédito'}
        </button>
      </div>
    </form>
  );
};