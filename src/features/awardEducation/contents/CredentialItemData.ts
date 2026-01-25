import { CredentialItem } from '@/features/awardEducation/types/CredentialItem';

export const CREDENTIAL_ITEM_DATA: CredentialItem[] = [
  {
    id: 1,
    type: 'education',
    date: '2021.03 - 현재',
    title: '인덕대학교',
    subtitle: '컴퓨터소프트웨어학과 재학 (학점 4.37/4.5)',
  },
  {
    id: 6,
    type: 'certificate',
    date: '2025.09',
    title: '정보처리산업기사',
    subtitle: '한국산업인력공단',
  },
  {
    id: 7,
    type: 'certificate',
    date: '2024.12',
    title: 'AWS Certified Cloud Practitioner',
    subtitle: 'Amazon Web Services',
  },
  {
    id: 2,
    type: 'award',
    date: '2025.11',
    title: 'SW프로젝트 학술상',
    subtitle:
      '도란도란 프로젝트 설계/개발로 ACK 2025 논문을 발표하여 교내 SW프로젝트 학술상을 수상',
  },
  {
    id: 3,
    type: 'award',
    date: '2024.12',
    title: 'AWS 서비스 활용능력 경진대회 최우수상',
    subtitle:
      '교내 학과에서 주최한 AWS 서비스 활용능력 경진대회에서 최우수상을 수상함',
  },
  {
    id: 5,
    type: 'award',
    date: '2024.12',
    title: '인덕 도서관상 우수상',
    subtitle:
      '교내 도서관을 적극 활용한 학생에게 수여되는 인덕 도서관상을 수상함',
  },
];
