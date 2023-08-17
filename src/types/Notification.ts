type NotificationType = "Comment" | "Comment-Comment" | "Notice";

export type Notification = {
  notificationId: string;
  userId: string;
  targetUserId: string;
  type: NotificationType;
  notContentId: string;
  content: string;
  contentUrl: string;
  notDateTime: string;
  notReadDateTime: string;
};
