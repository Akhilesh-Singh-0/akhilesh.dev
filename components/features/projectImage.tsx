import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
};

export function ProjectImage({ src, alt }: ProjectImageProps) {
  return (
    <div className="relative aspect-video w-full min-w-0 overflow-hidden bg-neutral-100">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
  );
}