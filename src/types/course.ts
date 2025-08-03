export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  instructor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
  };
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  enrollmentCount: number;
  rating: number;
  ratingCount: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  requiresMembership: boolean;

  isNew?: boolean;  // propriedade opcional adicionada
  progress?: number; // progresso do usuário no curso (0 a 100)
  isFree?: boolean;
  video?: string; 
  lessons?: string[];
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'text' | 'quiz';
  content: string;
  videoUrl?: string;
  order: number;
  isCompleted?: boolean;
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  progress: number; // percentage
  startedAt: string;
  completedAt?: string;
  lastAccessedAt: string;
  completedLessons: string[]; // array of lesson IDs
}

export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface CourseProgress {
  courseId: string;
  progress: number;           // progresso em %
  completedLessons: string[]; // IDs das aulas concluídas
  lastAccessedLessonId?: string;
}

export interface CourseFilter {
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  search?: string;
  instructor?: string;
  requiresMembership?: boolean;
}
