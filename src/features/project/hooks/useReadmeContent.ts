import { useState, useEffect } from 'react';

const BASE_URL = 'https://raw.githubusercontent.com';
const OWNER = 'rhehfl';

interface UseReadmeContentParams {
  repo: string;
  branch: string;
}

export const useReadmeContent = ({ repo, branch }: UseReadmeContentParams) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        setLoading(true);
        const url = `${BASE_URL}/${OWNER}/${repo}/${branch}/README.md`;
        const res = await fetch(url);

        if (res.ok) {
          const text = await res.text();
          setContent(text);
        } else {
          throw new Error(`Failed to fetch README: ${res.statusText}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (repo && branch) {
      fetchReadme();
    }
  }, [repo, branch]);

  return { content, loading, error };
};
