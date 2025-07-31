export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  date: string;
  endDate?: string;
  time: string;
  endTime?: string;
  location: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  isOnline: boolean;
  meetingUrl?: string;
  meetingId?: string;
  meetingPassword?: string;
  capacity?: number;
  registeredCount: number;
  speakers: EventSpeaker[];
  price?: number;
  isFree: boolean;
  requiresMembership: boolean;
  categories: string[];
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  organizer: string;
  participants: string;
}

export interface EventSpeaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export interface EventRegistration {
  id: string;
  userId: string;
  eventId: string;
  event: Event;
  status: 'registered' | 'attended' | 'canceled';
  registeredAt: string;
  canceledAt?: string;
  attendedAt?: string;
  ticketCode?: string;
}

export interface EventFilter {
  category?: string;
  startDate?: string;
  endDate?: string;
  isFree?: boolean;
  isOnline?: boolean;
  requiresMembership?: boolean;
  search?: string;
}

export interface EventAttendance {
  id: string;
  eventId: string;
  userId: string;
  checkInTime: string;
  checkOutTime?: string;
}

export interface EventFeedback {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}
