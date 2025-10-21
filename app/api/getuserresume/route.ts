// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "../../lib/auth";
// import Resume from "../../../models/Resume";
// import { connectDB } from "../../../configs/db";

// export async function GET(_req: NextRequest) {
//   try {
//     const dbConnection = await connectDB();
//     if (!dbConnection) {
//       return NextResponse.json({ message: "Database not available" }, { status: 503 });
//     }

//     const session = await auth.api.getSession({
//       headers: {},
//     });

//     if (!session?.user?.id) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const userId = session.user.id;

//     const resumes = await (Resume as any).find({ userId }).sort({ updatedAt: -1 });

//     return NextResponse.json({ resumes }, { status: 200 });
//   } catch (error) {
//     console.error("getuserresume error:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }