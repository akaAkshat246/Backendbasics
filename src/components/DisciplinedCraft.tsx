import React from 'react';
import { Bookmark, Star, Plus } from 'lucide-react';
import { DISCIPLINED_CRAFT_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface DisciplinedCraftProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
}

export const DisciplinedCraft: React.FC<DisciplinedCraftProps> = ({
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
}) => {
  return (
    <section id="disciplined-craft-section" className="py-12 border-t border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase font-sans">
                CURATED SELECTION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Disciplined Craft
            </h2>
          </div>

          <p className="text-xs text-neutral-500 font-medium">
            Archival releases with provenance tracking
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DISCIPLINED_CRAFT_PRODUCTS.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="group flex flex-col bg-white rounded-2xl p-2.5 border border-neutral-200/70 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container with Badges & Wishlist */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 mb-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full object-cover object-center cursor-pointer transform transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badges in top-left */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 pointer-events-none">
                    {product.badges?.map((badge) => {
                      const isSale = badge.includes('%');
                      const isEco = badge.includes('Eco');
                      const isLimited = badge.includes('Limited');

                      return (
                        <span
                          key={badge}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${
                            isSale
                              ? 'bg-neutral-900 text-white'
                              : isEco
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isLimited
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : 'bg-white/95 text-neutral-900'
                          }`}
                        >
                          {badge}
                        </span>
                      );
                    })}
                  </div>

                  {/* Wishlist Button in top-right */}
                  <button
                    id={`wishlist-toggle-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xs ${
                      isWishlisted
                        ? 'bg-neutral-900 text-white'
                        : 'bg-white/90 backdrop-blur-md text-neutral-700 hover:bg-white hover:text-black hover:scale-105'
                    }`}
                    aria-label="Save piece"
                  >
                    <Bookmark className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                  </button>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="flex-1 bg-white/95 backdrop-blur-md hover:bg-white text-neutral-900 text-xs font-semibold py-2 rounded-lg shadow-md transition-colors cursor-pointer text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="bg-neutral-900 hover:bg-black text-white p-2 rounded-lg shadow-md transition-colors cursor-pointer"
                      title="Quick add to bag"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="flex-1 flex flex-col justify-between px-1">
                  <div>
                    {/* Brand & Rating */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                      <span className="font-medium text-neutral-700">{product.brand}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-neutral-800 text-[11px]">{product.rating}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-sm font-bold text-neutral-900 line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer tracking-tight"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mt-2.5 flex items-baseline gap-2">
                    <span className="text-base font-extrabold text-neutral-900 tracking-tight">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through font-normal">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
