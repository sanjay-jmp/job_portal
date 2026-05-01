import { useSession } from "@clerk/react";
import { useState } from "react";

const useFetch = (cb, options = {}) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { session } = useSession();

    const fn = async (...args) => {
        if (!session) return;
        setLoading(true);
        setError(null);

        try {
            const supabaseAccessToken = await session.getToken();
            const response = await cb(supabaseAccessToken, options, ...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { fn, data, loading, error };
};

export default useFetch;