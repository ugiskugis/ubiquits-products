export interface Device {
  id: string;
  sku: string;
  shortnames?: string[];
  line:{
    name: string;
  }
  product:{
    name: string;
  }
  images: {
    default: string;
  };
}