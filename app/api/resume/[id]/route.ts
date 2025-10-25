import { auth } from "../../../lib/auth";
import Resume from "../../../../models/Resume";
import { connectDB } from "../../../../configs/db.js";
import { errorResponse, successResponse } from "../../utils/apiHelpers";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function DELETE(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = context.params;
    const session = await auth.api.getSession({ headers: await headers() });

    await (Resume as any).findOneAndDelete({
      userId: session?.user?.id,
      _id: id,
    });

    return successResponse("", "Resume deleted success ", 200);
  } catch (error) {
    return errorResponse(error, "Failed to fetch user resumes", 500);
  }
}

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = context.params;
    const session = await auth.api.getSession({ headers: await headers() });

    const resume = await (Resume as any).findOne({
      userId: session?.user?.id,
      _id: id,
    });

    if (!resume) {
      return errorResponse(".", "Resume not found", 404);
    }
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;
    return successResponse(resume, "", 200);
  } catch (error) {
    return errorResponse(error, "Failed to fetch user resumes", 500);
  }
}
