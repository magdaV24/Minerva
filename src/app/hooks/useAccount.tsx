import { useState, useEffect } from "react";
import { fetchCurrentUser, fetchUser } from "../../pages/home/accountSlice";
import { User } from "../models/User";
import { useAppDispatch } from "../store/configureStore"

export const useAccount = () => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const getUser = async () => {
          const res = await dispatch(fetchCurrentUser()).then(result => result.payload as any)
          setUser(res)
        }
        getUser();
      }, [dispatch]);

      return {user}
}