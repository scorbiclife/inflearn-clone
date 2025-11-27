// 홈
export const ROUTE_HOME = "/";

// 인증
export const ROUTE_SIGNIN = "/signin";
export const ROUTE_SIGNUP = "/signup";

// 강사(인스트럭터)
export const ROUTE_INSTRUCTOR = "/instructor";
export const ROUTE_INSTRUCTOR_COURSES = "/instructor/courses";
export const ROUTE_INSTRUCTOR_SUBMISSIONS = "/instructor/submissions";
export const ROUTE_INSTRUCTOR_MENTORINGS = "/instructor/mentorings";
export const ROUTE_INSTRUCTOR_QUESTIONS = "/instructor/questions";
export const ROUTE_INSTRUCTOR_REVIEWS = "/instructor/reviews";
export const ROUTE_INSTRUCTOR_NEWS = "/instructor/news";
export const ROUTE_INSTRUCTOR_INCOMES = "/instructor/incomes";
export const ROUTE_INSTRUCTOR_COUPONS = "/instructor/coupons";
export const ROUTE_INSTRUCTOR_INQUIRIES = "/instructor/inquiries";
export const ROUTE_INSTRUCTOR_CREATE_COURSE = "/instructor/create-course";

// 강의
export const formatCourseRoute = (courseId: string) => `/course/${courseId}`;
export const formatCourseEditRoute = (courseId: string) =>
  `/course/${courseId}/edit/course-info`;
