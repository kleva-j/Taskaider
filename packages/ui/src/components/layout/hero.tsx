import { PropsWithChildren } from "react";

export const Hero = ({ children }: PropsWithChildren) => {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        {/* <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link> */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          A Project/Task management web app.
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          I&apos;m building a web app with Next.js 13 server components. Follow
          along as we figure this out together.
        </p>
        {children}
      </div>
    </section>
  );
};
