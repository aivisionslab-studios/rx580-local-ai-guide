import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Safe Firebase Configuration Object
// Using environment variables with safe defaults so that deletions, local builds or repository transfers will never crash compilation.
const metaEnv = (import.meta as any).env || {};

const firebaseConfig = {
  apiKey: metaEnv.VITE_FIREBASE_API_KEY || "AIzaSyD-dummy-api-key-for-compilation-only",
  authDomain: metaEnv.VITE_FIREBASE_AUTH_DOMAIN || "setup-ia-local-rx580-vulkan.firebaseapp.com",
  projectId: metaEnv.VITE_FIREBASE_PROJECT_ID || "setup-ia-local-rx580-vulkan",
  storageBucket: metaEnv.VITE_FIREBASE_STORAGE_BUCKET || "setup-ia-local-rx580-vulkan.appspot.com",
  messagingSenderId: metaEnv.VITE_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: metaEnv.VITE_FIREBASE_APP_ID || "1:000000000000:web:0000000000000000000000",
  firestoreDatabaseId: metaEnv.VITE_FIREBASE_DATABASE_ID || "(default)"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore on the custom Database ID from configuration
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Auth
export const auth = getAuth(app);

// Authentication Provider
export const googleProvider = new GoogleAuthProvider();

// Error Context Enumerations matching skill requirements
export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

/**
 * Centrally processes any Firestore exceptions, wrapping them into the strictly
 * required JSON payload structure to maintain auditability.
 */
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Exception logged: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Logs in utilizing standard Firebase pop-up authentication
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Popup Auth failed:", error);
    throw error;
  }
}

/**
 * Log out current active authentication session
 */
export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}
