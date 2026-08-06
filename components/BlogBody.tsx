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

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) {
      flushBullets(`u${i}`);
      flushParagraph(`p${i}`);
      return;
    }
    if (line.startsWith("## ")) {
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
  flushBullets("u-end");
  flushParagraph("p-end");

  return <div className="text-[15px] sm:text-base">{blocks}</div>;
}
