export interface MessagesSchema {
  data: Message[];
}

export interface Message {
  _id: string;
  chatId: string;
  sender: string;
  senderProfile?: SenderProfile;
  messageType: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  seen: any[];
  __v: number;
}

export interface SenderProfile {
  _id: string;
  userId: string;
  name: string;
  profilePicture: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
