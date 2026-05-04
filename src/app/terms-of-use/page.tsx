import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentShell, LegalSection } from "@/components/legal/legal-document-shell";

export const metadata: Metadata = {
  title: "Terms of Use | Nand Care Foundation",
  description:
    "Terms of use for the Nand Care Foundation website and making donations.",
};

const LAST_UPDATED = "4 May 2026";

export default function TermsOfUsePage() {
  return (
    <LegalDocumentShell
      title="Terms of Use"
      lastUpdated={LAST_UPDATED}
      intro={
        <p>
          These Terms of Use (&quot;Terms&quot;) govern your access to and use of the website
          operated by Nand Care Foundation (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By
          using this website or making a donation, you agree to these Terms. Please also read our{" "}
          <Link href="/privacy-policy" className="font-medium text-zinc-900 underline-offset-4 hover:underline">
            Privacy Policy
          </Link>
          , which describes how we handle personal information.
        </p>
      }
    >
      <LegalSection id="about" heading="About us">
        <p>
          Nand Care Foundation is a non-profit organisation working with communities to support
          programmes in areas such as education, nutrition, healthcare, livelihoods, and related
          welfare initiatives. This website provides information about our work and allows voluntary
          donations toward approved programmes and campaigns, subject to availability and operational
          constraints.
        </p>
      </LegalSection>

      <LegalSection id="use" heading="Use of the website">
        <p>
          You agree to use this website only for lawful purposes and in a way that does not infringe
          the rights of others or restrict or inhibit anyone else&apos;s use of the site. You are
          responsible for ensuring that any information you provide is accurate and, where relevant,
          kept up to date.
        </p>
        <p>
          We may update, suspend, or withdraw parts of the website from time to time. We do not
          guarantee that the site will be uninterrupted or free from errors. Content is provided for
          general information; it may change without notice.
        </p>
      </LegalSection>

      <LegalSection id="donations" heading="Donations">
        <p>
          Donations made through this website are voluntary. Payments are processed by one or more
          third-party payment service providers. By donating, you authorise us and our payment
          partners to charge the payment method you provide, in accordance with their terms and
          applicable law.
        </p>
        <p>
          Donations are typically applied toward the purposes described at the point of contribution
          (for example, a selected campaign or programme). Where that is not possible for operational
          or legal reasons, we may apply funds to other charitable purposes consistent with our
          objects, as permitted by law and our policies.
        </p>
        <p>
          Receipts or acknowledgements, where issued, are subject to our records and applicable
          statutory requirements. Any tax or regulatory benefit depends on the law in force at the
          relevant time, eligibility, and correct documentation; nothing on this website should be
          read as a promise of a particular tax outcome.
        </p>
        <p>
          Questions about a completed transaction should be directed to us using the contact details
          below. Resolution may depend on payment partner policies and banking timelines.
        </p>
      </LegalSection>

      <LegalSection id="accounts" heading="Accounts and communications">
        <p>
          Where the website offers account registration, login, or similar features, you are
          responsible for safeguarding access credentials and for activity under your account, to the
          extent permitted by law.
        </p>
        <p>
          We may send operational communications related to donations, receipts, or security. Where
          required by law, we will obtain appropriate consent for marketing communications.
        </p>
      </LegalSection>

      <LegalSection id="ip" heading="Intellectual property">
        <p>
          Unless otherwise stated, text, images, logos, and other materials on this website are
          owned by or licensed to Nand Care Foundation and are protected by applicable intellectual
          property laws. You may not copy, modify, distribute, or exploit site content for
          commercial purposes without our prior written permission, except as allowed by law.
        </p>
      </LegalSection>

      <LegalSection id="conduct" heading="Prohibited conduct">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>use the website to transmit unlawful, harassing, defamatory, or harmful material;</li>
          <li>
            attempt to gain unauthorised access to our systems, other users&apos; data, or payment
            flows;
          </li>
          <li>
            use automated means to scrape or overload the site in a way that could impair service;
          </li>
          <li>misrepresent your identity or affiliation when using the site or making a donation.</li>
        </ul>
      </LegalSection>

      <LegalSection id="disclaimer" heading="Disclaimer and limitation of liability">
        <p>
          To the fullest extent permitted by applicable law, the website and its content are
          provided &quot;as is&quot; without warranties of any kind, whether express or implied. We
          do not warrant that the site will meet your requirements or that it will be secure or
          error-free.
        </p>
        <p>
          To the fullest extent permitted by applicable law, we shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, or for any loss of profits, data,
          or goodwill, arising from your use of the website or any donation transaction, except where
          liability cannot be excluded under applicable law.
        </p>
      </LegalSection>

      <LegalSection id="indemnity" heading="Indemnity">
        <p>
          To the extent permitted by law, you agree to indemnify and hold harmless Nand Care
          Foundation and its trustees, employees, and volunteers from claims or losses arising from
          your breach of these Terms or misuse of the website, except where such liability arises
          from our wilful misconduct or as otherwise required by law.
        </p>
      </LegalSection>

      <LegalSection id="changes" heading="Changes to these Terms">
        <p>
          We may revise these Terms from time to time. The &quot;Last updated&quot; date at the top
          of this page will change when we do. Continued use of the website after changes constitutes
          your acceptance of the updated Terms, to the extent permitted by law. If you do not agree,
          you should stop using the website.
        </p>
      </LegalSection>

      <LegalSection id="law" heading="Governing law and disputes">
        <p>
          These Terms are governed by the laws of India, without regard to conflict-of-law rules that
          would apply another jurisdiction&apos;s laws. Courts in India shall have non-exclusive
          jurisdiction over disputes arising from these Terms or use of the website, subject to any
          mandatory provisions that cannot be waived.
        </p>
      </LegalSection>

      <LegalSection id="contact" heading="Contact">
        <p>
          For questions about these Terms, please contact us using the details published on this
          website (for example, the contact email and phone number shown in the footer).
        </p>
      </LegalSection>
    </LegalDocumentShell>
  );
}
