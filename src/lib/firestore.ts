import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './firebase';
import { Message, MessageCategory, MessageFlags, Letter } from '../types';

// Определение типа Message
export interface Message {
  id: string;
  body: string;
  category: MessageCategory;
  createdAt: string | Date;
  reactionCount: number;
  aiReply?: string;
  flags?: MessageFlags;
  locationId?: string;
}

// Collection references
const messagesCollection = collection(db, 'messages');
const lettersCollection = collection(db, 'letters');
const reactionsCollection = collection(db, 'reactions');

// Add a new message
export const addMessage = async (
  body: string,
  category: MessageCategory,
  flags: MessageFlags,
  locationId?: string
) => {
  try {
    const docRef = await addDoc(messagesCollection, {
      body,
      category,
      flags,
      locationId,
      createdAt: serverTimestamp(),
      reactionCount: 0,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding message: ', error);
    throw error;
  }
};

// Get random public messages
export const getRandomPublicMessages = async (count: number = 5) => {
  try {
    // This is a simplified version - in production, you'd implement 
    // a more sophisticated random selection algorithm
    const q = query(
      messagesCollection,
      where('flags.public', '==', true),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Message);
    });
    
    // Shuffle and limit
    return messages
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  } catch (error) {
    console.error('Error getting random messages: ', error);
    throw error;
  }
};

// Add AI reply to a message
export const addAIReply = async (messageId: string, aiReply: string) => {
  try {
    const messageRef = doc(db, 'messages', messageId);
    await updateDoc(messageRef, {
      aiReply,
    });
  } catch (error) {
    console.error('Error adding AI reply: ', error);
    throw error;
  }
};

// Add a reaction to a message
export const addReaction = async (messageId: string, anonToken: string) => {
  try {
    // Check if already reacted
    const q = query(
      reactionsCollection,
      where('messageId', '==', messageId),
      where('anonToken', '==', anonToken)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Add reaction
      await addDoc(reactionsCollection, {
        messageId,
        anonToken,
        reactedAt: serverTimestamp(),
      });
      
      // Increment reaction count
      const messageRef = doc(db, 'messages', messageId);
      await updateDoc(messageRef, {
        reactionCount: increment(1),
      });
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error adding reaction: ', error);
    throw error;
  }
};

// Add a letter to self
export const addLetter = async (
  encryptedText: string,
  deliverAt: Date,
  emailHash?: string
) => {
  try {
    const docRef = await addDoc(lettersCollection, {
      encryptedText,
      deliverAt,
      emailHash,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding letter: ', error);
    throw error;
  }
};

// Interface for future letters
export interface FutureLetter {
  id?: string;
  body: string;
  recipient: string;
  email: string;
  deliveryDate: string;
  createdAt: string;
  status: 'pending' | 'delivered' | 'failed';
}

// Add a letter to be delivered in the future
export async function addFutureLetter(letter: Omit<FutureLetter, 'id'>): Promise<string> {
  try {
    const lettersRef = collection(db, 'future_letters');
    const docRef = await addDoc(lettersRef, letter);
    return docRef.id;
  } catch (error) {
    console.error('Error adding future letter:', error);
    throw error;
  }
} 