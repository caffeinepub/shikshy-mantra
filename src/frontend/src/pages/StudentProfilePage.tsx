import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMySignups } from '@/hooks/useStudentSignups';
import { Mail, Phone, BookOpen, Calendar, User } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function StudentProfilePage() {
  const { data: signups, isLoading, error } = useGetMySignups();

  if (isLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to load your signups. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Registrations</h1>
          <p className="text-lg text-muted-foreground">
            View your submitted registration details
          </p>
        </div>

        {!signups || signups.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                You haven't submitted any registrations yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {signups.map((signup) => (
              <Card key={signup.id.toString()} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{signup.fullName}</CardTitle>
                      <CardDescription>Registration ID: {signup.id.toString()}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      Registered
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="text-sm">{signup.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p className="text-sm">{signup.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Course</p>
                        <p className="text-sm">{signup.courseOfInterest}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
