export interface Member {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  phone?: string;
  birthDate?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  profession?: string;
  education?: string;
  bio?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  membershipStatus: 'active' | 'inactive' | 'pending';
  membershipType: 'monthly' | 'yearly' | 'lifetime' | 'none';
  memberSince: string;
  membershipExpiresAt?: string;
  roles: string[];
  permissions: string[];
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    privacy: {
      showProfile: boolean;
      showEmail: boolean;
      showPhone: boolean;
    };
  };
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  profession?: string;
  memberSince: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'monthly' | 'yearly' | 'lifetime';
  features: string[];
  isPopular?: boolean;
}

export interface MembershipSubscription {
  id: string;
  memberId: string;
  planId: string;
  plan: MembershipPlan;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  canceledAt?: string;
  startDate: string;
  endDate?: string;
}

export interface MemberStats {
  coursesEnrolled: number;
  coursesCompleted: number;
  eventsAttended: number;
  totalLearningHours: number;
  certificatesEarned: number;
  membershipDays: number;
}

export interface MemberNotification {
  id: string;
  memberId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface MemberActivity {
  id: string;
  memberId: string;
  type: 'course_enrollment' | 'course_completion' | 'event_registration' | 'event_attendance' | 'membership_renewal' | 'profile_update';
  description: string;
  metadata: Record<string, unknown>;
  createdAt: string;
}
