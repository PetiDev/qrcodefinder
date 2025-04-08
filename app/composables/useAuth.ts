export const useAuth = () => {
    const token = useCookie("authorization", {
        sameSite: "strict"
    })

    const auth = async () => {
        await $fetch("/api/auth/", {
            method: "GET"
        })
            .then(body => token.value = body.token)
            .catch(() => token.value = "")
    }

    return {
        token,
        auth
    }
}