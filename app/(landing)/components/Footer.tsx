"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Logo } from './Logo';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-modal-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-72px)] text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Footer: React.FC = () => {
  const [termsOpen, setTermsOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 pt-16 md:pt-20 pb-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Logo className="w-7 h-7" />
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                Khizo AI
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs text-center md:text-left">
              Empowering creators with the next generation of artificial
              intelligence tools.
            </p>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 dark:text-slate-400 text-xs text-center md:text-left">
              © 2026 Khizo AI Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setTermsOpen(true)}
                className="text-slate-500 dark:text-slate-400 text-xs hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => setPrivacyOpen(true)}
                className="text-slate-500 dark:text-slate-400 text-xs hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms & Conditions Modal */}
      <Modal
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms & Conditions"
      >
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Last updated: February 6, 2026
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-2">
          1. Acceptance of Terms
        </h3>
        <p>
          By accessing or using Khizo AI (&quot;the Service&quot;), you agree to
          be bound by these Terms &amp; Conditions. If you do not agree with any
          part of these terms, you must not use the Service.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          2. Description of Service
        </h3>
        <p>
          Khizo AI provides AI-powered image transformation tools, including but
          not limited to image restoration, object removal, recoloring, and
          generative fill. We reserve the right to modify, suspend, or
          discontinue any part of the Service at any time.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          3. User Accounts
        </h3>
        <p>
          You are responsible for maintaining the confidentiality of your account
          credentials and for all activities that occur under your account. You
          must notify us immediately of any unauthorized use of your account.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          4. Acceptable Use
        </h3>
        <p>You agree not to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Use the Service for any unlawful purpose.</li>
          <li>
            Upload, process, or distribute content that violates any
            intellectual property rights, privacy rights, or applicable laws.
          </li>
          <li>
            Attempt to reverse-engineer, decompile, or extract the source code
            of our AI models.
          </li>
          <li>
            Use automated tools to scrape, overload, or interfere with the
            Service.
          </li>
        </ul>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          5. Intellectual Property
        </h3>
        <p>
          You retain ownership of images you upload. By using the Service, you
          grant Khizo AI a limited, non-exclusive license to process and
          transform your images solely for the purpose of providing the Service.
          All AI models, algorithms, and platform content remain the exclusive
          property of Khizo AI Inc.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          6. Credits &amp; Payments
        </h3>
        <p>
          Certain features require credits, which can be purchased through the
          platform. All purchases are final and non-refundable unless otherwise
          required by law. We reserve the right to change pricing at any time
          with prior notice.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          7. Limitation of Liability
        </h3>
        <p>
          To the fullest extent permitted by law, Khizo AI shall not be liable
          for any indirect, incidental, special, or consequential damages
          arising from your use of the Service. Our total liability shall not
          exceed the amount you paid in the 12 months preceding the claim.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          8. Termination
        </h3>
        <p>
          We may suspend or terminate your account at our sole discretion if you
          violate these terms. Upon termination, your right to use the Service
          ceases immediately.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          9. Changes to Terms
        </h3>
        <p>
          We reserve the right to update these terms at any time. Continued use
          of the Service after changes constitutes acceptance of the modified
          terms.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          10. Contact Us
        </h3>
        <p>
          If you have questions about these Terms, please contact us at{' '}
          <span className="text-indigo-600 dark:text-indigo-400">
            support@khizo.ai
          </span>
          .
        </p>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Last updated: February 6, 2026
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-2">
          1. Information We Collect
        </h3>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>Account Information:</strong> Name, email address, and
            profile details provided during registration.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with
            our Service, including features used and transformation history.
          </li>
          <li>
            <strong>Uploaded Content:</strong> Images you upload for processing
            through our AI tools.
          </li>
          <li>
            <strong>Payment Information:</strong> Billing details processed
            securely through our third-party payment provider (Lemon Squeezy).
          </li>
        </ul>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          2. How We Use Your Information
        </h3>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Provide, maintain, and improve the Service.</li>
          <li>Process transactions and manage your credits.</li>
          <li>
            Communicate with you about updates, promotions, and support.
          </li>
          <li>Ensure security and prevent fraudulent activity.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          3. Data Storage &amp; Security
        </h3>
        <p>
          Your data is stored on secure servers with industry-standard
          encryption. Uploaded images are processed in real-time and are not
          stored permanently unless required by the Service (e.g., transformation
          history). We implement appropriate technical and organizational
          measures to protect your personal data.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          4. Third-Party Services
        </h3>
        <p>We use trusted third-party services including:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>
            <strong>Clerk:</strong> For authentication and user management.
          </li>
          <li>
            <strong>Lemon Squeezy:</strong> For secure payment processing.
          </li>
          <li>
            <strong>Cloudinary:</strong> For image storage and transformation.
          </li>
          <li>
            <strong>MongoDB:</strong> For database storage.
          </li>
        </ul>
        <p>
          Each third-party service has its own privacy policy governing the use
          of your data.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          5. Cookies &amp; Tracking
        </h3>
        <p>
          We use essential cookies required for authentication and session
          management. We do not use advertising cookies or sell your data to
          third parties.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          6. Your Rights
        </h3>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside space-y-1 ml-2">
          <li>Access your personal data.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data.</li>
          <li>Withdraw consent at any time.</li>
          <li>Export your data in a portable format.</li>
        </ul>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          7. Data Retention
        </h3>
        <p>
          We retain your personal data only for as long as necessary to provide
          the Service and fulfill the purposes outlined in this policy. When your
          account is deleted, we will remove your personal data within 30 days,
          except where retention is required by law.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          8. Children&apos;s Privacy
        </h3>
        <p>
          The Service is not intended for users under the age of 13. We do not
          knowingly collect personal data from children. If we become aware that
          a child has provided us with personal data, we will take steps to
          delete it.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          9. Changes to This Policy
        </h3>
        <p>
          We may update this Privacy Policy from time to time. We will notify you
          of material changes by posting the updated policy on our platform. Your
          continued use of the Service after any changes constitutes acceptance
          of the updated policy.
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white">
          10. Contact Us
        </h3>
        <p>
          For privacy-related inquiries, please contact us at{' '}
          <span className="text-indigo-600 dark:text-indigo-400">
            privacy@khizo.ai
          </span>
          .
        </p>
      </Modal>
    </>
  );
};
