import { headers } from "next/headers";
import { auth } from "../../lib/auth";
import { NextResponse } from "next/server";
import Resume from "../../../models/Resume";
import { connectDB } from "../../../configs/db.js";
import { errorResponse, successResponse } from "../utils/apiHelpers";

export async function GET() {
  try {
    await connectDB();

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized - Please login" },
        { status: 401 }
      );
    }
    const resumes = await (Resume as any)
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();
    //   Return Resumes
    return successResponse(resumes);
  } catch (error) {
    return errorResponse(error, "Failed to fetch user resumes", 500);
  }
}
