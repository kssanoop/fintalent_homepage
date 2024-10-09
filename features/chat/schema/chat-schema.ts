export type ChatsSchema = Chat[];
export interface Chat {
  _id: string;
  type: string;
  users: User[];
  createdAt: string;
  updatedAt: string;
  lastMessage?: LastMessage;
  lastMessageAt?: string;
  icon: string;
  name: string;
}

export interface User {
  unread: number;
  profileId: ProfileId;
  userId: string;
  name: string;
}

export interface ProfileId {
  _id: string;
  userId: string;
  name: string;
  profilePicture: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

export interface LastMessage {
  _id: string;
  chatId: string;
  sender: string;
  messageType: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  seen: string[];
}
