import { ReactNode } from 'react';
import { useGetCallerRole } from '@/hooks/useUserProfile';
import AccessDeniedScreen from './AccessDeniedScreen';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface RequireAdminProps {
  children: ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { data: role, isLoading, error } = useGetCallerRole();

  if (isLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Checking permissions...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || role !== 'admin') {
    return <AccessDeniedScreen />;
  }

  return <>{children}</>;
}
