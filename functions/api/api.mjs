// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2

export default async (request, context) => {
  try {
    const url = new URL(request.url);
    const date = url.searchParams.get("date") || null;

    const params = new URLSearchParams({
      api_key: process.env.API_KEY,
      earth_date: date,
    });

    const fetchURL = `${process.env.API_URL}?${params}`;

    const response = await fetch(fetchURL);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return (
      new Response(error.toString()),
      {
        status: 500,
      }
    );
  }
};
