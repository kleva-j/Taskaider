import { paramsType } from "@/lib/typeSchema";
import { faker } from "@faker-js/faker";

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

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const generateEmails = (size: number) => {
  const folders = ["inbox", "important", "sent"];
  return Array.from({ length: size }, () => ({
    id: faker.string.nanoid(),
    address: faker.internet.email(),
    sent_date: faker.date.anytime(),
    body: faker.lorem.paragraph(2),
    subject: faker.lorem.words({ min: 3, max: 5 }),
    isRead: faker.datatype.boolean(),
    folder: folders[Math.floor(Math.random() * folders.length)],
  }));
};
