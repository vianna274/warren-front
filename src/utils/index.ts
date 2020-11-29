export const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const parseCurrencyToFloat = (value: string) => {
  return parseFloat(value
    .replaceAll(".", "")
    .replaceAll(",", "."));
};