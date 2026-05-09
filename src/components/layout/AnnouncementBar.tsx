import { fetchAnnouncement } from "@/lib/sanity/fetch";
import { ExternalLink } from "lucide-react";

export default async function AnnouncementBar() {
  const announcement = await fetchAnnouncement();
  if (!announcement?.text) return null;

  return (
    <div className="w-full bg-river-blue text-white text-sm text-center py-2 px-4">
      <span>{announcement.text}</span>
      {announcement.link && (
        <a
          href={announcement.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 ml-2 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Learn more
          <ExternalLink size={12} />
        </a>
      )}
    </div>
  );
}
