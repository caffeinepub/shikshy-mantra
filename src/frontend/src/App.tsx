import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import LandingPage from './pages/LandingPage';
import StudentSignupPage from './pages/StudentSignupPage';
import StudentProfilePage from './pages/StudentProfilePage';
import AdminPanelPage from './pages/admin/AdminPanelPage';
import AdminSignupDetailPage from './pages/admin/AdminSignupDetailPage';
import AppLayout from './components/AppLayout';
import RequireAuth from './components/auth/RequireAuth';
import RequireAdmin from './components/auth/RequireAdmin';
import ProfileSetupModal from './components/auth/ProfileSetupModal';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <ProfileSetupModal />
      <AppLayout />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const studentSignupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-signup',
  component: StudentSignupPage,
});

const studentProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/student-profile',
  component: () => (
    <RequireAuth>
      <StudentProfilePage />
    </RequireAuth>
  ),
});

const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <RequireAuth>
      <RequireAdmin>
        <AdminPanelPage />
      </RequireAdmin>
    </RequireAuth>
  ),
});

const adminSignupDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/signup/$signupId',
  component: () => (
    <RequireAuth>
      <RequireAdmin>
        <AdminSignupDetailPage />
      </RequireAdmin>
    </RequireAuth>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  studentSignupRoute,
  studentProfileRoute,
  adminPanelRoute,
  adminSignupDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
