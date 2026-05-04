import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentShell, LegalSection } from "@/components/legal/legal-document-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | Nand Care Foundation",
  description:
    "How Nand Care Foundation collects, uses, and protects personal information when you use our website and donation services.",
};

const LAST_UPDATED = "4 May 2026";

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentShell
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          This Privacy Policy explains how Nand Care Foundation (&quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) collects, uses, stores, and shares personal information when you visit
          our website, make a donation, create or use an account, or otherwise interact with us
          online. It should be read together with our{" "}
          <Link href="/terms-of-use" className="font-medium text-zinc-900 underline-offset-4 hover:underline">
            Terms of Use
          </Link>
          .
        </p>
      }
    >
      <LegalSection id="controller" heading="Who we are">
        <p>
          Nand Care Foundation is a non-profit organisation. Contact details (such as registered
          office, phone, and email) appear in the website footer and may be updated from time to
          time.
        </p>
      </LegalSection>

      <LegalSection id="collect" heading="Information we may collect">
        <p>Depending on how you use the website, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-zinc-800">Donation and transaction details:</span>{" "}
            such as name, email address, phone number, billing or receipt-related address where you
            choose to provide it, donation amount, campaign or programme selection, and transaction
            references. Payment card or banking details are handled by our payment service
            providers; we typically receive confirmation of payment status rather than full card
            numbers.
          </li>
          <li>
            <span className="font-medium text-zinc-800">Account or verification details:</span>{" "}
            if you register or log in (for example, via one-time password or similar), identifiers
            and session data needed to operate the account.
          </li>
          <li>
            <span className="font-medium text-zinc-800">Communications:</span> messages you send to
            us and records needed to respond.
          </li>
          <li>
            <span className="font-medium text-zinc-800">Technical and usage data:</span> such as IP
            address, device or browser type, general location derived from IP (for example, country
            or region), pages viewed, and timestamps. This helps us secure and improve the site.
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="use" heading="How we use information">
        <p>We use personal information for purposes such as:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>processing donations and issuing receipts or acknowledgements where applicable;</li>
          <li>operating accounts, authentication, and customer support;</li>
          <li>complying with law, including financial reporting and tax-related obligations;</li>
          <li>preventing fraud, abuse, and security incidents;</li>
          <li>
            understanding how the website is used so we can improve content and user experience, in
            line with applicable law;
          </li>
          <li>
            sending important notices about transactions or policy changes, and, where permitted,
            information about our programmes (you may opt out of marketing where the law requires).
          </li>
        </ul>
      </LegalSection>

      <LegalSection id="basis" heading="Legal bases">
        <p>
          Depending on the context, we rely on one or more of the following: your consent (where
          required); performance of a transaction you request; compliance with legal obligations;
          and legitimate interests in running a charitable organisation, securing our services, and
          communicating with supporters—balanced against your rights and freedoms.
        </p>
      </LegalSection>

      <LegalSection id="sharing" heading="Sharing and international transfers">
        <p>We may share information with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            payment processors and related financial service providers, strictly as needed to
            complete payments and reconciliation;
          </li>
          <li>
            technology vendors who host the website, send email, or provide analytics, under
            contractual safeguards appropriate to their role;
          </li>
          <li>
            professional advisers or authorities when required by law or to protect rights, safety,
            and security.
          </li>
        </ul>
        <p>
          Some providers may process data in India or other countries. Where personal data is
          transferred across borders, we aim to use appropriate safeguards as required by
          applicable law.
        </p>
      </LegalSection>

      <LegalSection id="retention" heading="Retention">
        <p>
          We keep personal information only as long as needed for the purposes above, including
          legal, accounting, and reporting requirements. Retention periods vary by data type and
          obligation; some records may need to be kept for several years under applicable law.
        </p>
      </LegalSection>

      <LegalSection id="security" heading="Security">
        <p>
          We implement reasonable technical and organisational measures designed to protect personal
          information. No method of transmission over the internet is completely secure; we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="rights" heading="Your choices and rights">
        <p>
          Depending on applicable law, you may have rights to access, correct, update, or delete
          certain personal information, or to object to or restrict certain processing. You may also
          have the right to lodge a complaint with a supervisory or regulatory authority, where one
          exists.
        </p>
        <p>
          To exercise rights or ask questions, contact us using the details in the footer. We may
          need to verify your request before responding.
        </p>
      </LegalSection>

      <LegalSection id="cookies" heading="Cookies and similar technologies">
        <p>
          We may use cookies or similar technologies for essential site operation, preferences,
          analytics, or security. You can control cookies through your browser settings; blocking
          some cookies may affect how the site works.
        </p>
      </LegalSection>

      <LegalSection id="links" heading="Third-party links">
        <p>
          Our website may link to third-party sites or services. We are not responsible for their
          privacy practices; please read their policies before providing information.
        </p>
      </LegalSection>

      <LegalSection id="children" heading="Children">
        <p>
          This website is not directed at children for collecting personal information without
          appropriate parental involvement. If you believe we have collected information from a child
          inappropriately, please contact us and we will take reasonable steps to address the issue.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="Changes to this Policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date
          will change when we do. We encourage you to review this page periodically.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="Contact">
        <p>
          For privacy-related requests or questions, please use the contact email or phone number
          shown in the website footer, or other official channels we publish.
        </p>
      </LegalSection>
    </LegalDocumentShell>
  );
}
