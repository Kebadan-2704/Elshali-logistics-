'use client';

import { useEffect, useRef, useCallback } from 'react';
import { Truck, X } from 'lucide-react';
import { useQuote } from './QuoteProvider';
import QuoteForm from './forms/QuoteForm';
import { siteConfig } from '@/data/site';

export default function QuoteModal() {
  const { isOpen, preselectedVehicle, closeQuote } = useQuote();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    closeQuote();
  }, [closeQuote]);

  // Track trigger element
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Focus trap + ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Return focus on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      data-lenis-prevent="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="modal-panel" data-lenis-prevent="true" ref={panelRef}>
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-icon">
            <Truck size={20} />
          </div>
          <div className="modal-header-text">
            <h2 id="quote-modal-title">Request Freight Rate Quote</h2>
            <p>{siteConfig.name} Pan-India Commercial Freight Solutions</p>
          </div>
          <button
            className="modal-close"
            onClick={handleClose}
            ref={closeRef}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <QuoteForm
            preselectedVehicle={preselectedVehicle}
            variant="modal"
          />
        </div>
      </div>
    </div>
  );
}
