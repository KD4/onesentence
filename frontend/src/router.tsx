import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import HomePage from '@/pages/HomePage';
import LevelQuizPage from '@/pages/LevelQuizPage';
import LevelResultPage from '@/pages/LevelResultPage';
import ArchivePage from '@/pages/ArchivePage';
import BookmarkPage from '@/pages/BookmarkPage';
import MyPage from '@/pages/MyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'archive', element: <ArchivePage /> },
      { path: 'bookmarks', element: <BookmarkPage /> },
      { path: 'my', element: <MyPage /> },
    ],
  },
  { path: '/level-quiz', element: <LevelQuizPage /> },
  { path: '/level-result', element: <LevelResultPage /> },
]);
