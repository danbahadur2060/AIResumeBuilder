import { headers } from "next/headers";
import { auth } from "../../lib/auth";
import { NextRequest, NextResponse } from "next/server";
import Resume from "../../../models/Resume";
import { connectDB } from "../../../configs/db.js";
import { errorResponse, successResponse } from "../utils/apiHelpers";

export async function POST(response: NextRequest) {
  try {
    await connectDB();
    const body = await response.json();
    const session = await auth.api.getSession({ headers: await headers() });

    const resume = await new Resume({
      ...body,
      userId: session?.user?.id!,
    });
    await resume.save();
    return successResponse(resume, "Resume created successfully ", 201);
  } catch (error) {
    return errorResponse(error, "Failed to fetch user resumes", 500);
  }
}
export async function PUT(
  response: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await response.json();
    const session = await auth.api.getSession({ headers: await headers() });
    const { id } = await context.params;

    const { resumeId, resumeData, removeBackground } = body;

    return successResponse(id, "Id find success", 200);
  } catch (error) {
    return errorResponse(error, "Failed to fetch user resumes", 500);
  }
}
