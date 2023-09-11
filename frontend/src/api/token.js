import { useAuth0 } from "@auth0/auth0-vue";

const getToken = async () => {
    const { getAccessTokenSilently } = useAuth0();
    return await getAccessTokenSilently();
}

export default getToken 