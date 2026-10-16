type BannerProps = {
  dark: string;
  light: string;
};

export function Banner({ dark, light }: BannerProps) {
  return (
    <div className="relative h-40 w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_65%,transparent)] sm:h-52">
      <video
        src={light}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 size-full object-cover dark:hidden"
      />
      <video
        src={dark}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 hidden size-full object-cover dark:block"
      />
    </div>
  );
}