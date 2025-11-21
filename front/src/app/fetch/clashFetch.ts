import { CLASH_URL } from "@/lib/apiEndPoints";

export async function fetchClashs(token: string) {
  console.log("Fetching clashs from:", CLASH_URL);
  const res = await fetch(CLASH_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ["dashboard"],
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}

export async function fetchClash(id: number, token: string) {
  console.log("Fetching clash from:", `${CLASH_URL}/${id}`);
  const res = await fetch(`${CLASH_URL}/${id}`, {
    cache: "no-cache",
    headers: {
      Authorization: token,
    }
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return null;
}
