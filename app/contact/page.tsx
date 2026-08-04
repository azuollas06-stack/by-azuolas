import { SiteShell } from "@/components/site-shell";
import { OrbitContact } from "@/components/orbit-contact";

export const metadata = {
  title: "Kontaktas",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <OrbitContact />
    </SiteShell>
  );
}
