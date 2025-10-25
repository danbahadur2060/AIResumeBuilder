// Quick test script for app/api/sample route handlers
// Run: node test-sample-api.js

// Use dynamic import so ESM modules (Next route files) can be loaded
async function run() {
  try {
    const listRoute = await import("./app/api/sample/route.js");
    const idRoute = await import("./app/api/sample/[id]/route.js");

    // Call list GET
    const listResp = await listRoute.GET();
    console.log(
      "List route response (object keys):",
      Object.keys(listResp || {})
    );
    // If this is a NextResponse, its body may be inside ._storedBody or .body depending on environment
    try {
      // Try to extract JSON body if NextResponse provides it
      if (typeof listResp?.json === "function") {
        const json = await listResp.json();
        console.log(
          "List JSON length:",
          Array.isArray(json.data) ? json.data.length : undefined
        );
      } else if (listResp?.body) {
        console.log("List body present");
      }
    } catch (e) {
      // ignore
    }

    // Call id GET with a known id
    const params = { params: { id: "68d2a31a1c4dd38875bb037e" } };
    const idResp = await idRoute.GET(null, params);
    try {
      if (typeof idResp?.json === "function") {
        const json = await idResp.json();
        console.log("ID JSON keys:", Object.keys(json || {}));
      } else if (idResp?.body) {
        console.log("ID body present");
      }
    } catch (e) {
      // ignore
    }
  } catch (err) {
    console.error("Test runner error:", err);
    process.exitCode = 1;
  }
}

run();
