export enum SliderType {
  IMAGE = 'image',
  VIDEO = 'video',
  IFRAME = 'iframe'
}

export interface Slider {
  id?: number;
  title?: string;
  subtitle?: string;
  link?: string;
  image?: string;
  video?: string;
  content?: string;
  type?: SliderType;
  isExternal?: boolean;
}
