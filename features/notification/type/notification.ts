import { NotificatioRedirectType } from "./notification-redirect-type";

export type Notification = {
  _id: string;
  notificationName: string;
  notificationRedirectType: NotificatioRedirectType;
  notificationTitle: string;
  notificationMessage: string;
  notificationStatus: string;
  notificationFor: any;
  notification_id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
