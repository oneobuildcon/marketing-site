// Renders the simple body format used by blog posts: "## " headings, "- "
// bullets, **bold** inline, and blank-line-separated paragraphs. Deliberately
// tiny — the admin types this on a phone, so anything more elaborate would get
// in the way.
function inline(text: string, keyPrefix: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={`${keyPrefix}-${i}`} className="font-semibold text-navy">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{part}</span>
    )
  );
}

export default function BlogBody({ body }: { body: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = body.split("\n");
  let paragraph: string[] = [];
  let bullets: string[] = [];
  let rows: string[][] = [];

  const flushParagraph = (key: string) => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ");
    blocks.push(
      <p key={key} className="mb-5 leading-relaxed text-navy/80">
        {inline(text, key)}
      </p>
    );
    paragraph = [];
  };
  const flushBullets = (key: string) => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={key} className="mb-5 space-y-2 pl-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 leading-relaxed text-navy/80">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
            <span>{inline(b, `${key}-${i}`)}</span>
          </li>
        ))}
      </ul>
    );
    bullets = [];
  };

  // "| a | b |" rows form a table; a "|---|---|" row marks the header divider.
  const flushTable = (key: string) => {
    if (!rows.length) return;
    const body = rows.filter((r) => !r.every((c) => /^-{2,}$/.test(c.trim())));
    const [head, ...rest] = body;
    blocks.push(
      <div key={key} className="mb-6 overflow-x-auto">
        <table className="w-full min-w-[20rem] border-collapse text-sm">
          <thead>
            <tr className="bg-navy text-white">
              {head.map((c, i) => (
                <th key={i} className="border border-navy px-3 py-2 text-left font-semibold">
                  {inline(c, `${key}-h${i}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rest.map((r, ri) => (
              <tr key={ri} className={ri % 2 ? "bg-black/[0.02]" : ""}>
                {r.map((c, ci) => (
                  <td key={ci} className="border border-black/10 px-3 py-2 text-navy/80">
                    {inline(c, `${key}-${ri}-${ci}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    rows = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) {
      flushTable(`t${i}`);
      flushBullets(`u${i}`);
      flushParagraph(`p${i}`);
      return;
    }
    if (line.startsWith("|")) {
      flushBullets(`u${i}`);
      flushParagraph(`p${i}`);
      rows.push(line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
      return;
    }
    if (line.startsWith("## ")) {
      flushTable(`t${i}`);
      flushBullets(`u${i}`);
      flushParagraph(`p${i}`);
      blocks.push(
        <h2 key={`h${i}`} className="mb-3 mt-9 text-xl font-bold text-navy sm:text-2xl">
          {line.slice(3)}
        </h2>
      );
      return;
    }
    if (line.startsWith("- ")) {
      flushParagraph(`p${i}`);
      bullets.push(line.slice(2));
      return;
    }
    flushBullets(`u${i}`);
    paragraph.push(line);
  });
  flushTable("t-end");
  flushBullets("u-end");
  flushParagraph("p-end");

  return <div className="text-[15px] sm:text-base">{blocks}</div>;
}
