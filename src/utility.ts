export type Item = {
  id: string;
  price: number;
  name?: string;
}

export type Person = {
  id: string;
  name: string;
}

export const ID_DELIMITER = '\t';

export const uuid = () => {
  return hex(Date.now() / 1000) + ' '.repeat(5).replace(/./g, () => hex(Math.random() * 16));
};

const hex = (value: number) => {
  return Math.floor(value).toString(16);
};
