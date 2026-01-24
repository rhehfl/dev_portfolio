export type ItemType = 'education' | 'award' | 'certificate';

export interface CredentialItem {
  id: number;
  type: ItemType;
  date: string;
  title: string;
  subtitle: string;
}
