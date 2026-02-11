import { ReactNode } from 'react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { identity, login, isInitializing, isLoggingIn } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-md mx-auto">
          <Card className="border-2">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <LogIn className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please sign in to access this page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={login} className="w-full" disabled={isLoggingIn}>
                {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoggingIn ? 'Signing in...' : 'Sign In with Internet Identity'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
