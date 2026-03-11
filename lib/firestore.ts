import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  type DocumentData,
  type Unsubscribe,
  orderBy,
  query,
} from 'firebase/firestore';
import { getAppFirestore } from './firebase';

// ─── Type Definitions ───

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  architecture?: string;
  healthEndpoint?: string;
  span: string;
  order: number;
}

export interface Skill {
  id: string;
  label: string;
  skills: string[];
  order: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  order: number;
}

export interface Bio {
  id: string;
  summary: string;
  title: string;
  subtitle: string;
}

// ─── Generic CRUD ───

const db = () => getAppFirestore();

function withTimeout<T>(promise: Promise<T>, ms = 10000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Firestore operation timed out')), ms),
    ),
  ]);
}

async function getAll<T extends DocumentData>(collectionName: string): Promise<T[]> {
  const q = query(collection(db(), collectionName), orderBy('order', 'asc'));
  const snapshot = await withTimeout(getDocs(q));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as T));
}

async function getOne<T extends DocumentData>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db(), collectionName, id);
  const snapshot = await withTimeout(getDoc(docRef));
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as unknown as T;
}

async function upsert(collectionName: string, id: string, data: DocumentData): Promise<void> {
  await withTimeout(setDoc(doc(db(), collectionName, id), data, { merge: true }));
}

async function remove(collectionName: string, id: string): Promise<void> {
  await withTimeout(deleteDoc(doc(db(), collectionName, id)));
}

function subscribe<T extends DocumentData>(
  collectionName: string,
  callback: (items: T[]) => void,
): Unsubscribe {
  const q = query(collection(db(), collectionName), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as unknown as T));
    callback(items);
  }, (err) => {
    console.error(`[firestore] subscribe(${collectionName}) error:`, err);
  });
}

// ─── Collection-specific APIs (unordered collections like bio) ───

function subscribeSingle<T extends DocumentData>(
  collectionName: string,
  docId: string,
  callback: (item: T | null) => void,
): Unsubscribe {
  const docRef = doc(db(), collectionName, docId);
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      callback({ id: snapshot.id, ...snapshot.data() } as unknown as T);
    } else {
      callback(null);
    }
  }, (err) => {
    console.error(`[firestore] subscribeSingle(${collectionName}/${docId}) error:`, err);
  });
}

// ─── Exports ───

export const projectsService = {
  getAll: () => getAll<Project>('projects'),
  get: (id: string) => getOne<Project>('projects', id),
  upsert: (id: string, data: DocumentData) => upsert('projects', id, data),
  remove: (id: string) => remove('projects', id),
  subscribe: (cb: (items: Project[]) => void) => subscribe<Project>('projects', cb),
};

export const skillsService = {
  getAll: () => getAll<Skill>('skills'),
  get: (id: string) => getOne<Skill>('skills', id),
  upsert: (id: string, data: DocumentData) => upsert('skills', id, data),
  remove: (id: string) => remove('skills', id),
  subscribe: (cb: (items: Skill[]) => void) => subscribe<Skill>('skills', cb),
};

export const experienceService = {
  getAll: () => getAll<Experience>('experience'),
  get: (id: string) => getOne<Experience>('experience', id),
  upsert: (id: string, data: DocumentData) => upsert('experience', id, data),
  remove: (id: string) => remove('experience', id),
  subscribe: (cb: (items: Experience[]) => void) => subscribe<Experience>('experience', cb),
};

export const bioService = {
  get: () => getOne<Bio>('bio', 'main'),
  upsert: (data: DocumentData) => upsert('bio', 'main', data),
  subscribe: (cb: (item: Bio | null) => void) => subscribeSingle<Bio>('bio', 'main', cb),
};
