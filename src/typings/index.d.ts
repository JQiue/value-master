interface IMobileInfo {
  model: string;
  processor: string;
  memory: "4" | "8" | "12" | "16" | "24";
  display?: Display;
  camera?: Camera;
  storage: "64" | "128" | "256" | "512" | "1024";
  battery: number;
  design?: string;
  ttm?: string;
  price: number;
}

interface Display {
  dpi: number;
  hz: number;
  technology: "LCD" | "OLED";
}

interface Camera {
  resolution: number;
  aperture: string;
}
