import { Link } from '@tanstack/react-router';
import { GraduationCap, Users, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/20 dark:to-background">
        <div className="container py-16 md:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/generated/shikshy-mantra-logo.dim_512x512.png"
                  alt="Shikshy Mantra Logo"
                  className="h-16 w-16 md:h-20 md:w-20"
                />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-amber-600 to-amber-700 bg-clip-text text-transparent">
                    Shikshy Mantra
                  </span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Empowering students to achieve their dreams through quality education and personalized guidance.
              </p>
              <p className="text-lg text-muted-foreground">
                Join our coaching institute and unlock your full potential with expert mentorship and comprehensive learning programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base">
                  <Link to="/student-signup">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base">
                  <Link to="/admin">Admin Panel</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/shikshy-mantra-hero.dim_1600x900.png"
                alt="Education Hero"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Shikshy Mantra?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide a comprehensive learning experience designed to help you succeed.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Expert Faculty</CardTitle>
              <CardDescription>
                Learn from experienced educators dedicated to your success.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our instructors bring years of teaching experience and industry knowledge to help you excel.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Personalized Attention</CardTitle>
              <CardDescription>
                Small batch sizes ensure individual focus and support.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We maintain optimal student-teacher ratios for effective learning and mentorship.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Proven Results</CardTitle>
              <CardDescription>
                Track record of student success and achievement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our students consistently achieve their academic and career goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-amber-500/10 to-primary/10">
        <div className="container py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sign up today and take the first step towards achieving your educational goals.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link to="/student-signup">
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
