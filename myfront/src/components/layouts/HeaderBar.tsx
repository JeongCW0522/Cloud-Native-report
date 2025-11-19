import { RxHamburgerMenu } from 'react-icons/rx';
import { IoSearchSharp } from 'react-icons/io5';
import { useAtom } from 'jotai';
import { isSidebarOpenAtom, searchAtom } from '@/atom';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/api/auth';

const HeaderBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  const [search, setSearch] = useAtom(searchAtom);

  // 사용자의 실시간 입력값 (디바운스 전)
  const [inputValue, setInputValue] = useState(search);
  const debouncedValue = useDebounce(inputValue, 500); // 입력값 0.5초동안 변화 없을 때만 검색어 반영

  // 로그인 사용자 정보 가져오기
  const { data: userData } = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getUserInfo(),
    retry: false, // 실패 시 재요청 하지 않음
  });

  // 디바운스된 검색어가 변경되면 전역 상태에 반영
  useEffect(() => {
    setSearch(debouncedValue);
  }, [debouncedValue, setSearch]);

  // 화면 사이즈에 따라 사이드바 자동 열기/닫기
  useEffect(() => {
    const handleResize = () => {
      const closeSidebar = window.innerWidth < 768;
      if (closeSidebar) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize); // 리사이즈 이벤트 등록
    return () => window.removeEventListener('resize', handleResize); // 언마운트 시 이벤트 제거 (메모리 누수 방지)
  }, [setIsSidebarOpen]);

  return (
    <header className='bg-white border-b border-gray-200 px-6 py-4 z-50'>
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
        <div className='flex items-center gap-3'>
          {/* 사이드바 열기/닫기 버튼 */}
          <button
            type='button'
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-2 hover:bg-gray-100 rounded-lg transition cursor-pointer'
          >
            <RxHamburgerMenu size={24} className='text-gray-700' />
          </button>

          {userData?.data?.name && (
            <h1 className='text-2xl font-bold text-gray-800 whitespace-nowrap'>
              {userData.data.name}님 반갑습니다!
            </h1>
          )}
        </div>

        {/* 검색창 */}
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <IoSearchSharp
              size={20}
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
            />
            <input
              type='text'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder='검색...'
              className='pl-10 pr-4 py-2 w-72 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
