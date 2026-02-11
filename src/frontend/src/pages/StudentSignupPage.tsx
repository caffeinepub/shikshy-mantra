import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StudentSignupForm from '@/components/StudentSignupForm';
import { GraduationCap } from 'lucide-react';

export default function StudentSignupPage() {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: '/student-profile' });
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Student Registration</h1>
          <p className="text-lg text-muted-foreground">
            Join Shikshy Mantra and start your learning journey today
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Registration Form</CardTitle>
            <CardDescription>
              Please fill in your details to complete the registration process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StudentSignupForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
