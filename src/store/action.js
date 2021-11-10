import axios from "../config/axios";
import Course from "../models/CourseModel";

export const getCourses = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_COURSES", payload: true });
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/course/getall",
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        const listOfCourses = data.Data;

        let courses = [];
        listOfCourses.map((item) => courses.push(new Course(item)));

        dispatch({ type: "SET_COURSES", payload: courses });
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      dispatch({ type: "SET_LOADING_COURSES", payload: false });
    }
  };
};

export const createCourse = (payload) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_CREATE_COURSE", payload: true });
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/course/upload",
        data: payload,
      });
      if (data.Status !== "00") {
        throw Error();
      } else {
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({ type: "SET_SUCCESS_MESSAGE", payload: "Course berhasil dibuat" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Course gagal dibuat" });
    } finally {
      dispatch({ type: "SET_LOADING_CREATE_COURSE", payload: false });
    }
  };
};

export const getEnrollCourses = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_ENROLL_COURSES", payload: true });

    const id = localStorage.getItem("id");

    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/course/allenrolled/" + id,
      });

      dispatch({ type: "SET_ENROLL_COURSES", payload: data.Data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Internal server error" });
    } finally {
      dispatch({ type: "SET_LOADING_ENROLL_COURSES", payload: false });
    }
  };
};

export const getCourse = (id) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_COURSE", payload: true });

    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/course/detail/" + id,
      });

      dispatch({ type: "SET_COURSE", payload: new Course(data.Data) });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Internal server error" });
    } finally {
      dispatch({ type: "SET_LOADING_COURSE", payload: false });
    }
  };
};
