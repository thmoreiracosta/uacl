import {api} from '../services/api';
import type { Course, CourseModule, CourseEnrollment } from '../types/course';

// Get all courses
export const getCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get('/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get course by ID
export const getCourseById = async (id: string): Promise<Course> => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

// Get course modules
export const getCourseModules = async (courseId: string): Promise<CourseModule[]> => {
  try {
    const response = await api.get(`/courses/${courseId}/modules`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching modules for course ${courseId}:`, error);
    throw error;
  }
};

// Enroll in a course
export const enrollInCourse = async (courseId: string): Promise<CourseEnrollment> => {
  try {
    const response = await api.post(`/courses/${courseId}/enroll`);
    return response.data;
  } catch (error) {
    console.error(`Error enrolling in course ${courseId}:`, error);
    throw error;
  }
};

// Get user's enrolled courses
export const getUserCourses = async (): Promise<CourseEnrollment[]> => {
  try {
    const response = await api.get('/user/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching user courses:', error);
    throw error;
  }
};

// Mark lesson as completed
export const markLessonAsCompleted = async (
  courseId: string,
  moduleId: string,
  lessonId: string
): Promise<{ success: boolean }> => {
  try {
    const response = await api.post(`/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/complete`);
    return response.data;
  } catch (error) {
    console.error(`Error marking lesson ${lessonId} as completed:`, error);
    throw error;
  }
};

// Get featured courses
export const getFeaturedCourses = async (): Promise<Course[]> => {
  try {
    const response = await api.get('/courses/featured');
    return response.data;
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    throw error;
  }
};

// Search courses
export const searchCourses = async (query: string): Promise<Course[]> => {
  try {
    const response = await api.get(`/courses/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching courses with query "${query}":`, error);
    throw error;
  }
};
