'use client';

import { useQuote } from './QuoteProvider';
import { ArrowRight } from 'lucide-react';

export default function QuoteButton() {
  const { openQuote } = useQuote();

  return (
    <button
      type="button"
      className="btn-primary-pill"
      onClick={() => openQuote()}
    >
      GET A QUOTE
      <span className="arrow-badge" aria-hidden="true">
        <ArrowRight size={16} />
      </span>
    </button>
  );
}

