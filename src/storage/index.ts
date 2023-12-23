export const getMobileData = () => {
  const data = localStorage.getItem("mobile");
  if (data) return JSON.parse(data);
};

export const setMobileData = (data: any) => {
  if (data) {
    localStorage.setItem("mobile", JSON.stringify(data));
  }
};

export const getGPUData = () => {
  const data = localStorage.getItem("gpu");
  if (data) return JSON.parse(data);
};

export const setGPUData = (data: any) => {
  if (data) {
    localStorage.setItem("gpu", JSON.stringify(data));
  }
};
