import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import HomePage from '@/pages/HomePage';
import OnboardingPage from '@/pages/OnboardingPage';
import SelectLevelPage from '@/pages/SelectLevelPage';
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
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/select-level', element: <SelectLevelPage /> },
]);
