import { Link, useRouterState } from '@tanstack/react-router';
import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import AuthControls from './auth/AuthControls';
import { Button } from '@/components/ui/button';

export default function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
            Shikshy Mantra
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/student-signup"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/student-signup') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Student Signup
          </Link>
          <Link
            to="/admin"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Admin Panel
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <AuthControls />
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/student-signup"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/student-signup') ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Student Signup
            </Link>
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/admin') ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
