import { useEffect, useState } from "react";

export const useFetchIA = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: null,
    })

    useEffect(() => {

        const getFetch = async () => {
            try {
                setState({
                    data: null,
                    isLoading: true,
                    hasError: null,
                });

                const resp = await fetch(url);
                const data = await resp.json();

                setState({
                    data,
                    isLoading: false,
                    hasError: null,
                });

            } catch (error) {
                setState({
                    data: null,
                    isLoading: false,
                    hasError: error.message,
                });
            }
        }

        getFetch();

    }, [url]);

    return state;
}