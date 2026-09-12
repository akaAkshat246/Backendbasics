import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { BEST_SELLER_PRODUCTS } from '../data/mockData';
import { Product, CategoryFilter } from '../types';

interface BestSellersProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedCategoryFilter?: CategoryFilter;
  onFilterChange?: (category: CategoryFilter) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  onSelectProduct,
  onAddToCart,
  selectedCategoryFilter,
  onFilterChange,
}) => {
  const [internalFilter, setInternalFilter] = useState<CategoryFilter>('All Objects');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const activeFilter = selectedCategoryFilter || internalFilter;
  const setFilter = onFilterChange || setInternalFilter;

  const categories: CategoryFilter[] = ['All Objects', 'Wardrobe', 'Home', 'Gifts'];

  const filteredProducts = BEST_SELLER_PRODUCTS.filter((product) => {
    if (activeFilter === 'All Objects') return true;
    return product.category === activeFilter;
  });

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  return (
    <section id="best-sellers-section" className="py-12 border-t border-neutral-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-blue-600 uppercase font-sans">
              ARCHIVAL FAVORITES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 mt-1">
              Best Sellers
            </h2>
          </div>

          {/* Segmented Filter Pills */}
          <div className="inline-flex bg-neutral-100 p-1 rounded-lg self-start sm:self-auto border border-neutral-200/50">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-tab-${cat.toLowerCase().replace(' ', '-')}`}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;

            return (
              <div
                key={product.id}
                id={`bestseller-card-${product.id}`}
                className="group flex flex-col bg-white rounded-2xl p-2.5 border border-neutral-200/70 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container with Floating '+' Quick Add Button */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-100 mb-3.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full object-cover object-center cursor-pointer transform transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Circular '+' Quick Add button on bottom-right of image (exact match to screenshot) */}
                  <button
                    id={`quick-add-btn-${product.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(product);
                    }}
                    className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white scale-110'
                        : 'bg-white/95 backdrop-blur-md text-neutral-900 hover:bg-neutral-900 hover:text-white hover:scale-110 active:scale-95'
                    }`}
                    title={isAdded ? 'Added to Bag' : 'Add to Bag'}
                    aria-label={`Add ${product.name} to bag`}
                  >
                    {isAdded ? (
                      <Check className="w-4 h-4 text-white animate-in zoom-in" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Metadata */}
                <div className="flex-1 flex flex-col justify-between px-1">
                  <div>
                    <span className="text-xs text-neutral-400 font-medium">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-sm font-bold text-neutral-900 truncate hover:text-blue-600 transition-colors cursor-pointer tracking-tight mt-0.5"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="mt-2.5">
                    <span className="text-base font-extrabold text-neutral-900 tracking-tight">
                      ${product.price}
                    </span>
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
