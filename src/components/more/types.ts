import { IconType } from '../elements/VectorIcon';

export interface MoreMenuItem {
  id: string;
  label: string;
  iconName: string;
  iconType: IconType;
  route?: string;
  badgeCount?: number;
  iconColor?: string;
}

export interface MoreSectionData {
  id: string;
  title: string;
  items: MoreMenuItem[];
}
