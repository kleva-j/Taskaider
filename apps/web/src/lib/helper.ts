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

export const generateUser = () => {
  const sex = faker.person.sex() as "female" | "male";
  const fullName = faker.person.fullName({ sex });
  const [firstName, lastName] = fullName.split(" ");
  const email = faker.internet.email({ firstName, lastName });
  const avatar = faker.image.avatar();
  return { firstName, lastName, fullName, email, avatar };
};

export type fakeUserType = ReturnType<typeof generateUser>;
export type EmailListType = ReturnType<typeof generateEmails>;

export function pickAtRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export const generateEmails = (size: number) => {
  const emptor = generateUser();
  const contacts = Array.from({ length: 5 }, () => generateUser());
  const recipients = [emptor].concat(contacts);

  return Array.from({ length: size }, () => {
    const recipient = pickAtRandom(recipients);
    const isSender = recipient.email === emptor.email;
    const folder = new Set(["inbox"]);

    return {
      recipient,
      id: faker.string.uuid(),
      date_sent: faker.date.recent(),
      body: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
        faker.lorem.paragraph({ min: 3, max: 10 }),
      ),
      folder: isSender ? folder.add("sent") : folder,
      subject: faker.lorem.words({ min: 2, max: 4 }),
      opened: isSender ? true : faker.datatype.boolean(),
      sender: pickAtRandom(recipients.slice(!isSender ? 0 : 1)),
    };
  });
};

export const getInitials = (fullName: string) => {
  const [f, l] = fullName.toUpperCase().split(" ");
  return f.charAt(0) + l.charAt(0);
};
