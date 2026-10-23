import type { ComponentProps } from 'react';
import { AntDesign as Icon } from '@react-native-vector-icons/ant-design';

export type DashboardItemType = {
  id: number;
  icon: ComponentProps<typeof Icon>['name'];
  title: string;
  subTitle: string;
  iconColor: string;
  iconBg: string;
  secBgColor: string;
};

export type ActionMenuDataType = {
  id: number;
  icon: ComponentProps<typeof Icon>['name'];
  title: string;
};
