/** Signed-in user as the UI sees it. */
export interface AppUser {
  uid: string;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
}
