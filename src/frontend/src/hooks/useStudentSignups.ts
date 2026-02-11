import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StudentSignup } from '../backend';

interface SignupFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
  courseOfInterest: string;
}

export function useCreateSignup() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupFormData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.signup(data.fullName, data.phoneNumber, data.email, data.courseOfInterest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySignups'] });
    },
  });
}

export function useGetMySignups() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentSignup[]>({
    queryKey: ['mySignups'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getMySignups();
    },
    enabled: !!actor && !actorFetching,
  });
}
