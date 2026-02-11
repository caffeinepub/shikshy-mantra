import { useParams, Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useGetSignupById } from '@/hooks/useAdminSignups';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, Phone, BookOpen, User, Hash } from 'lucide-react';

export default function AdminSignupDetailPage() {
  const { signupId } = useParams({ from: '/admin/signup/$signupId' });
  const { data: signup, isLoading, error } = useGetSignupById(BigInt(signupId));

  if (isLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error || !signup) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Button asChild variant="ghost" className="mb-6">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin Panel
            </Link>
          </Button>
          <Alert variant="destructive">
            <AlertDescription>
              {error?.message || 'Signup not found.'}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Panel
          </Link>
        </Button>

        <Card className="border-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{signup.fullName}</CardTitle>
                <CardDescription>Registration Details</CardDescription>
              </div>
              <Badge variant="secondary">Registered</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Hash className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Registration ID</p>
                  <p className="text-base font-mono">{signup.id.toString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Full Name</p>
                  <p className="text-base">{signup.fullName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Email Address</p>
                  <p className="text-base break-all">{signup.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
                  <p className="text-base">{signup.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Course of Interest</p>
                  <p className="text-base">{signup.courseOfInterest}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Created By (Principal)</p>
                  <p className="text-xs font-mono break-all">{signup.createdBy.toString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
