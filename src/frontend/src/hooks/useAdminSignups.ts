import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StudentSignup } from '../backend';

export function useGetAllSignups() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentSignup[]>({
    queryKey: ['allSignups'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getAllSignups();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetSignupById(id: bigint) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<StudentSignup | null>({
    queryKey: ['signup', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getSignupById(id);
    },
    enabled: !!actor && !actorFetching,
  });
}
