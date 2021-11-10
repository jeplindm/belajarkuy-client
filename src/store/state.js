const initialState = {
  error: false,
  success: false,
  errorMessage: "",
  successMessage: "",
  courses: [],
  loadingCourses: false,
  loadingCreateCourse: false,
  enrollCourses: [],
  loadingEnrollCourses: false,
  course: {},
  loadingCourse: false,
};

export const stateReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_ERROR":
      return { ...state, error: payload };

    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: payload };

    case "SET_SUCCESS":
      return { ...state, success: payload };

    case "SET_SUCCESS_MESSAGE":
      return { ...state, successMessage: payload };

    case "SET_COURSES":
      return { ...state, courses: payload };

    case "SET_LOADING_COURSES":
      return { ...state, loadingCourses: payload };

    case "SET_LOADING_CREATE_COURSE":
      return { ...state, loadingCreateCourse: payload };

    case "SET_ENROLL_COURSES":
      return { ...state, enrollCourses: payload };

    case "SET_LOADING_ENROLL_COURSES":
      return { ...state, loadingEnrollCourses: payload };

    case "SET_COURSE":
      return { ...state, course: payload };

    case "SET_LOADING_COURSE":
      return { ...state, loadingCourse: payload };

    default:
      return state;
  }
};
