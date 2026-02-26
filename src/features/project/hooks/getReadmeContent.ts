const BASE_URL = 'https://raw.githubusercontent.com';
const OWNER = 'rhehfl';

interface GetReadmeContentParams {
  repo: string;
  branch: string;
}

export const getReadmeContent = async ({
  repo,
  branch,
}: GetReadmeContentParams) => {
  const url = `${BASE_URL}/${OWNER}/${repo}/${branch}/README.md`;
  await fetch(url, { cache: 'no-store' });
  const res = await fetch(url, { cache: 'no-store' });
  if (res.ok) {
    const text = await res.text();
    return text;
  }
};
