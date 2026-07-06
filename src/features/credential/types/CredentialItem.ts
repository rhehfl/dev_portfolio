export type ItemType = 'education' | 'award' | 'certificate' | 'talk';

export interface CredentialItem {
  id: number;
  type: ItemType;
  date: string;
  title: string;
  subtitle: string;
  link?: string;
}
