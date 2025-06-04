// Types for nevsluh app

export interface Message {
  id: string;
  body: string;
  category: MessageCategory;
  flags: MessageFlags;
  createdAt: Date;
  aiReply?: string;
  locationId?: string;
  reactionCount: number;
}

export enum MessageCategory {
  DREAM = 'dream',
  PAIN = 'pain',
  HOPE = 'hope',
  QUESTION = 'question',
  CONFESSION = 'confession',
  STORY = 'story',
}

export interface MessageFlags {
  public: boolean;
  aiReplyRequested: boolean;
  allowVideoReading: boolean;
}

export interface Letter {
  id: string;
  encryptedText: string;
  emailHash?: string;
  deliverAt: Date;
}

export interface Location {
  id: string;
  name: string;
  lat?: number;
  lng?: number;
  ownerId?: string;
}

export interface Reaction {
  messageId: string;
  anonToken: string;
  reactedAt: Date;
} 