import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById } from "../api/users";

export function useAllUsers(token) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(token),
  });
}

export function useUser(userId, token) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId, token),
  });
}
