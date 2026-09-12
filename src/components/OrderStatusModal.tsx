import React, { useState } from 'react';
import {
  X,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Leaf,
  ExternalLink,
  RotateCw,
  AlertCircle,
} from 'lucide-react';

interface OrderStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
}

interface TrackingMilestone {
  title: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
}

interface OrderRecord {
  orderNumber: string;
  recipient: string;
  destination: string;
  courier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  statusLabel: string;
  progressPercent: number;
  items: {
    name: string;
    brand: string;
    price: number;
    image: string;
    quantity: number;
  }[];
  carbonOffsetKg: number;
  milestones: TrackingMilestone[];
}

const PRESET_ORDERS: Record<string, OrderRecord> = {
  'ATL-882419': {
    orderNumber: 'ATL-882419',
    recipient: 'Elena Chen',
    destination: 'New York, NY 10013, United States',
    courier: 'Atelier Climate Express • DHL Carbon Neutral',
    trackingNumber: 'ATL-EXP-99201482-US',
    estimatedDelivery: 'Tomorrow by 14:00 EST',
    statusLabel: 'In Transit • Customs Cleared',
    progressPercent: 68,
    carbonOffsetKg: 3.4,
    items: [
      {
        name: 'Sculptural Brass Desk Lamp',
        brand: 'Lumos Atelier',
        price: 195,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
      },
      {
        name: 'Recycled Cashmere Knit Beanie',
        brand: 'Kōbō Woolens',
        price: 95,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=600&auto=format&fit=crop',
      },
    ],
    milestones: [
      {
        title: 'Archival Inspection & Provenance Certified',
        location: 'Copenhagen Studio Archive',
        timestamp: 'Sep 10, 09:30 CET',
        status: 'completed',
        description: 'Numbered edition verified, dust-bagged in untreated organic linen, and wax-sealed.',
      },
      {
        title: 'Dispatched via Renewable Aviation Freight',
        location: 'CPH International Hub',
        timestamp: 'Sep 10, 21:15 CET',
        status: 'completed',
        description: 'En route with 100% certified Sustainable Aviation Fuel (SAF) allocation.',
      },
      {
        title: 'Arrived at Regional Sort Facility & Cleared',
        location: 'JFK Hub, New York',
        timestamp: 'Sep 11, 06:40 EST',
        status: 'current',
        description: 'Import clearance finalized. Prepared for zero-emission electric courier transfer.',
      },
      {
        title: 'Out for Local Courier Delivery',
        location: 'Manhattan South Depot',
        timestamp: 'Expected Sep 12, 09:00 EST',
        status: 'upcoming',
        description: 'Direct doorstep handover with physical signature verification.',
      },
      {
        title: 'Delivered & Provenance Confirmed',
        location: '428 Broome Street, New York',
        timestamp: 'Expected Sep 12, 14:00 EST',
        status: 'upcoming',
        description: 'Physical archival certificate sealed within client provenance archive.',
      },
    ],
  },
  'ATL-390114': {
    orderNumber: 'ATL-390114',
    recipient: 'Elena Chen',
    destination: 'New York, NY 10013, United States',
    courier: 'Atelier Direct Courier',
    trackingNumber: 'ATL-DIR-4412093-NYC',
    estimatedDelivery: 'Today by 17:30 EST',
    statusLabel: 'Out for Courier Delivery',
    progressPercent: 88,
    carbonOffsetKg: 2.1,
    items: [
      {
        name: 'Hand-Thrown Stoneware Vase',
        brand: 'Studio Mino',
        price: 85,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=600&auto=format&fit=crop',
      },
    ],
    milestones: [
      {
        title: 'Archival Inspection & Provenance Certified',
        location: 'Kyoto Residency Atelier',
        timestamp: 'Sep 08, 11:00 JST',
        status: 'completed',
        description: 'Kiln batch inspection completed and signed by Kenji Sato.',
      },
      {
        title: 'International Express Transferred',
        location: 'JFK Hub, New York',
        timestamp: 'Sep 10, 18:20 EST',
        status: 'completed',
        description: 'Customs cleared and scanned into regional transit center.',
      },
      {
        title: 'Loaded onto Electric Courier Van',
        location: 'Lower Manhattan Dispatch',
        timestamp: 'Today, 08:15 EST',
        status: 'current',
        description: 'Courier en route to Broome Street. Signature required upon arrival.',
      },
      {
        title: 'Delivered & Handed Over',
        location: '428 Broome Street, New York',
        timestamp: 'Estimated Today, 17:30 EST',
        status: 'upcoming',
        description: 'Hand delivery to recipient.',
      },
    ],
  },
  'ATL-715892': {
    orderNumber: 'ATL-715892',
    recipient: 'Elena Chen',
    destination: 'New York, NY 10013, United States',
    courier: 'Atelier Climate Express',
    trackingNumber: 'ATL-EXP-1109923-DLV',
    estimatedDelivery: 'Delivered on Sep 06',
    statusLabel: 'Delivered • Signed by Recipient',
    progressPercent: 100,
    carbonOffsetKg: 4.8,
    items: [
      {
        name: 'Minimalist Wool Trench Coat',
        brand: 'Atelier Kōbō',
        price: 320,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
      },
    ],
    milestones: [
      {
        title: 'Archival Inspection & Certified',
        location: 'Biella Wool Mill / Copenhagen Studio',
        timestamp: 'Sep 02, 14:00 CET',
        status: 'completed',
        description: 'Hand-tailored finish reviewed and serial stamped.',
      },
      {
        title: 'Dispatched via Express Courier',
        location: 'Copenhagen Express Air Facility',
        timestamp: 'Sep 03, 19:45 CET',
        status: 'completed',
        description: 'Carbon-offset air transit logged.',
      },
      {
        title: 'Arrived at Destination Hub',
        location: 'New York Distribution Hub',
        timestamp: 'Sep 05, 10:15 EST',
        status: 'completed',
        description: 'Cleared customs and assigned to route courier.',
      },
      {
        title: 'Delivered to Doorstep',
        location: '428 Broome Street, New York',
        timestamp: 'Sep 06, 13:42 EST',
        status: 'completed',
        description: 'Received and signed by E. Chen. Digital provenance token active.',
      },
    ],
  },
};

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  isOpen,
  onClose,
  initialOrderNumber = 'ATL-882419',
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderNumber);
  const [currentOrderNumber, setCurrentOrderNumber] = useState(initialOrderNumber);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  // Retrieve matching order or generate realistic fallback for user-entered codes
  const matchedOrder = PRESET_ORDERS[currentOrderNumber] || {
    orderNumber: currentOrderNumber,
    recipient: 'Elena Chen',
    destination: '428 Broome Street, Apt 4B, New York, NY 10013',
    courier: 'Atelier Climate Express • DHL Carbon Neutral',
    trackingNumber: `ATL-EXP-${Math.abs(currentOrderNumber.split('').reduce((a, b) => a + b.charCodeAt(0), 0))}-US`,
    estimatedDelivery: 'Estimated in 2-3 Business Days',
    statusLabel: 'Order Dispatched • Carbon-Neutral Transit',
    progressPercent: 55,
    carbonOffsetKg: 3.2,
    items: [
      {
        name: 'Archival Curation Piece',
        brand: 'Atelier Workshop Collection',
        price: 195,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop',
      },
    ],
    milestones: [
      {
        title: 'Order Verified & Packaged',
        location: 'Copenhagen Studio Archive',
        timestamp: 'Recent',
        status: 'completed' as const,
        description: 'Handcrafted items secured in zero-plastic archival linen.',
      },
      {
        title: 'International Climate-Neutral Dispatch',
        location: 'Air Freight Transit',
        timestamp: 'In Progress',
        status: 'current' as const,
        description: 'Direct dispatch en route to destination facility.',
      },
      {
        title: 'Final Mile Courier Delivery',
        location: 'Destination Depot',
        timestamp: 'Upcoming',
        status: 'upcoming' as const,
        description: 'Doorstep handover with signature verification.',
      },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = searchInput.trim().toUpperCase();
    if (!formatted) {
      setErrorNotice('Please provide an order number (e.g. ATL-882419).');
      return;
    }
    setErrorNotice(null);
    setCurrentOrderNumber(formatted);
  };

  const handleQuickSample = (orderId: string) => {
    setSearchInput(orderId);
    setCurrentOrderNumber(orderId);
    setErrorNotice(null);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      id="order-status-tracking-modal"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-neutral-200 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-bold">
                LIVE DISPATCH LOG
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-neutral-900 tracking-tight">
              Order Status &amp; Provenance Tracking
            </h3>
            <p className="text-xs text-neutral-500">
              Live climate-neutral route telemetry from our European and Asian ateliers
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className={`p-2 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-all cursor-pointer ${
                isRefreshing ? 'animate-spin text-blue-600' : ''
              }`}
              title="Refresh telemetry"
              aria-label="Refresh status"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar & Preset Chips */}
        <div className="p-5 sm:p-6 border-b border-neutral-150 bg-white space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter order reference (e.g. ATL-882419)..."
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-neutral-900 placeholder:text-neutral-400 uppercase focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-neutral-950 hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <span>Track</span>
            </button>
          </form>

          {errorNotice && (
            <div className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorNotice}</span>
            </div>
          )}

          {/* Quick sample chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[11px] text-neutral-400 font-medium">Quick references:</span>
            <button
              onClick={() => handleQuickSample('ATL-882419')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                currentOrderNumber === 'ATL-882419'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200/60'
              }`}
            >
              ATL-882419 (In Transit)
            </button>
            <button
              onClick={() => handleQuickSample('ATL-390114')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                currentOrderNumber === 'ATL-390114'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200/60'
              }`}
            >
              ATL-390114 (Out for Delivery)
            </button>
            <button
              onClick={() => handleQuickSample('ATL-715892')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                currentOrderNumber === 'ATL-715892'
                  ? 'bg-neutral-900 text-white border-neutral-900'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-200/60'
              }`}
            >
              ATL-715892 (Delivered)
            </button>
          </div>
        </div>

        {/* Scrollable Tracking Content */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Order Overview Banner */}
          <div className="bg-neutral-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">
                  DOCKET REFERENCE
                </span>
                <p className="text-base sm:text-lg font-mono font-extrabold text-white">
                  {matchedOrder.orderNumber}
                </p>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] font-mono uppercase text-neutral-400">
                  ESTIMATED ARRIVAL
                </span>
                <p className="text-sm font-bold text-blue-400 flex items-center sm:justify-end gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{matchedOrder.estimatedDelivery}</span>
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-neutral-200">
                  {matchedOrder.statusLabel}
                </span>
                <span className="font-mono text-neutral-400 text-[11px]">
                  {matchedOrder.progressPercent}% Completed
                </span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${matchedOrder.progressPercent}%` }}
                />
              </div>
            </div>

            {/* Courier Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">{matchedOrder.courier}</span>
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">{matchedOrder.destination}</span>
              </div>
            </div>
          </div>

          {/* Environmental Offset & Provenance Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-[#F8F9FA] rounded-xl border border-neutral-200/80 text-xs">
            <div className="flex items-center gap-2 text-emerald-800 font-medium">
              <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>{matchedOrder.carbonOffsetKg} kg CO₂e Offset</strong> • Certified biochar carbon credit verified.
              </span>
            </div>
            <div className="flex items-center gap-1 text-neutral-500 text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Tamper-proof wax seal</span>
            </div>
          </div>

          {/* Real-time Milestone Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-4">
              Real-Time Route Telemetry
            </h4>

            <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-200">
              {matchedOrder.milestones.map((milestone, idx) => {
                const isCompleted = milestone.status === 'completed';
                const isCurrent = milestone.status === 'current';

                return (
                  <div key={idx} className="relative">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-6 top-0.5 w-[22px] h-[22px] rounded-full flex items-center justify-center ring-4 ring-white ${
                        isCompleted
                          ? 'bg-neutral-900 text-white'
                          : isCurrent
                          ? 'bg-blue-600 text-white shadow-sm ring-blue-100'
                          : 'bg-neutral-100 text-neutral-400 border border-neutral-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                      )}
                    </div>

                    {/* Step details */}
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h5
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-blue-600'
                              : isCompleted
                              ? 'text-neutral-900'
                              : 'text-neutral-500'
                          }`}
                        >
                          {milestone.title}
                        </h5>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {milestone.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                        {milestone.location}
                      </p>
                      <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dispatched Pieces in this Order */}
          <div className="pt-2 border-t border-neutral-150">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
              Included Archival Pieces ({matchedOrder.items.length})
            </h4>

            <div className="space-y-3">
              {matchedOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200/70"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-lg bg-neutral-200 border border-neutral-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-[10px] text-neutral-400 uppercase font-semibold">
                        {item.brand}
                      </p>
                      <h5 className="text-xs font-bold text-neutral-900 line-clamp-1">
                        {item.name}
                      </h5>
                      <span className="text-[11px] text-neutral-500">Qty: {item.quantity}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-neutral-900">
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Support Notice */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <span>Need carrier route assistance? Contact private concierge.</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-neutral-900 hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
