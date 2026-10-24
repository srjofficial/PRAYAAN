import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const event = searchParams.get("event");

    const qrFileMap: Record<string, string> = {
        "blind-typing": "blind-typing.jpeg",
        "website-60": "website-60.jpeg",
        "ai-prompt-engineering": "ai-prompt-engineering.jpeg",
        "tech-charades": "tech-charades.jpeg",
        "treasure-hunt": "treasure-hunt.jpeg",
        "reel-making": "reel-making.jpeg",
    };

    let filePath: string;
    let fileName: string;

    if (event && qrFileMap[event]) {
        filePath = path.join(process.cwd(), "public", "images", "qr", qrFileMap[event]);
        fileName = `${event}-payment-qr.jpeg`;
    } else {
        filePath = path.join(process.cwd(), "public", "home", "upi-qr.jpg");
        fileName = "fugeniz-upi-qr.jpg";
    }

    try {
        const fileBuffer = await readFile(filePath);
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "image/jpeg",
                "Content-Disposition": `attachment; filename="${fileName}"`,
                "Content-Length": fileBuffer.length.toString(),
            },
        });
    } catch {
        const fallbackPath = path.join(process.cwd(), "public", "home", "upi-qr.jpg");
        const fileBuffer = await readFile(fallbackPath);
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "image/jpeg",
                "Content-Disposition": 'attachment; filename="payment-qr.jpg"',
                "Content-Length": fileBuffer.length.toString(),
            },
        });
    }
}
