type CourseThumbnailProps = {
  thumbnailUrl?: string;
  title: string;
};

export function CourseThumbnail({
  thumbnailUrl,
  title,
}: CourseThumbnailProps) {
  return (
    <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center shrink-0">
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <span className="text-white font-semibold text-xs">???</span>
      )}
    </div>
  );
}

