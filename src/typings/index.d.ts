/** 手机信息 */
interface IMobileInfo {
  /** 型号 */
  model: string;
  /** 处理器 */
  processor: string;
  /** 内存 */
  memory: "4" | "8" | "12" | "16" | "24";
  /** 屏幕 */
  display?: Display;
  /** 摄像 */
  camera?: Camera;
  /** 存储 */
  storage: "64" | "128" | "256" | "512" | "1024";
  /** 电池 */
  battery: number;
  /** 设计 */
  design?: string;
  /** 上市时间 */
  ttm?: string;
  /** 价格 */
  price: number;
}

/** 屏幕 */
interface Display {
  /** dpi */
  dpi: number;
  /** 刷新率 */
  hz: number;
  /** 材质 */
  technology: "LCD" | "OLED";
}

/** 摄像 */
interface Camera {
  /** 像素 */
  resolution: number;
  /** 光圈 */
  aperture: string;
}

/** 显卡信息 */
interface IGPUInfo {
  /** 型号 */
  model: string;
  /** CUDA */
  cuda: number;
  /** 基础频率 */
  clockspeed: number;
  /** 加速频率 */
  turbospeed: number;
  /** 功耗 */
  tdp: number;
  /** 制程 */
  process: number;
  /** 显存 */
  memSize: number;
  /** 显存类型 */
  memType: string;
  /** 输出接口 */
  output: {
    dvi: true;
    hdmi: true;
    vga: true;
  };
  /** 上市时间 */
  ttm: string;
  /** 上市价格 */
  price: number;
}
