import Image from "next/image";

type ProjectImageProps = { src?: string; alt: string };

export function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 640px) 304px, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm">
          Preview coming soon
        </div>
      )}
    </div>
  );
}