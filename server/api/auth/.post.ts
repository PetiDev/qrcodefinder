import * as jose from 'jose'
import { z } from 'zod'
import { useJwt } from '~~/server/utils/useJwt'

const userSchema = z.object({
  id: z.string()
})


export default defineEventHandler(async (event) => {


    const body = await readValidatedBody(event, body => userSchema.safeParse(body))

    if (!body.success)
        throw body.error.issues;


    const {generateJWT} = useJwt()

    return {token: `JWT ${await generateJWT(body)}`} as authResponse
})