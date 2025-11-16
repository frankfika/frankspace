import Link from "next/link";
import { profile } from "@/config/profile";
import Avatar from "@/components/Avatar";

export default function Home() {
  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <Avatar name={profile.name} />
        <h1 className="hero-title">
          {profile.name}
          <span className="hero-accent">.</span>
        </h1>
        <p className="muted">{profile.title}</p>
        <p className="text-foreground leading-relaxed text-base">{profile.headline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/about" className="link">
            About
          </Link>
          <Link href="/writing" className="link">
            Writing
          </Link>
        </div>
      </div>
    </section>
  );
}
