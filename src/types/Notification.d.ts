export interface Notification {
  id: string;
  profileUrl: string;
  title: string;
  body: string;
  createdAt: string;
  nickname: string;
  commentId: string;
  receiverId: string;
  tripId: string;
}
export interface NotificationResponse {
  notifications: Notification[];
  notificationsPerPage: number;
  currentPage: number;
  totalPage: number;
}
