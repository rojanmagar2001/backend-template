export const toNumber = (data: string): number | false => {
  try {
    if (!/^[0-9]+$/.test(data)) {
      return false;
    }
    return parseInt(data);
  } catch (error) {
    return false;
  }
};
