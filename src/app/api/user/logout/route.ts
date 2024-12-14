import { deleteSession } from "@/app/libs/session";
import { NextResponse } from "next/server";

export async function DELETE() {
    try {
        await deleteSession()
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({
            error:error.message as string
        },{
            status:500,
            statusText:'FAIL'
        })

    }
}