import React, { useState } from 'react';
import { X, Star, Bookmark, ShoppingBag, Check, Shield, MapPin, Feather } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('02 / Medium');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const sizes = ['01 / Small', '02 / Medium', '03 / Large'];

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id="product-detail-modal">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2 animate-in zoom-in-95 duration-200 max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-neutral-600 hover:text-black flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Product Image */}
        <div className="relative bg-neutral-100 min-h-[320px] md:min-h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
              {product.badges.map((b) => (
                <span
                  key={b}
                  className="bg-neutral-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase Actions */}
        <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-5">
          
          <div className="space-y-4">
            {/* Brand & Rating */}
            <div className="flex items-center justify-between text-xs text-neutral-500">
              <span className="font-semibold uppercase tracking-wider text-neutral-700">
                {product.brand}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-neutral-800">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight leading-snug">
              {product.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-extrabold text-neutral-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-neutral-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            {/* Provenance & Craftsmanship note */}
            <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200/60 space-y-2 text-xs">
              <div className="flex items-start gap-2 text-neutral-700">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-neutral-900 font-semibold">Provenance:</strong> {product.provenance}
                </span>
              </div>
              {product.materials && (
                <div className="flex items-start gap-2 text-neutral-700">
                  <Feather className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral-900 font-semibold">Composition:</strong> {product.materials}
                  </span>
                </div>
              )}
            </div>

            {/* Size selector if wardrobe / outerwear */}
            {(product.category === 'Outerwear' || product.category === 'Wardrobe') && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-neutral-800">
                  Select Size (Archival Standard)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-neutral-150 flex items-center gap-3">
            <button
              id="modal-add-to-bag-btn"
              onClick={handleAdd}
              className="flex-1 bg-neutral-950 hover:bg-black text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Added to Archival Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${product.price}</span>
                </>
              )}
            </button>

            <button
              id="modal-toggle-wishlist-btn"
              onClick={() => onToggleWishlist(product)}
              className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border-neutral-200'
              }`}
              title={isWishlisted ? 'Remove from Saved' : 'Save Piece'}
            >
              <Bookmark className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
