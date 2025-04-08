import { createSecretKey } from "crypto"
import { type JWTPayload, SignJWT, jwtVerify } from "jose"


export const useJwt = () => {

    const verifyJWT = async (token: string) => {
        const config = useRuntimeConfig()
        const secretKey = createSecretKey(config.JWT_SECRET, 'utf-8')

        let data = null;

        try {
            const { payload } = await jwtVerify(token, secretKey, { algorithms: ["HS512"],  });

            data = payload
        } catch (e) {
            data = null
        }

        return data
    }

    const generateJWT = async (payload: JWTPayload, exp: number | string | Date = '2 day') => {
        const config = useRuntimeConfig()
        const secretKey = createSecretKey(config.JWT_SECRET, 'utf-8')

        const newToken = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS512' })
            .setIssuedAt()
            .setExpirationTime(exp)
            .sign(secretKey)


        if (!(await verifyJWT(newToken))) {
            throw createError({ statusCode: 500, statusMessage: "Failed to create token" })
        }

        return newToken

    }

    return {
        generateJWT,
        verifyJWT
    }
}