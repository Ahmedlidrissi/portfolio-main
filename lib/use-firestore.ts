'use client';

import { useEffect, useState } from 'react';
import type { Project, Skill, Experience, Bio, Profile } from '@/lib/firestore';

/**
 * Hooks that subscribe to Firestore real-time data when Firebase is configured,
 * otherwise return null so the component can fall back to static data.
 */

function isFirebaseConfigured(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

export function useFirestoreProjects(): Project[] | null {
  const [data, setData] = useState<Project[] | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let unsub: (() => void) | undefined;
    import('@/lib/firestore').then(({ projectsService }) => {
      unsub = projectsService.subscribe(setData);
    });
    return () => unsub?.();
  }, []);

  return data;
}

export function useFirestoreSkills(): Skill[] | null {
  const [data, setData] = useState<Skill[] | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let unsub: (() => void) | undefined;
    import('@/lib/firestore').then(({ skillsService }) => {
      unsub = skillsService.subscribe(setData);
    });
    return () => unsub?.();
  }, []);

  return data;
}

export function useFirestoreExperience(): Experience[] | null {
  const [data, setData] = useState<Experience[] | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let unsub: (() => void) | undefined;
    import('@/lib/firestore').then(({ experienceService }) => {
      unsub = experienceService.subscribe(setData);
    });
    return () => unsub?.();
  }, []);

  return data;
}

export function useFirestoreBio(): Bio | null {
  const [data, setData] = useState<Bio | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let unsub: (() => void) | undefined;
    import('@/lib/firestore').then(({ bioService }) => {
      unsub = bioService.subscribe(setData);
    });
    return () => unsub?.();
  }, []);

  return data;
}

export function useFirestoreProfile(): Profile | null {
  const [data, setData] = useState<Profile | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    let unsub: (() => void) | undefined;
    import('@/lib/firestore').then(({ profileService }) => {
      unsub = profileService.subscribe(setData);
    });
    return () => unsub?.();
  }, []);

  return data;
}
