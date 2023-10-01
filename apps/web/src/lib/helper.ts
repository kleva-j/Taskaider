import { paramsType } from "@/lib/typeSchema";

export const removeFalsyValuesFromObject = <T>(obj: T): T => {
  // @ts-ignore
  Object.keys(obj).forEach((key) => obj[key] === undefined && delete obj[key]);
  return obj;
};

export const filterParams = (params: paramsType) => {
  let objMap = {};
  const filteredObj = {};

  if (Array.isArray(params)) {
    params.forEach((obj) => Object.assign(objMap, obj));
  } else objMap = params;

  Object.keys(objMap).forEach(
    (key) => Boolean(objMap[key]) && (filteredObj[key] = objMap[key]),
  );

  return filteredObj;
};

export const isEmpty = (obj: Record<string, any>) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;
