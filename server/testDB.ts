import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
	try {
		const res = await prisma.$queryRaw`SELECT NOW()`;
		console.log('✅ Conection with RDS OK:', res);
	} catch (err) {
		console.error('❌ Erro with the conection:', err);
	} finally {
		await prisma.$disconnect();
	}
}

main();
