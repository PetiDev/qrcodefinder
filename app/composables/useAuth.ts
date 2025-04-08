export const useAuth = () => {
    const token = useCookie("authorization", {
        sameSite: "strict"
    })

    const auth = async (authData: authRequest) => {
        await $fetch("/api/auth/", {
            method: "POST",
            body: {
                ...authData
            }
        })
            .then(body => token.value = body.token)
            .catch(() => token.value = "")
    }

    return {
        token,
        auth
    }
}