const removeAccents = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const helpSearch = (text: string, keyword: string) => {
  const temp = removeAccents(keyword).toLocaleLowerCase();
  return removeAccents(text).toLocaleLowerCase().includes(temp);
};
