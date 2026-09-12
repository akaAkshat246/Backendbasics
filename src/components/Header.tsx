import React, { useState } from 'react';
import { AtelierLogo } from './AtelierLogo';
import { Search, Bookmark, ShoppingBag, ChevronDown, Menu, X, User, Package, Heart, LogOut } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onSelectCategory: (category: string) => void;
  onOpenOrderStatus?: () => void;
  activeNav?: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onSelectCategory,
  onOpenOrderStatus,
  activeNav = 'New Arrivals',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { label: 'New Arrivals', target: 'all' },
    { label: 'Apparel', target: 'Wardrobe' },
    { label: 'Living & Objects', target: 'Home' },
    { label: 'Curated Brands', target: 'brands' },
    { label: 'Editorial / Stories', target: 'editorial' },
  ];

  // High-res photo matching Image 1 (Asian woman with dark hair, blue silk blouse, warm smile)
  const avatarImage = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop';

  return (
    <header
      id="atelier-main-header"
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-150 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          id="mobile-nav-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <div onClick={() => onSelectCategory('all')}>
            <AtelierLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" id="desktop-nav-menu">
            {navLinks.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => onSelectCategory(item.target)}
                  className={`text-[13px] tracking-wide font-medium transition-colors hover:text-black cursor-pointer py-1 relative ${
                    isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-600'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-neutral-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center/Right Search Bar & Actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search Bar - styled exactly as in screenshot */}
          <button
            id="global-search-trigger-btn"
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 bg-neutral-100 hover:bg-neutral-200/80 transition-colors rounded-full px-3.5 py-1.5 text-xs text-neutral-500 w-36 sm:w-56 md:w-64 border border-transparent hover:border-neutral-200"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate text-left flex-1 font-normal text-[12px]">Search 4,000+...</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 bg-white rounded border border-neutral-200 shadow-2xs">
              ⌘K
            </kbd>
          </button>

          {/* Wishlist Icon Button with Badge "3" */}
          <button
            id="header-wishlist-btn"
            onClick={onOpenWishlist}
            className="relative p-2 text-neutral-700 hover:text-black rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Wishlist"
          >
            <Bookmark className="w-4.5 h-4.5 stroke-[1.8]" />
            {wishlistCount > 0 && (
              <span
                id="wishlist-badge-count"
                className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ring-2 ring-white"
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Icon Button with Count "2" and Cart Total "$290.00" */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="flex items-center gap-2 p-1.5 pl-2 pr-2.5 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-800"
          >
            <div className="relative">
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.8]" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1.5 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ring-2 ring-white"
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span id="header-cart-total-amount" className="text-xs font-semibold tracking-tight text-neutral-900">
              ${cartTotal.toFixed(2)}
            </span>
          </button>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <button
              id="header-user-profile-btn"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-neutral-200 transition-all cursor-pointer"
            >
              <img
                src={avatarImage}
                alt="Elena Chen"
                className="w-8 h-8 rounded-full object-cover border border-neutral-200"
                referrerPolicy="no-referrer"
              />
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 hidden sm:block" />
            </button>

            {userMenuOpen && (
              <div
                id="user-profile-dropdown"
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-4 py-2 border-b border-neutral-150">
                  <p className="text-xs font-semibold text-neutral-900">Elena Chen</p>
                  <p className="text-[11px] text-neutral-500 truncate">elena.c@atelier-collector.com</p>
                  <span className="inline-block mt-1 text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full font-medium">
                    Archival Collector Tier
                  </span>
                </div>
                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-neutral-700 hover:bg-neutral-50 text-left"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Saved Pieces ({wishlistCount})</span>
                  </button>
                  <button
                    id="header-profile-orders-btn"
                    onClick={() => {
                      if (onOpenOrderStatus) {
                        onOpenOrderStatus();
                      } else {
                        onOpenCart();
                      }
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-neutral-700 hover:bg-neutral-50 text-left cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Active Orders &amp; Provenance</span>
                  </button>
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-neutral-700 hover:bg-neutral-50 text-left"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Curation Preferences</span>
                  </button>
                </div>
                <div className="border-t border-neutral-150 pt-1">
                  <button
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-neutral-500 hover:text-red-600 hover:bg-neutral-50 text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onSelectCategory(item.target);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-neutral-800 border-b border-neutral-100"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex justify-between items-center text-xs text-neutral-500">
            <span>Archival Edition Nº 24</span>
            <span>Worldwide Express Shipping</span>
          </div>
        </div>
      )}
    </header>
  );
};
