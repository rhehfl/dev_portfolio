'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      setIsLoading(false);
      return;
    }

    router.refresh();
    router.push('/blog/write');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white shadow-md rounded-lg w-96"
        aria-label="관리자 로그인"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

        {/* 에러 메시지 — aria-live="polite"로 스크린 리더에게 실시간 알림 */}
        <div
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          className={`mb-4 text-sm text-red-600 ${error ? '' : 'hidden'}`}
        >
          {error}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            className="w-full p-3 border rounded outline-none focus:ring-2 focus:ring-teal-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-invalid={!!error}
            autoComplete="email"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="w-full p-3 border rounded outline-none focus:ring-2 focus:ring-teal-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
            aria-invalid={!!error}
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="w-full bg-[#12b886] text-white p-3 rounded font-bold hover:bg-[#20c997] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
}
