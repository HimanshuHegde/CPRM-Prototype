import {PrismaClient} from './generated/prisma/index.js'
const prisma = new PrismaClient();
let isConnected = false

export default async function initPrisma(){
    if(!isConnected){
        await prisma.$connect();
        isConnected = true
    }
    return prisma
}
