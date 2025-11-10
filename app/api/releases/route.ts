export async function GET() {
  try {
    // Replace 'owner/repo' with your GitHub repository
   const response = await fetch(
  "https://api.github.com/repos/y4th4rthh/neura.ai-releases/releases",
  {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "neura-ai", // GitHub requires this
    },
    // Cache for 1 hour
    next: { revalidate: 3600 },
  }
);


    if (!response.ok) {
      throw new Error(`Failed to fetch releases: ${response.statusText}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("[v0] Error fetching GitHub releases:", error)
    return Response.json({ error: "Failed to fetch releases" }, { status: 500 })
  }
}
