import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Star } from 'lucide-react';
import { ALL_PRODUCTS, DEPARTMENTS } from '../data/mockData';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectDepartment: (deptName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectDepartment,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Esc and ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PRODUCTS.slice(0, 4);

  const matchedDepartments = query.trim()
    ? DEPARTMENTS.filter((d) =>
        d.name.toLowerCase().includes(query.toLowerCase())
      )
    : DEPARTMENTS.slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4" id="search-modal">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-neutral-200 animate-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search archival apparel, living objects, ceramics, artisans..."
            autoFocus
            className="flex-1 text-sm bg-transparent border-none text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-black rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          
          {/* Matched Departments */}
          {matchedDepartments.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 px-2">
                Departments
              </p>
              <div className="flex flex-wrap gap-2">
                {matchedDepartments.map((dept) => (
                  <button
                    key={dept.id}
                    onClick={() => {
                      onSelectDepartment(dept.name);
                      onClose();
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors cursor-pointer"
                  >
                    <span>{dept.name}</span>
                    <span className="text-neutral-400 text-[10px]">({dept.itemCount})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Products */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 px-2">
              {query.trim() ? `Pieces (${filteredProducts.length})` : 'Curated Suggestions'}
            </p>
            {filteredProducts.length === 0 ? (
              <p className="text-xs text-neutral-500 py-6 text-center">
                No archival records matching "{query}".
              </p>
            ) : (
              <div className="divide-y divide-neutral-100">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectProduct(p);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-11 h-11 object-cover rounded-lg bg-neutral-100 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                          {p.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500">
                          <span>{p.brand}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {p.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-neutral-900">
                        ${p.price}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-black transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
