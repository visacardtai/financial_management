import axios from "../axios";

export const apiGetAllTeachingPeriod = (status, is_used) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/teaching-period/alls",
        method: "get",
        params: { status, is_used },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetAllLecturer = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/lecturer",
        method: "get",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiCreateTeachingPeriod = (
  itemTargets,
  itemLecture,
  itemLecturePrice,
  itemSemester,
  data
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/teaching-period",
        method: "post",
        data: {
          targets_id: itemTargets,
          lecturer_id: itemLecture,
          lecture_price_id: itemLecturePrice,
          semester_id: itemSemester,
          details: data,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiEditTeachingPeriod = (
  id,
  itemTargets,
  itemLecture,
  itemLecturePrice,
  itemSemester,
  listDelete,
  data
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/teaching-period",
        method: "put",
        data: {
          id,
          targets_id: itemTargets,
          lecturer_id: itemLecture,
          lecture_price_id: itemLecturePrice,
          semester_id: itemSemester,
          listDelete,
          details: data,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiDeleteTeachingPeriod = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/teaching-period",
        method: "delete",
        data: data,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
