import prisma from '~~/lib/prisma'
import { useJwt } from '~~/server/utils/useJwt'


export default defineEventHandler(async (event) => {

    const {id} = await prisma.user.create({data:{}})

    const {generateJWT} = useJwt()

    return {token: `JWT ${await generateJWT({id})}`} as authResponse
})