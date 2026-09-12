import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Departments } from './components/Departments';
import { DisciplinedCraft } from './components/DisciplinedCraft';
import { ArtisanResidency } from './components/ArtisanResidency';
import { BestSellers } from './components/BestSellers';
import { Guarantees } from './components/Guarantees';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { MakersModal } from './components/MakersModal';
import { HelpModal } from './components/HelpModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderStatusModal } from './components/OrderStatusModal';
import {
  DISCIPLINED_CRAFT_PRODUCTS,
  BEST_SELLER_PRODUCTS,
  ALL_PRODUCTS,
} from './data/mockData';
import { Product, CartItem, Department, CategoryFilter } from './types';
import { Check, Heart } from 'lucide-react';

export default function App() {
  // Initial cart configured to match Image 4: 2 items, total $290.00
  // ($195 Lamp + $95 Cashmere Knit Beanie = $290.00)
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: DISCIPLINED_CRAFT_PRODUCTS[3], // Sculptural Brass Desk Lamp ($195)
      quantity: 1,
    },
    {
      product: BEST_SELLER_PRODUCTS[3], // Recycled Cashmere Knit Beanie ($95)
      quantity: 1,
      selectedSize: 'One Size',
    },
  ]);

  // Initial wishlist configured to match Image 4: badge "3"
  const [wishlist, setWishlist] = useState<Product[]>([
    DISCIPLINED_CRAFT_PRODUCTS[0], // Minimalist Wool Trench Coat
    DISCIPLINED_CRAFT_PRODUCTS[1], // Hand-Thrown Stoneware Vase
    DISCIPLINED_CRAFT_PRODUCTS[2], // Italian Nappa Leather Tote
  ]);

  // Modal / Drawer visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMakersModalOpen, setIsMakersModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderStatusModalOpen, setIsOrderStatusModalOpen] = useState(false);
  const [trackedOrderNumber, setTrackedOrderNumber] = useState('ATL-882419');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Active navigation & filters
  const [activeNav, setActiveNav] = useState('New Arrivals');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All Objects');

  // Quick toast message feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size }];
    });
    showToast(`Added "${product.name}" to archival bag.`);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed from saved pieces.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist.`);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  // Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Navigation handlers
  const handleSelectNav = (target: string) => {
    if (target === 'all') {
      setActiveNav('New Arrivals');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'Wardrobe' || target === 'Home') {
      setActiveNav(target === 'Wardrobe' ? 'Apparel' : 'Living & Objects');
      setCategoryFilter(target as CategoryFilter);
      const element = document.getElementById('best-sellers-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else if (target === 'editorial') {
      setActiveNav('Editorial / Stories');
      setIsMakersModalOpen(true);
    } else if (target === 'brands') {
      setActiveNav('Curated Brands');
      const element = document.getElementById('curated-departments-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDepartment = (dept: Department | string) => {
    const deptName = typeof dept === 'string' ? dept : dept.name;
    if (deptName.includes('Outerwear') || deptName.includes('Footwear') || deptName.includes('Apparel')) {
      setCategoryFilter('Wardrobe');
    } else {
      setCategoryFilter('Home');
    }
    const element = document.getElementById('best-sellers-section');
    element?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Filtering for department: ${deptName}`);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white relative">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar onOpenHelp={() => setIsHelpModalOpen(true)} />

      {/* 2. Main Navigation Header */}
      <Header
        cartCount={cartItemCount}
        cartTotal={cartTotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectNav}
        onOpenOrderStatus={() => setIsOrderStatusModalOpen(true)}
        activeNav={activeNav}
      />

      {/* Main Content Sections */}
      <main>
        {/* 3. Hero Section with Interactive Hotspots & Archival Copenhagen Session */}
        <Hero
          onExploreClick={() => scrollToSection('disciplined-craft-section')}
          onReadStoryClick={() => setIsMakersModalOpen(true)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Curated Departments (Architectural Taxonomy) */}
        <Departments
          onSelectDepartment={handleSelectDepartment}
          onExploreAll={() => scrollToSection('disciplined-craft-section')}
        />

        {/* 5. Disciplined Craft (4 Curated Pieces) */}
        <DisciplinedCraft
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist.map((p) => p.id)}
        />

        {/* 6. The Artisan Residency Series Feature Banner */}
        <ArtisanResidency onMeetMakers={() => setIsMakersModalOpen(true)} />

        {/* 7. Best Sellers (Archival Favorites with '+' buttons & filter tabs) */}
        <BestSellers
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          selectedCategoryFilter={categoryFilter}
          onFilterChange={setCategoryFilter}
        />

        {/* 8. Trust Guarantees Bar (4 Perks) */}
        <Guarantees onOpenConcierge={() => setIsHelpModalOpen(true)} />
      </main>

      {/* 9. Comprehensive Atelier Footer */}
      <Footer
        onNavigateSection={scrollToSection}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        onOpenOrderStatus={() => setIsOrderStatusModalOpen(true)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-950 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-neutral-800 animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutModalOpen(true);
        }}
      />

      {/* Slide-over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        products={wishlist}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.some((p) => p.id === selectedProduct.id) : false}
      />

      {/* Search / Command Modal (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSelectDepartment={handleSelectDepartment}
      />

      {/* Meet the Makers Editorial Story Modal */}
      <MakersModal
        isOpen={isMakersModalOpen}
        onClose={() => setIsMakersModalOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Concierge & Customer Care Modal */}
      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onOpenOrderStatus={() => setIsOrderStatusModalOpen(true)}
      />

      {/* Order Checkout Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        items={cart}
        total={cartTotal}
        onSuccess={(generatedOrder) => {
          setCart([]);
          setTrackedOrderNumber(generatedOrder);
        }}
        onTrackOrder={(generatedOrder) => {
          setTrackedOrderNumber(generatedOrder);
          setIsOrderStatusModalOpen(true);
        }}
      />

      {/* Order Status & Route Telemetry Tracking Modal */}
      <OrderStatusModal
        isOpen={isOrderStatusModalOpen}
        onClose={() => setIsOrderStatusModalOpen(false)}
        initialOrderNumber={trackedOrderNumber}
      />

    </div>
  );
}
