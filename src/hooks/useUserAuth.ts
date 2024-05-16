import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { createUser } from "@/api/createUser";
import { getUserById } from "@/api/getUserById";
import useUserStore from "@/store/userStore";
import { User } from "@/types";

const useUserAuth = () => {
  const { login } = useUserStore();
  const { query } = useRouter();
  const userId = query.id as string;

  const [isError, setIsError] = useState(false);

  const fetchUserById = async (userId: string) => {
    try {
      const response = await getUserById(userId);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  };

  const createNewUser = useCallback(
    async (userId: string) => {
      try {
        const userData = await createUser(userId);
        const { userId: newUserId, score, bets } = userData;
        login(newUserId, score, bets);
        toast.success(`User with id ${userId} has been created`);
        return userData;
      } catch (error) {
        throw new Error("Failed to create user");
      }
    },
    [login]
  );

  const loginExistingUser = useCallback(
    (userData: User) => {
      const { userId: existingUserId, score, bets } = userData;
      login(existingUserId, score, bets);
      toast.success(`User with id ${existingUserId} has logged in`);
    },
    [login]
  );

  useEffect(() => {
    if (!userId) return;

    const authenticateUser = async () => {
      try {
        const userData = await fetchUserById(userId);
        if (userData) {
          loginExistingUser(userData);
        } else {
          await createNewUser(userId);
        }
      } catch (error) {
        setIsError(true);
        toast.error("Failed to authenticate user");
      }
    };

    authenticateUser();
  }, [createNewUser, loginExistingUser, userId]);

  return { isError };
};

export default useUserAuth;
