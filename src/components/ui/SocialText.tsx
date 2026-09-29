interface SocialTextProps {
  text: string;
  facebookUrl: string;
  instagramUrl: string;
  linkClassName: string;
}

export default function SocialText({ text, facebookUrl, instagramUrl, linkClassName }: SocialTextProps) {
  const urls: Record<string, string> = { Facebook: facebookUrl, Instagram: instagramUrl };
  return (
    <>
      {text.split(/(Facebook|Instagram)/).map((part, i) =>
        urls[part] ? (
          <a key={i} href={urls[part]} target="_blank" rel="noopener noreferrer" className={linkClassName}>
            {part}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
}
