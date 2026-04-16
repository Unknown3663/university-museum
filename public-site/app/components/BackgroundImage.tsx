import Image from "next/image";

interface BackgroundImageProps {
  src: string;
  alt: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export default function BackgroundImage({
  src,
  alt,
  overlay = true,
  overlayOpacity = 50,
}: BackgroundImageProps) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover"
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity / 100})` }}
        ></div>
      )}
    </div>
  );
}
