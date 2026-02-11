import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { ShieldAlert, Home } from 'lucide-react';

export default function AccessDeniedScreen() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-destructive/50">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                <ShieldAlert className="h-8 w-8 text-destructive" />
              </div>
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access this page. Admin privileges are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full" variant="outline">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
