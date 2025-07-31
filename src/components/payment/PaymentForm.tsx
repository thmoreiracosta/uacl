import React, { useState } from 'react';
import { CreditCardForm }  from './CreditCardForm';
import type {CreditCardFormValues}  from './CreditCardForm';
import { PixPayment } from './PixPayment';

interface PaymentFormProps {
  amount: number;
  description: string;
  onPaymentComplete: () => void;
}

type PaymentMethod = 'credit-card' | 'pix';

export const PaymentForm: React.FC<PaymentFormProps> = ({ amount, description, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreditCardSubmit = async (values: CreditCardFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Process payment
      console.log('Processing credit card payment:', values);
      
      onPaymentComplete();
    } catch (err) {
      setError('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.');
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePixPayment = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Process payment
      console.log('Processing PIX payment');
      
      // In a real app, you would wait for PIX confirmation
      // For demo purposes, we'll just complete the payment
      onPaymentComplete();
    } catch (err) {
      setError('Ocorreu um erro ao gerar o código PIX. Por favor, tente novamente.');
      console.error('PIX error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-primary mb-2">Resumo do Pagamento</h3>
        <div className="bg-gray-50 p-4 border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Descrição:</span>
            <span className="font-medium">{description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Valor:</span>
            <span className="font-bold text-primary">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
            </span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-serif font-bold text-primary mb-4">Método de Pagamento</h3>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('credit-card')}
            className={`flex-1 py-3 px-4 border ${
              paymentMethod === 'credit-card'
                ? 'border-secondary bg-secondary bg-opacity-10'
                : 'border-gray-300'
            } rounded-md flex items-center justify-center space-x-2`}
            disabled={isLoading}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            <span>Cartão de Crédito</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('pix')}
            className={`flex-1 py-3 px-4 border ${
              paymentMethod === 'pix'
                ? 'border-secondary bg-secondary bg-opacity-10'
                : 'border-gray-300'
            } rounded-md flex items-center justify-center space-x-2`}
            disabled={isLoading}
          >
            <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.9999 2C6.47774 2 2 6.47774 2 12.0001C2 17.5223 6.47774 22 11.9999 22C17.5222 22 22 17.5223 22 12.0001C22 6.47774 17.5222 2 11.9999 2ZM16.5 8C17.3284 8 18 7.32843 18 6.5C18 5.67157 17.3284 5 16.5 5C15.6716 5 15 5.67157 15 6.5C15 7.32843 15.6716 8 16.5 8ZM7.5 8C8.32843 8 9 7.32843 9 6.5C9 5.67157 8.32843 5 7.5 5C6.67157 5 6 5.67157 6 6.5C6 7.32843 6.67157 8 7.5 8ZM11.9999 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 11.9999 5.5C8.41002 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41002 18.5 11.9999 18.5Z"></path>
            </svg>
            <span>PIX</span>
          </button>
        </div>
      </div>
      
      {paymentMethod === 'credit-card' ? (
        <CreditCardForm onSubmit={handleCreditCardSubmit} isLoading={isLoading} />
      ) : (
        <PixPayment amount={amount} onConfirm={handlePixPayment} isLoading={isLoading} />
      )}
    </div>
  );
};
