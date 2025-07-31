import React, { useState } from 'react';
import type { Event } from '../../types/event';

interface EventCalendarProps {
  events: Event[];
  onEventClick?: (event: Event) => void;
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ events, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };
  
  return (
    <div className="bg-white border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <button
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h3 className="text-lg font-serif font-bold text-primary capitalize">
          {formatDate(currentMonth)}
        </h3>
        <button
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 text-center py-2 border-b border-gray-200">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
          <div key={index} className="text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 text-center">
        {days.map((day, index) => {
          const eventsForDay = day ? getEventsForDay(day) : [];
          const hasEvents = eventsForDay.length > 0;
          
          return (
            <div
              key={index}
              className={`py-2 px-1 border-b border-r border-gray-100 min-h-[80px] ${
                day ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium ${hasEvents ? 'text-primary' : 'text-gray-700'}`}>
                    {day}
                  </div>
                  {eventsForDay.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onEventClick && onEventClick(event)}
                      className="mt-1 p-1 text-xs bg-secondary bg-opacity-10 text-primary rounded truncate cursor-pointer hover:bg-opacity-20"
                    >
                      {event.title}
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};