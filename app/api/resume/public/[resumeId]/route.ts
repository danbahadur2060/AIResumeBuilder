import { auth } from "../../../../lib/auth";
import Resume from "../../../../../models/Resume";
import { connectDB } from "../../../../../configs/db.js";
import { errorResponse, successResponse } from "../../../utils/apiHelpers";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(
  _request: NextRequest,
  context: { params: { resumeId: string } }
) {
  try {
    await connectDB();
    const { resumeId } = await context.params;
    const session = await auth.api.getSession({ headers: await headers() });

    const resume = await (Resume as any).findOne({
      public: true,
      _id: resumeId,
    });

    if (!resume) {
      return errorResponse(null, "Resume not found ", 404);
    }
    return successResponse(resume, "", 200);
  } catch (error) {
    return errorResponse(error, "Failed to fetch user resumes", 500);
  }
}
