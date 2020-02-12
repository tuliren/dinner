export const uuid = () => {
  return hex(Date.now() / 1000) + ' '.repeat(5).replace(/./g, () => hex(Math.random() * 16))
};

const hex = (value: number) => {
  return Math.floor(value).toString(16)
};
