import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateSignup } from '@/hooks/useStudentSignups';
import { toast } from 'sonner';

interface SignupFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  courseOfInterest: string;
}

interface StudentSignupFormProps {
  onSuccess?: () => void;
}

export default function StudentSignupForm({ onSuccess }: StudentSignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>();

  const createSignup = useCreateSignup();

  const onSubmit = async (data: SignupFormData) => {
    try {
      await createSignup.mutateAsync(data);
      toast.success('Registration successful!', {
        description: 'Your signup has been submitted successfully.',
      });
      reset();
      onSuccess?.();
    } catch (error: any) {
      toast.error('Registration failed', {
        description: error.message || 'Please try again later.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          placeholder="Enter your full name"
          {...register('fullName', { required: 'Full name is required' })}
          className={errors.fullName ? 'border-destructive' : ''}
        />
        {errors.fullName && (
          <p className="text-sm text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phoneNumber">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phoneNumber"
          type="tel"
          placeholder="Enter your phone number"
          {...register('phoneNumber', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9+\-\s()]+$/,
              message: 'Please enter a valid phone number',
            },
          })}
          className={errors.phoneNumber ? 'border-destructive' : ''}
        />
        {errors.phoneNumber && (
          <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address',
            },
          })}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="courseOfInterest">
          Course of Interest <span className="text-destructive">*</span>
        </Label>
        <Input
          id="courseOfInterest"
          placeholder="e.g., JEE, NEET, Foundation Course"
          {...register('courseOfInterest', { required: 'Course of interest is required' })}
          className={errors.courseOfInterest ? 'border-destructive' : ''}
        />
        {errors.courseOfInterest && (
          <p className="text-sm text-destructive">{errors.courseOfInterest.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={createSignup.isPending}>
        {createSignup.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {createSignup.isPending ? 'Submitting...' : 'Submit Registration'}
      </Button>
    </form>
  );
}
