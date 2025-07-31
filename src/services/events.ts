import {api} from '../services/api';
import type { Event, EventRegistration } from '../types/event';

// Get all events
export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Get event by ID
export const getEventById = async (id: string): Promise<Event> => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    throw error;
  }
};

// Register for an event
export const registerForEvent = async (eventId: string): Promise<EventRegistration> => {
  try {
    const response = await api.post(`/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error(`Error registering for event ${eventId}:`, error);
    throw error;
  }
};

// Cancel event registration
export const cancelEventRegistration = async (eventId: string): Promise<{ success: boolean }> => {
  try {
    const response = await api.delete(`/events/${eventId}/register`);
    return response.data;
  } catch (error) {
    console.error(`Error canceling registration for event ${eventId}:`, error);
    throw error;
  }
};

// Get user's registered events
export const getUserEvents = async (): Promise<EventRegistration[]> => {
  try {
    const response = await api.get('/user/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw error;
  }
};

// Get upcoming events
export const getUpcomingEvents = async (limit?: number): Promise<Event[]> => {
  try {
    const url = limit ? `/events/upcoming?limit=${limit}` : '/events/upcoming';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    throw error;
  }
};

// Get past events
export const getPastEvents = async (limit?: number): Promise<Event[]> => {
  try {
    const url = limit ? `/events/past?limit=${limit}` : '/events/past';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching past events:', error);
    throw error;
  }
};

// Search events
export const searchEvents = async (query: string): Promise<Event[]> => {
  try {
    const response = await api.get(`/events/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching events with query "${query}":`, error);
    throw error;
  }
};