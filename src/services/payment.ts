import {api} from '../services/api';

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'boleto' | 'pix';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
}

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  error?: string;
  redirectUrl?: string;
}

// Get available membership plans
export const getMembershipPlans = async (): Promise<MembershipPlan[]> => {
  try {
    const response = await api.get('/payments/membership-plans');
    return response.data;
  } catch (error) {
    console.error('Error fetching membership plans:', error);
    throw error;
  }
};

// Create payment intent for membership
export const createMembershipPaymentIntent = async (
  planId: string,
  paymentMethodType: 'credit_card' | 'boleto' | 'pix'
): Promise<PaymentIntent> => {
  try {
    const response = await api.post('/payments/create-intent', {
      planId,
      paymentMethodType,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Confirm credit card payment
export const confirmCardPayment = async (
  paymentIntentId: string,
  paymentMethodId: string
): Promise<PaymentResult> => {
  try {
    const response = await api.post('/payments/confirm-card', {
      paymentIntentId,
      paymentMethodId,
    });
    return response.data;
  } catch (error) {
    console.error('Error confirming card payment:', error);
    throw error;
  }
};

// Get payment methods for current user
export const getUserPaymentMethods = async (): Promise<PaymentMethod[]> => {
  try {
    const response = await api.get('/payments/payment-methods');
    return response.data;
  } catch (error) {
    console.error('Error fetching user payment methods:', error);
    throw error;
  }
};

// Add new payment method
export const addPaymentMethod = async (
  paymentMethodId: string
): Promise<PaymentMethod> => {
  try {
    const response = await api.post('/payments/payment-methods', {
      paymentMethodId,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding payment method:', error);
    throw error;
  }
};

// Delete payment method
export const deletePaymentMethod = async (
  paymentMethodId: string
): Promise<{ success: boolean }> => {
  try {
    const response = await api.delete(`/payments/payment-methods/${paymentMethodId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting payment method ${paymentMethodId}:`, error);
    throw error;
  }
};

// Get payment status
export const getPaymentStatus = async (
  paymentIntentId: string
): Promise<PaymentResult> => {
  try {
    const response = await api.get(`/payments/status/${paymentIntentId}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting payment status for ${paymentIntentId}:`, error);
    throw error;
  }
};

// Get user subscription status
export const getUserSubscription = async (): Promise<{
  active: boolean;
  plan?: MembershipPlan;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}> => {
  try {
    const response = await api.get('/payments/subscription');
    return response.data;
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    throw error;
  }
};

// Cancel subscription
export const cancelSubscription = async (
  atPeriodEnd: boolean = true
): Promise<{ success: boolean }> => {
  try {
    const response = await api.post('/payments/cancel-subscription', {
      atPeriodEnd,
    });
    return response.data;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};