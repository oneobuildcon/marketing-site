type LogoMarkProps = {
  className?: string;
};

/**
 * One O Buildcon logo mark — stylised "O 1 E" (ONE) in white,
 * matching the company's 3D monogram. Rendered as SVG so it stays
 * crisp at any size and works on the dark navy navbar / footer.
 */
export default function LogoMark({ className = "h-8 w-auto" }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 132 56"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="One O Buildcon"
    >
      {/* O — ring */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 4a24 24 0 1 0 0 48 24 24 0 0 0 0-48Zm0 14a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z"
      />
      {/* 1 — stylised numeral with angled flag + base wedge */}
      <path d="M64 4h12v48H64V31L52 43V29l12-12V4Z" />
      <path d="M52 38l12 14H52V38Z" />
      {/* E */}
      <path d="M90 4h38v12h-26v6h22v12h-22v6h26v12H90V4Z" />
    </svg>
  );
}
