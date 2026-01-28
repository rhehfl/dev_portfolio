'use client';

import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useState } from 'react';

const BASE_URL = 'https://raw.githubusercontent.com';
const OWNER = 'rhehfl';

interface GetReadmeContentParams {
  repo: string;
  branch: string;
}

export const useReadmeContent = ({ repo, branch }: GetReadmeContentParams) => {
  const url = `${BASE_URL}/${OWNER}/${repo}/${branch}/README.md`;

  const [readeContent, setReadmeContent] = useState('');
  useIsomorphicLayoutEffect(() => {
    const getReadmeContent = async () => {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const text = await res.text();
        setReadmeContent(text);
      }
    };
    getReadmeContent();
  }, [url]);
  return readeContent;
};
