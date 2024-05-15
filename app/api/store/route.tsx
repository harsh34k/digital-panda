import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        console.log("here");

        const { userId }: { userId: string | null } = auth();
        console.log("userid", userId);

        const body = await req.json();
        const { name } = body;
        console.log("name", name);

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }
        const store = await prismadb.store.create({
            data: {
                name,
                userId

            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("Store_Post", error);
        console.error("eror", error)
        return new NextResponse("Internal error ", { status: 500 })

    }
}