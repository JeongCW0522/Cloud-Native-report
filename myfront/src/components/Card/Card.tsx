import type { Link } from '@/types/links';
import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFavorite } from '@/api/links';

const Card = ({ link }: { link: Link }) => {
  const [isStarred, setIsStarred] = useState(link.favorite);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  // 즐겨찾기 api 요청 Mutation
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: ({ id, favorite }: { id: number; favorite: boolean }) =>
      updateFavorite(id, favorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] }); // 성공 시 캐시 무효화
    },
  });

  // 별 아이콘 클릭 시 이벤트 핸들러
  const toggleStar = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 클릭 이벤트 방지
    const newValue = !isStarred;
    setIsStarred(newValue); // UI 즉시 업데이트

    toggleFavorite({ id: link.id, favorite: newValue }); // 서버에도 새로운 즐겨찾기 값 반영
  };

  return (
    <div
      key={link.id}
      className='bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 overflow-hidden border border-gray-200'
    >
      {/* 카드 상단 이미지 영역 - 클릭 시 상세 페이지로 이동 */}
      <div className='relative cursor-pointer' onClick={() => navigate(`/detail/${link.id}`)}>
        <img
          src={
            link.thumbnail ||
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop'
          }
          alt={link.title}
          className='w-full h-48 object-cover'
        />

        {/* 즐겨찾기 아이콘 버튼 */}
        <button
          onClick={toggleStar}
          className='absolute top-2 right-3 p-2 text-yellow-400 hover:text-yellow-500 transition cursor-pointer'
        >
          {isStarred ? <FaStar size={24} /> : <FaRegStar size={24} />}
        </button>
      </div>
      {/* 카드 본문 */}
      <div className='p-5'>
        <h3 className='text-lg font-bold text-gray-800 mb-2'>{link.title}</h3>
        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{link.content}</p>
      </div>
    </div>
  );
};

export default Card;
