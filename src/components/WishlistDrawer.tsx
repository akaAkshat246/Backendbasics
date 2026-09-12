import React from 'react';
import { X, Bookmark, Plus, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onRemoveFromWishlist,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="atelier-wishlist-drawer">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4.5 h-4.5 text-neutral-900 fill-neutral-900" />
            <h3 className="text-base font-bold text-neutral-900 tracking-tight">
              Saved Pieces
            </h3>
            <span className="text-xs bg-neutral-100 text-neutral-700 font-mono font-bold px-2 py-0.5 rounded-full">
              {products.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {products.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-neutral-500 text-sm">You haven’t saved any pieces yet.</p>
              <button
                onClick={onClose}
                className="text-xs font-semibold text-neutral-900 underline underline-offset-4 hover:text-blue-600 cursor-pointer"
              >
                Browse disciplined craft
              </button>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex gap-4 pb-4 border-b border-neutral-150 last:border-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover rounded-lg bg-neutral-100 shrink-0 border border-neutral-200/60"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider">
                          {product.brand}
                        </p>
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                          {product.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-mono font-semibold text-neutral-900 mt-1">
                      ${product.price}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onRemoveFromWishlist(product.id);
                    }}
                    className="self-start inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Move to Bag</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
