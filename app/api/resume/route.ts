import { NextRequest, NextResponse } from "next/server";
import Resume from "../../../models/Resume";
import { connectDB } from "../../../configs/db";
import imagekit from "../../../configs/imagekit";
import { auth } from "../../lib/auth";
// removed unused 'fs' import because we handle upload via FormData -> ArrayBuffer

// Create (POST)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const userId = session.user.id;

    const resume = new Resume({
      ...body,
      userId,
    });

    await resume.save();

    return NextResponse.json({ resume }, { status: 201 });
  } catch (error) {
    console.error("resume creation error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Delete (DELETE)
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Extract resume id from URL path (e.g. /api/resume/<id>)
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const resumeid = pathParts[pathParts.length - 1];

    if (!resumeid) {
      return NextResponse.json({ message: "Resume ID is required" }, { status: 400 });
    }

    const deleted = await (Resume as any).findOneAndDelete({ _id: resumeid, userId });

    if (!deleted) {
      return NextResponse.json({ message: "Resume not found or not owned by user" }, { status: 404 });
    }

    return NextResponse.json({ message: "Resume deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("resume deletion error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Read single resume (GET)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const url = new URL(request.url);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const resumeid = pathParts[pathParts.length - 1];

    if (!resumeid) {
      return NextResponse.json({ message: "Resume ID is required" }, { status: 400 });
    }

    // Find by id and ensure ownership
    const resume = await (Resume as any).findOne({ _id: resumeid, userId });

    if (!resume) {
      return NextResponse.json({ message: "Resume not found" }, { status: 404 });
    }

    return NextResponse.json({ resume }, { status: 200 });
  } catch (error) {
    console.error("resume fetch error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Update (PUT) — supports JSON body or multipart/form-data (with file upload)
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Detect resume id from URL
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const resumeid = pathParts[pathParts.length - 1];

    if (!resumeid) {
      return NextResponse.json({ message: "Resume ID is required" }, { status: 400 });
    }

    const contentType = request.headers.get("content-type") || "";

    let resumeDataCopy: any = null;
    let removeBackground = false;

    if (contentType.includes("multipart/form-data")) {
      // handle form data + file upload
      const formData = await request.formData();

      const resumeData = formData.get("resumeData");
      const removeBgVal = formData.get("removeBackground");

      if (!resumeData) {
        return NextResponse.json({ message: "resumeData field is required in form" }, { status: 400 });
      }

      // parse resumeData (should be a JSON string)
      try {
        resumeDataCopy = typeof resumeData === "string" ? JSON.parse(resumeData) : JSON.parse(String(resumeData));
      } catch (e) {
        return NextResponse.json({ message: "Invalid JSON in resumeData" }, { status: 400 });
      }

      removeBackground = removeBgVal === "true" || String(removeBgVal) === "true";

      const file = formData.get("image") as any | null; // File or null
      if (file && file.size) {
        // convert file to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to ImageKit (SDK typically accepts base64 or buffer)
        const uploadResponse = await imagekit.files.upload({
          file: buffer,
          fileName: `resume-${Date.now()}.png`,
          folder: "user-resumes",
          // If ImageKit SDK expects 'transformation' format, adapt as needed.
          // Here we add an example query param for background removal — adjust for your ImageKit config.
          // Many SDKs accept 'useUniqueFileName', 'isPrivateFile' etc. See your SDK docs.
        });

        // set image url in resume data (ensure personal_info exists)
        resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
        resumeDataCopy.personal_info.image = uploadResponse.url;
      }
    } else {
      // assume JSON body
      const body = await request.json();
      const { resumeData, removeBackground: rb } = body;
      removeBackground = !!rb;

      if (!resumeData) {
        return NextResponse.json({ message: "resumeData is required" }, { status: 400 });
      }

      // If resumeData is already object, use it; if string, parse
      resumeDataCopy = typeof resumeData === "string" ? JSON.parse(resumeData) : resumeData;

      // NOTE: If you want image uploading with JSON you must provide an image URL or base64 in JSON.
    }

    // Update the resume ensuring it belongs to the authenticated user
    const updated = await (Resume as any).findOneAndUpdate(
      { _id: resumeid, userId },
      resumeDataCopy,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Resume not found or not owned by user" }, { status: 404 });
    }

    return NextResponse.json({ message: "Saved successfully", resume: updated }, { status: 200 });
  } catch (error) {
    console.error("resume update error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
