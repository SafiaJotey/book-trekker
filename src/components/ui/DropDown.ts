export const YearDropdown = () => {
  const years = [];
  for (let year = 1900; year <= 2023; year++) {
    years.push(year);
  }
  return years;
};
