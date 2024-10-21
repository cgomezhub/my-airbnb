import bcryptjs from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prismadb';


export async function POST(request: Request) {
 

    console.log({metod: request.method});

    const body = await request.json();

    const { email, name,  password } = body;

    const hashedPassword = await  bcryptjs.hashSync(password, 12);

    const user = await prisma.user.create({
        data: {
            email: email.toLowerCase(),
            name: name,
            password: hashedPassword
        }
    });
 
    return NextResponse.json(user);

}