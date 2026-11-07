import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RotateCcw, Check, Upload } from 'lucide-react';
import { PortfolioData } from '../config/portfolioData';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
}) => {
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<'hero' | 'contact' | 'services'>(
    'hero'
  );

  React.useEffect(() => {
    setDraft(data);
  }, [data, isOpen]);

  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setDraft({
        ...draft,
        hero: {
          ...draft.hero,
          portraitWebpUrl: url,
          portraitVideoMp4Url: url,
          portraitVideoWebmUrl: url,
        },
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(draft);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl bg-[var(--bg-surface-elevated)] border border-[var(--border-medium)] p-6 sm:p-8 max-h-[88vh] overflow-y-auto shadow-2xl transition-colors duration-300"
          >
            <div className="flex items-center justify-between pb-5 border-b border-[var(--border-subtle)] mb-6">
              <div>
                <span className="text-xs font-mono-num tracking-[0.18em] text-[var(--accent-blue-text)] uppercase block mb-1">
                  STUDIO CONFIGURATION
                </span>
                <h3 className="font-display text-xl font-bold text-[var(--text-primary)]">
                  Customize Creative Developer Portfolio
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg border border-[var(--border-medium)] hover:border-[var(--accent-blue)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section Selector Tabs */}
            <div className="flex items-center gap-2 mb-6 p-1 bg-[var(--bg-card-subtle)] rounded-xl border border-[var(--border-subtle)]">
              {(['hero', 'contact', 'services'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-xs font-medium tracking-[0.14em] uppercase rounded-lg transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[var(--bg-button-primary)] text-[var(--text-button-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {tab === 'hero'
                    ? 'HERO & PORTRAIT'
                    : tab === 'contact'
                    ? 'SOCIAL & CONTACT'
                    : 'SERVICES'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {activeTab === 'hero' && (
                <>
                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      PORTRAIT VIDEO ASSET (MP4 / WEBM)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={draft.hero.portraitVideoMp4Url || ''}
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            hero: {
                              ...draft.hero,
                              portraitVideoMp4Url: e.target.value,
                            },
                          })
                        }
                        className="flex-1 px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-xs font-mono-num focus:outline-none focus:border-[#B8C9FF]"
                      />
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-[0.12em] uppercase bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors cursor-pointer shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>UPLOAD VIDEO</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm"
                          onChange={handlePortraitUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      SMALL LABEL
                    </label>
                    <input
                      type="text"
                      value={draft.hero.label}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, label: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      MAIN HEADING
                    </label>
                    <input
                      type="text"
                      value={draft.hero.heading}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, heading: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      SECONDARY HEADING
                    </label>
                    <input
                      type="text"
                      value={draft.hero.subtitle}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      HERO DESCRIPTION
                    </label>
                    <textarea
                      rows={2}
                      value={draft.hero.description}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, description: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>
                </>
              )}

              {activeTab === 'contact' && (
                <>
                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      value={draft.contact.email}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: { ...draft.contact, email: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      WHATSAPP NUMBER (WITH COUNTRY CODE)
                    </label>
                    <input
                      type="text"
                      value={draft.contact.whatsapp || ''}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: {
                            ...draft.contact,
                            whatsapp: e.target.value,
                            whatsappDisplay: e.target.value,
                          },
                        })
                      }
                      placeholder="+919360484615"
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      INSTAGRAM URL
                    </label>
                    <input
                      type="url"
                      value={draft.contact.instagram}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: {
                            ...draft.contact,
                            instagram: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-num text-[#A1A1AA] uppercase mb-2">
                      LINKEDIN URL
                    </label>
                    <input
                      type="url"
                      value={draft.contact.linkedin}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          contact: {
                            ...draft.contact,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-lg bg-black border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8C9FF]"
                    />
                  </div>
                </>
              )}

              {activeTab === 'services' && (
                <div className="space-y-4">
                  {draft.services.map((service, idx) => (
                    <div
                      key={service.id}
                      className="p-4 rounded-xl bg-black border border-white/10 space-y-2.5"
                    >
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const updated = [...draft.services];
                          updated[idx] = { ...service, title: e.target.value };
                          setDraft({ ...draft, services: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#101010] border border-white/12 text-white text-xs font-medium"
                      />
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => {
                          const updated = [...draft.services];
                          updated[idx] = {
                            ...service,
                            description: e.target.value,
                          };
                          setDraft({ ...draft, services: updated });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-[#101010] border border-white/12 text-[#A1A1AA] text-xs"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-5 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    onClose();
                  }}
                  className="inline-flex items-center gap-2 text-xs font-mono-num text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET DEFAULTS</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-medium tracking-[0.14em] uppercase bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] rounded-full hover:bg-[var(--accent-blue)] hover:text-white dark:hover:text-black transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>APPLY CHANGES</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
