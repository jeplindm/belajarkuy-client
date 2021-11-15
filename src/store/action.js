import axios from "../config/axios";
import Course from "../models/CourseModel";
import User from "../models/UserModel";

export const getCourses = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_COURSES", payload: true });
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/course/getall/admin",
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

      let enrollCourses = [];

      const listOfEnrollCourses = data.Data;
      listOfEnrollCourses.map((item) => enrollCourses.push(new Course(item)));

      dispatch({ type: "SET_ENROLL_COURSES", payload: enrollCourses });
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

export const searchCoursesByTitle = (title) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_COURSES", payload: true });
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/course/search?title=" + title,
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

export const createEnrollCourse = ({ data: input }) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_CREATE_ENROLL_COURSE", payload: true });
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/course/enroll",
        data: input,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({ type: "SET_SUCCESS_MESSAGE", payload: "Course berhasil terdaftar" });
        dispatch({ type: "SET_ENROLL_COURSES", payload: data.Data });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Course sudah terdaftar" });
    } finally {
      dispatch({ type: "SET_LOADING_CREATE_ENROLL_COURSE", payload: false });
    }
  };
};

export const searchEnrollCourseByTitle = (title) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_ENROLL_COURSES", payload: true });

    const userId = localStorage.getItem("id");

    try {
      const { data } = await axios({
        method: "GET",
        url: `/api/course/searchenrolled/${userId}?title=${title}`,
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

export const removeEnrollCourse = (payload) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_ENROLL_COURSES", payload: true });

    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/course/enroll",
        data: payload,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({
          type: "SET_SUCCESS_MESSAGE",
          payload: "Course berhasil dihapus dari list",
        });
        dispatch({ type: "SET_UNENROLL_COURSE", payload: payload.idCourse });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: "Gagal menghapus course dari list",
      });
    } finally {
      dispatch({ type: "SET_LOADING_ENROLL_COURSES", payload: false });
    }
  };
};

export const editCourse = (form) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_COURSES", payload: true });

    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/course/update",
        data: form,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({
          type: "SET_SUCCESS_MESSAGE",
          payload: "Course berhasil diupdate",
        });
        dispatch({ type: "SET_EDIT_COURSE", payload: data.Data });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Update course tidak berhasil" });
    } finally {
      dispatch({ type: "SET_LOADING_COURSES", payload: false });
    }
  };
};

export const deleteCourse = (form) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_COURSES", payload: true });

    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/course/update",
        data: form,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        dispatch({ type: "SET_DELETE_COURSE", payload: data.Data });
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({
          type: "SET_SUCCESS_MESSAGE",
          payload: "Course berhasil diupdate",
        });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Update course tidak berhasil" });
    } finally {
      dispatch({ type: "SET_LOADING_COURSES", payload: false });
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_USERS", payload: true });

    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/user/getall",
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        const listOfUsers = data.Data;
        let users = [];

        listOfUsers.map((item) => users.push(new User(item)));
        dispatch({ type: "SET_USERS", payload: users });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "Internal server error" });
    } finally {
      dispatch({ type: "SET_LOADING_USERS", payload: false });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_LOADING_USERS", payload: true });

      const { data } = await axios({
        method: "DELETE",
        url: "/api/user/delete/" + id,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        dispatch({ type: "SET_DELETE_USER", payload: id });
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({ type: "SET_SUCCESS_MESSAGE", payload: "User berhasil terhapus" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "User gagal terhapus" });
    } finally {
      dispatch({ type: "SET_LOADING_USERS", payload: false });
    }
  };
};

export const editUser = (payload) => {
  return async (dispatch) => {
    dispatch({ type: "SET_LOADING_USERS", payload: true });
    try {
      const { data } = await axios({
        method: "POST",
        url: "/api/user/update",
        data: payload,
      });

      if (data.Status !== "00") {
        throw Error();
      } else {
        dispatch({
          type: "SET_EDIT_USER",
          payload: { phone: data.NoHP, id: payload.UserId },
        });
        dispatch({ type: "SET_SUCCESS", payload: true });
        dispatch({ type: "SET_SUCCESS_MESSAGE", payload: "User berhasil terhapus" });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: true });
      dispatch({ type: "SET_ERROR_MESSAGE", payload: "User gagal terupdate" });
    } finally {
      dispatch({ type: "SET_LOADING_USERS", payload: false });
    }
  };
};
