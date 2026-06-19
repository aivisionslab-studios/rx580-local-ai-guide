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

export const isFirebaseDummy = !metaEnv.VITE_FIREBASE_API_KEY || 
  metaEnv.VITE_FIREBASE_API_KEY === "" ||
  metaEnv.VITE_FIREBASE_API_KEY === "AIzaSyD-dummy-api-key-for-compilation-only" ||
  typeof metaEnv.VITE_FIREBASE_API_KEY !== "string" ||
  !metaEnv.VITE_FIREBASE_API_KEY.startsWith("AIzaSy") ||
  metaEnv.VITE_FIREBASE_API_KEY.includes("dummy") ||
  metaEnv.VITE_FIREBASE_API_KEY.includes("placeholder") ||
  metaEnv.VITE_FIREBASE_API_KEY.includes("Sua_Chave");

// Initialize Firebase App conditionally
export const app = !isFirebaseDummy ? initializeApp(firebaseConfig) : null as any;

// Initialize Firestore on the custom Database ID from configuration conditionally
export const db = !isFirebaseDummy ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : null as any;

// Initialize Auth conditionally
export const auth = !isFirebaseDummy ? getAuth(app) : null as any;

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
 * Logs in utilizing standard Firebase pop-up authentication or mock offline profiles
 */
export async function signInWithGoogle() {
  if (isFirebaseDummy) {
    const mockUser = {
      uid: "mock_hacker_2026",
      displayName: "Silicon Hacker",
      email: "polaris_hacker@aivisionslab.org",
      photoURL: "",
      emailVerified: true,
      isAnonymous: false,
    };
    localStorage.setItem("rx580_mock_user", JSON.stringify(mockUser));
    window.dispatchEvent(new CustomEvent("rx580-auth-change", { detail: mockUser }));
    return mockUser;
  }

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
  if (isFirebaseDummy) {
    localStorage.removeItem("rx580_mock_user");
    window.dispatchEvent(new CustomEvent("rx580-auth-change", { detail: null }));
    return;
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
}
