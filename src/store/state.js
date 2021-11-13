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
  loadingCreateEnrollCourse: false,
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

    case "SET_LOADING_CREATE_ENROLL_COURSE":
      return { ...state, loadingCreateEnrollCourse: payload };

    case "SET_CREATE_ENROLL_CROUSE":
      const enrollCoursesList = state.enrollCourses;
      return { ...state, enrollCourses: [payload, ...enrollCoursesList] };

    case "SET_UNENROLL_COURSE":
      return {
        ...state,
        enrollCourses: state.enrollCourses.filter(
          (course) => course.id.toString() !== payload.toString()
        ),
      };

    case "SET_EDIT_COURSE":
      const data = state.courses;
      const objIndex = data.findIndex((obj) => obj.id === payload.id);
      data[objIndex] = payload;
      return { ...state, courses: [...data] };

    case "SET_DELETE_COURSE":
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course.id.toString() !== payload.id.toString()
        ),
      };

    default:
      return state;
  }
};
