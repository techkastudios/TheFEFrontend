export interface Advertisement {
  id: number;
  positionId: number;
  type: string;
  content: string;
  link: string;
  hasMobileContent: boolean;
  mobileContent: string;
  mobileLink: string;
  isExternal: boolean;
  isModal: boolean;
  isAutoModal: boolean;
  autoModalDuration: number;
}

export interface AdsPosition {
  id: number;
  page: string;
  section: string;
  name: string;
  ads: Advertisement;
}
