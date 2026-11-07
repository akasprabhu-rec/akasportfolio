import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  Send,
  MessageCircle,
  Phone,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PortfolioData } from '../config/portfolioData';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  data: PortfolioData['contact'];
}

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  websiteType: string;
  estimatedBudget: string;
  launchDate: string;
  requirements: string;
}

const INITIAL_FORM: FormState = {
  fullName: '',
  businessName: '',
  email: '',
  websiteType: 'Business Website',
  estimatedBudget: '₹10,000 – ₹25,000 (Core Business)',
  launchDate: 'Within 1 month',
  requirements: '',
};

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [generatedBrief, setGeneratedBrief] = useState<string>('');
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formState.fullName.trim()) {
      errors.fullName = 'Please enter your full name';
    }
    if (!formState.businessName.trim()) {
      errors.businessName = 'Please enter your business or company name';
    }
    if (!formState.email.trim()) {
      errors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formState.requirements.trim()) {
      errors.requirements = 'Please describe your project requirements and goals';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatBrief = (state: FormState): string => {
    return [
      `PROJECT INQUIRY BRIEF`,
      `====================`,
      `Client: ${state.fullName}`,
      `Business: ${state.businessName}`,
      `Email: ${state.email}`,
      `Website Type: ${state.websiteType}`,
      `Estimated Budget: ${state.estimatedBudget}`,
      `Target Launch: ${state.launchDate}`,
      ``,
      `PROJECT REQUIREMENTS:`,
      `--------------------`,
      state.requirements,
      ``,
      `[Dispatched via Akas Prabhu Portfolio]`,
    ].join('\n');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const brief = formatBrief(formState);
    setGeneratedBrief(brief);
    setSubmitted(true);

    const subject = `Website Project Inquiry: ${formState.businessName} (${formState.websiteType})`;
    const mailtoLink = `mailto:${data.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(brief)}`;

    // Open default mail client with pre-filled structured project brief
    window.location.href = mailtoLink;
  };

  const handleSendWhatsApp = () => {
    const cleanNumber = (data.whatsapp || '919360484615').replace(/[^0-9]/g, '');
    const message = formState.fullName
      ? `Hi Akas! I would like to discuss a website project.\n\n*Name:* ${formState.fullName}\n*Business:* ${formState.businessName}\n*Type:* ${formState.websiteType}\n*Budget:* ${formState.estimatedBudget}\n*Timeline:* ${formState.launchDate}\n*Requirements:* ${formState.requirements}`
      : "Hi Akas! I saw your portfolio and would like to discuss a website project for my business.";

    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleFocusForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const socialChannels = [
    {
      label: 'EMAIL',
      value: data.email,
      href: `mailto:${data.email}`,
      highlight: false,
    },
    {
      label: 'WHATSAPP',
      value: data.whatsappDisplay || '+91 93604 84615',
      href: `https://wa.me/${(data.whatsapp || '919360484615').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
        "Hi Akas! I'd like to talk about a website project for my business."
      )}`,
      highlight: true,
    },
    {
      label: 'INSTAGRAM',
      value: data.instagram.replace(/^https?:\/\//, ''),
      href: data.instagram,
      highlight: false,
    },
    {
      label: 'LINKEDIN',
      value: data.linkedin.replace(/^https?:\/\//, ''),
      href: data.linkedin,
      highlight: false,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 py-28 md:py-40 bg-[var(--bg-section)] border-t border-[var(--border-subtle)] overflow-hidden transition-colors duration-300"
    >
      {/* Subtle ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full bg-[var(--accent-blue)]/[0.05] blur-[160px]"
      />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        {/* Final CTA Banner (Section 8) */}
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto contact-reveal">
          <p className="text-xs font-mono-num tracking-[0.24em] text-[var(--accent-blue-text)] uppercase mb-4">
            07 · START YOUR PROJECT
          </p>
          <h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.02] mb-6"
            style={{ textWrap: 'balance' }}
          >
            {data.heading}
          </h2>
          <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto mb-8">
            {data.description}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton variant="primary" onClick={handleFocusForm}>
              <Sparkles className="w-4 h-4" />
              <span>{data.ctaLabel}</span>
            </MagneticButton>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-medium tracking-[0.16em] uppercase rounded-full bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>CHAT ON WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* Two-Column Inquiry Layout: Functional Form on Left, Contact Directory & WhatsApp on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Functional Project Inquiry Form */}
          <div className="lg:col-span-7 contact-reveal">
            <form
              ref={formRef}
              onSubmit={handleFormSubmit}
              noValidate
              className="p-7 sm:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] space-y-6 shadow-[var(--card-shadow)] relative transition-colors duration-300"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-5">
                <div>
                  <span className="text-xs font-mono-num tracking-[0.2em] text-[var(--accent-blue-text)] uppercase block mb-1">
                    PROJECT INQUIRY FORM
                  </span>
                  <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                    Tell me about your business goals
                  </h3>
                </div>
                <span className="text-xs font-mono-num text-[var(--text-secondary)] hidden sm:block">
                  Direct Response
                </span>
              </div>

              {/* Row 1: Full Name & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono-num text-[var(--text-secondary)] uppercase mb-2">
                    FULL NAME <span className="text-[var(--accent-blue)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formState.fullName}
                    onChange={(e) => {
                      setFormState({ ...formState, fullName: e.target.value });
                      if (formErrors.fullName) {
                        setFormErrors({ ...formErrors, fullName: '' });
                      }
                    }}
                    placeholder="Sarah Jenkins"
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border text-[var(--text-primary)] text-sm focus:outline-none transition-colors ${
                      formErrors.fullName
                        ? 'border-red-500/80 focus:border-red-400'
                        : 'border-[var(--border-medium)] focus:border-[var(--accent-blue)]'
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono-num text-[var(--text-secondary)] uppercase mb-2">
                    BUSINESS NAME <span className="text-[var(--accent-blue)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formState.businessName}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        businessName: e.target.value,
                      });
                      if (formErrors.businessName) {
                        setFormErrors({ ...formErrors, businessName: '' });
                      }
                    }}
                    placeholder="Verdant Studio / Lumina SaaS"
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border text-[var(--text-primary)] text-sm focus:outline-none transition-colors ${
                      formErrors.businessName
                        ? 'border-red-500/80 focus:border-red-400'
                        : 'border-[var(--border-medium)] focus:border-[var(--accent-blue)]'
                    }`}
                  />
                  {formErrors.businessName && (
                    <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.businessName}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Website Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono-num text-[var(--text-secondary)] uppercase mb-2">
                    EMAIL ADDRESS <span className="text-[var(--accent-blue)]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => {
                      setFormState({ ...formState, email: e.target.value });
                      if (formErrors.email) {
                        setFormErrors({ ...formErrors, email: '' });
                      }
                    }}
                    placeholder="sarah@company.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border text-[var(--text-primary)] text-sm focus:outline-none transition-colors ${
                      formErrors.email
                        ? 'border-red-500/80 focus:border-red-400'
                        : 'border-[var(--border-medium)] focus:border-[var(--accent-blue)]'
                    }`}
                  />
                  {formErrors.email && (
                    <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono-num text-[var(--text-secondary)] uppercase mb-2">
                    TYPE OF WEBSITE
                  </label>
                  <select
                    value={formState.websiteType}
                    onChange={(e) =>
                      setFormState({ ...formState, websiteType: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-medium)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-blue)] cursor-pointer"
                  >
                    <option value="Business Website">Business Website (Brand &amp; Services)</option>
                    <option value="Startup Landing Page">Startup Landing Page (Waitlist &amp; Launch)</option>
                    <option value="E-commerce Website">E-commerce Website (Storefront)</option>
                    <option value="Portfolio Website">Portfolio Website (Personal &amp; Executive)</option>
                    <option value="Custom Web Experience">Custom Web Application / 3D Experience</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Estimated Budget & Expected Launch Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono-num text-[var(--text-secondary)] uppercase mb-2">
                    ESTIMATED BUDGET
                  </label>
                  <select
                    value={formState.estimatedBudget}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        estimatedBudget: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-medium)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-blue)] cursor-pointer"
                  >
                    <option value="Under ₹10,000 (Sprint / Starter)">Under ₹10,000 (Sprint / Starter)</option>
                    <option value="₹10,000 – ₹25,000 (Core Business)">₹10,000 – ₹25,000 (Core Business)</option>
                    <option value="₹25,000 – ₹50,000 (Startup / E-Commerce)">₹25,000 – ₹50,000 (Startup / E-Commerce)</option>
                    <option value="₹50,000 – ₹1,00,000 (Advanced Website)">₹50,000 – ₹1,00,000 (Advanced Website)</option>
                    <option value="₹1,00,000+ (Full Custom Architecture)">₹1,00,000+ (Full Custom Architecture)</option>
                    <option value="Flexible / To Be Discussed">Flexible / To Be Discussed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono-num text-[var(--text-secondary)] uppercase mb-2">
                    EXPECTED LAUNCH DATE
                  </label>
                  <select
                    value={formState.launchDate}
                    onChange={(e) =>
                      setFormState({ ...formState, launchDate: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-medium)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-blue)] cursor-pointer"
                  >
                    <option value="Immediate (1–2 weeks)">Immediate (1–2 weeks)</option>
                    <option value="Within 1 month">Within 1 month</option>
                    <option value="2–3 months">2–3 months</option>
                    <option value="Flexible / Planning Ahead">Flexible / Planning Ahead</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Project Requirements */}
              <div>
                <label className="block text-xs font-mono-num text-[var(--text-secondary)] uppercase mb-2">
                  PROJECT REQUIREMENTS &amp; GOALS <span className="text-[var(--accent-blue)]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={formState.requirements}
                  onChange={(e) => {
                    setFormState({ ...formState, requirements: e.target.value });
                    if (formErrors.requirements) {
                      setFormErrors({ ...formErrors, requirements: '' });
                    }
                  }}
                  placeholder="Tell me about your product or business, what pages or features you need, any reference websites you admire, and your main conversion goals..."
                  className={`w-full px-4 py-3 rounded-xl bg-[var(--bg-input)] border text-[var(--text-primary)] text-sm focus:outline-none transition-colors ${
                    formErrors.requirements
                      ? 'border-red-500/80 focus:border-red-400'
                      : 'border-[var(--border-medium)] focus:border-[var(--accent-blue)]'
                  }`}
                />
                {formErrors.requirements && (
                  <span className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {formErrors.requirements}
                  </span>
                )}
              </div>

              {/* Submission Confirmation Box */}
              {submitted && (
                <div className="p-4 rounded-xl bg-[var(--accent-blue-subtle)] border border-[var(--accent-blue-border)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono-num text-[var(--accent-blue-text)]">
                    <Check className="w-4 h-4" />
                    <span>INQUIRY PREPARED FOR DIRECT DISPATCH</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Your inquiry brief is pre-formatted. We opened your system email client so you can review and send it directly to <strong className="text-[var(--text-primary)]">{data.email}</strong>. You can also send this inquiry instantly via WhatsApp!
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="px-3.5 py-1.5 rounded-lg bg-[#25D366] text-black text-xs font-semibold flex items-center gap-1.5 hover:bg-[#20ba5a] transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send via WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await navigator.clipboard.writeText(generatedBrief);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-medium)] text-[var(--text-primary)] text-xs font-medium flex items-center gap-1.5 hover:border-[var(--accent-blue)] transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copied Brief' : 'Copy Brief Text'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[var(--border-subtle)]">
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                  <span>Typically responds within 24 hours</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-medium tracking-[0.16em] uppercase bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] rounded-full hover:bg-[var(--accent-blue)] hover:text-white dark:hover:text-black transition-all cursor-pointer font-display"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SUBMIT INQUIRY</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Direct Channels, WhatsApp & Contact Info */}
          <div className="lg:col-span-5 space-y-6 contact-reveal">
            {/* WhatsApp Feature Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#121A16] to-[#101010] border border-[#25D366]/30 relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono-num tracking-[0.2em] text-[#25D366] uppercase">
                  FASTEST RESPONSE
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] text-[10px] font-mono-num font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  AVAILABLE
                </span>
              </div>

              <h4 className="font-display text-2xl font-bold text-white mb-2">
                Prefer WhatsApp?
              </h4>
              <p className="text-sm text-[#A1A1AA] leading-relaxed mb-6">
                Connect directly on WhatsApp to discuss project requirements, timelines, budget estimates, or ask quick questions.
              </p>

              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="w-full py-3.5 px-6 rounded-xl bg-[#25D366] text-black font-semibold text-xs tracking-[0.14em] uppercase flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CHAT ON WHATSAPP ({data.whatsappDisplay || '+91 93604 84615'})</span>
              </button>
            </div>

            {/* Direct Channels Directory */}
            <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-medium)] shadow-[var(--card-shadow)] transition-colors duration-300">
              <span className="block text-xs font-mono-num tracking-[0.2em] text-[var(--accent-blue-text)] uppercase mb-6">
                DIRECT CHANNELS &amp; SOCIAL
              </span>

              <div className="divide-y divide-[var(--border-subtle)]">
                {socialChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.label === 'EMAIL' ? undefined : '_blank'}
                    rel={
                      channel.label === 'EMAIL'
                        ? undefined
                        : 'noopener noreferrer'
                    }
                    className="group py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="block text-[11px] font-mono-num tracking-[0.16em] text-[var(--text-secondary)] mb-0.5">
                        {channel.label}
                      </span>
                      <span
                        className={`font-display text-base font-medium transition-colors break-all ${
                          channel.highlight
                            ? 'text-[#25D366] group-hover:text-[#25D366]'
                            : 'text-[var(--text-primary)] group-hover:text-[var(--accent-blue)]'
                        }`}
                      >
                        {channel.value}
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-full border border-[var(--border-medium)] flex items-center justify-center text-[var(--text-secondary)] group-hover:border-[var(--accent-blue)] group-hover:text-[var(--accent-blue)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                ))}
              </div>

              {/* Copy Email Button */}
              <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-xs text-[var(--text-secondary)]">
                  {data.location}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-blue-text)] hover:underline cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
