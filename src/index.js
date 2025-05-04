export default {
  async fetch(request, env, ctx) {
    const { method } = request;
    const url = new URL(request.url);

    if (method !== 'GET') {
      return new Response(JSON.stringify({ error: "Only GET method supported" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    const dateStr = url.searchParams.get('date');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return new Response(JSON.stringify({ error: "Invalid or missing date (YYYY-MM-DD expected)" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const [year, month, day] = dateStr.split('-').map(Number);

    try {
      const holidayData = await import(`../holiday/${year}.json`, {
        with: { type: "json" }
      });

      let status = holidayData.default[dateStr];

      if (status === undefined) {
        const weekday = new Date(dateStr).getDay();
        status = (weekday === 0 || weekday === 6) ? 1 : 0;
      }

      return new Response(JSON.stringify({
        date: dateStr,
        year,
        month,
        day,
        status,
      }), {
        headers: { "Content-Type": "application/json" },
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: `Holiday data for year ${year} not found.` }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
