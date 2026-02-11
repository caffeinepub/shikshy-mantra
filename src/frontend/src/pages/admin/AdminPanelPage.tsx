import { Link } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllSignups } from '@/hooks/useAdminSignups';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPanelPage() {
  const { data: signups, isLoading, error } = useGetAllSignups();

  if (isLoading) {
    return (
      <div className="container py-12 md:py-16">
        <div className="space-y-6">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12 md:py-16">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load signups. {error.message}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Admin Panel</h1>
            <p className="text-lg text-muted-foreground">Manage student registrations</p>
          </div>
        </div>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>Student Registrations</CardTitle>
          <CardDescription>
            Total registrations: {signups?.length || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!signups || signups.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No student registrations yet.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signups.map((signup) => (
                    <TableRow key={signup.id.toString()}>
                      <TableCell className="font-medium">{signup.id.toString()}</TableCell>
                      <TableCell>{signup.fullName}</TableCell>
                      <TableCell>{signup.email}</TableCell>
                      <TableCell>{signup.phoneNumber}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{signup.courseOfInterest}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link to="/admin/signup/$signupId" params={{ signupId: signup.id.toString() }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
