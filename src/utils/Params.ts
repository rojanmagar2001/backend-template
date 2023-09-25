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

export const parseIds = (data: string[]) => {
  try {
    return data.map((id) => parseInt(id));
  } catch (err) {
    return false;
  }
};
