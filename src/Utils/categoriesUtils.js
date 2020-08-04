import { categories as categoriesMock } from '../Mocks/CategoriesMock';

export const getCategory = (
    value,
    field = 'id',
    categories = categoriesMock,
) => {
  const idx = categories.findIndex((item) => item[field] === value);
  return (idx >= 0) ? categories[idx] : null;
};
