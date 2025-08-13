export type QueryRequestBody = {
  query: string;
  imageUrl?: string | null;
};

export type QueryResponse = {
  reply: string;
};

export async function postQuery(body: QueryRequestBody): Promise<QueryResponse> {
  const response = await fetch('/api/query', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }
  return response.json();
}

