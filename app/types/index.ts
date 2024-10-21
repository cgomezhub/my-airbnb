export interface SafeUser {
  id: string;
  email?: string | null;
  name?: string | null;
  emailVerified?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
}