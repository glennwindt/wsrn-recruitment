export async function registerCandidate(candidateData) {
  try {
    const response = await fetch("/api/seafarers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidateData)
    });
    if (!response.ok) throw new Error("Failed to register");
    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

