import React, { useState, useEffect } from 'react';
import { Product, PrioritySelection, AttributeKey, ReviewSentiment } from './types';
import { SAMPLE_PRODUCTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DiscoverPage } from './pages/DiscoverPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ProductAnalysisPage } from './pages/ProductAnalysisPage';
import { ComparePage } from './pages/ComparePage';
import { SavedProductsPage } from './pages/SavedProductsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SupportingReviewsPage } from './pages/SupportingReviewsPage';
import { TransparentCalculationPage } from './pages/TransparentCalculationPage';

export const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<string>('discover');
  const [selectedProductId, setSelectedProductId] = useState<string>('iphone-16');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Contextual filters for Supporting Reviews deep-linking
  const [supportingReviewContext, setSupportingReviewContext] = useState<{
    attribute?: AttributeKey | 'all';
    sentiment?: ReviewSentiment | 'all';
    focusTitle?: string;
  }>({
    attribute: 'all',
    sentiment: 'all',
  });

  // Comparison State (default compares iPhone 16 and Galaxy S24)
  const [comparedProductIds, setComparedProductIds] = useState<string[]>([
    'iphone-16',
    'galaxy-s24',
  ]);

  // Saved Products State with LocalStorage Session Persistence
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vox_saved_products') || localStorage.getItem('reviewiq_saved_products');
      return saved ? JSON.parse(saved) : ['iphone-16'];
    } catch {
      return ['iphone-16'];
    }
  });

  // User Priorities State
  const [priorities, setPriorities] = useState<PrioritySelection>({
    battery: true,
    camera: false,
    reliability: false,
    performance: false,
    value: false,
    software: false,
  });

  // Sync saved products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vox_saved_products', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [savedIds]);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProductId]);

  // Actions
  const handleToggleSave = (productId: string) => {
    setSavedIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    const prod = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (prod) {
      setSelectedVariant(prod.defaultVariant);
    }
    setCurrentView('product');
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleCompareLaunch = (productId: string) => {
    setComparedProductIds(prev => {
      if (prev.includes(productId)) {
        return prev.length >= 2 ? prev : [...prev, 'galaxy-s24'].slice(0, 2);
      }
      // Keep up to 3 products
      const updated = [productId, ...prev.filter(id => id !== productId)].slice(0, 3);
      return updated.length >= 2 ? updated : [...updated, 'galaxy-s24'];
    });
    setCurrentView('compare');
  };

  const handleToggleProductInCompare = (productId: string) => {
    setComparedProductIds(prev => {
      if (prev.includes(productId)) {
        if (prev.length <= 1) return prev; // keep at least 1
        return prev.filter(id => id !== productId);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), productId];
        }
        return [...prev, productId];
      }
    });
  };

  const handleTogglePriority = (key: AttributeKey) => {
    setPriorities(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigate = (view: string, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
      const prod = SAMPLE_PRODUCTS.find(p => p.id === productId);
      if (prod) {
        setSelectedVariant(prod.defaultVariant);
      }
    }
    setCurrentView(view);
  };

  // Dedicated Screen Navigation Handlers
  const handleNavigateSupportingReviews = (
    attribute?: AttributeKey,
    sentiment?: ReviewSentiment,
    focusTitle?: string
  ) => {
    setSupportingReviewContext({
      attribute: attribute || 'all',
      sentiment: sentiment || 'all',
      focusTitle,
    });
    setCurrentView('supporting-reviews');
  };

  const handleNavigateCalculation = () => {
    setCurrentView('transparent-calculation');
  };

  const selectedProduct =
    SAMPLE_PRODUCTS.find(p => p.id === selectedProductId) || SAMPLE_PRODUCTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#182C45] selection:bg-[#0284C7] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        savedCount={savedIds.length}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'discover' && (
          <DiscoverPage
            products={SAMPLE_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onSearchSubmit={handleSearchSubmit}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onCompare={handleCompareLaunch}
            onNavigateHowItWorks={() => setCurrentView('how-it-works')}
          />
        )}

        {currentView === 'search' && (
          <SearchResultsPage
            products={SAMPLE_PRODUCTS}
            initialQuery={searchQuery}
            onSelectProduct={handleSelectProduct}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onCompare={handleCompareLaunch}
            onBackToDiscover={() => setCurrentView('discover')}
          />
        )}

        {currentView === 'product' && (
          <ProductAnalysisPage
            product={selectedProduct}
            isSaved={savedIds.includes(selectedProduct.id)}
            onToggleSave={handleToggleSave}
            onCompare={handleCompareLaunch}
            onBackToDiscover={() => setCurrentView('discover')}
            priorities={priorities}
            onTogglePriority={handleTogglePriority}
            onNavigateSupportingReviews={handleNavigateSupportingReviews}
            onNavigateCalculation={handleNavigateCalculation}
          />
        )}

        {currentView === 'supporting-reviews' && (
          <SupportingReviewsPage
            product={selectedProduct}
            selectedVariant={selectedVariant || selectedProduct.defaultVariant}
            priorities={priorities}
            initialAttribute={supportingReviewContext.attribute}
            initialSentiment={supportingReviewContext.sentiment}
            focusInsightTitle={supportingReviewContext.focusTitle}
            onBackToProduct={() => setCurrentView('product')}
            onNavigateCalculation={handleNavigateCalculation}
            onSelectProductVariant={variant => setSelectedVariant(variant)}
          />
        )}

        {currentView === 'transparent-calculation' && (
          <TransparentCalculationPage
            product={selectedProduct}
            selectedVariant={selectedVariant || selectedProduct.defaultVariant}
            priorities={priorities}
            onTogglePriority={handleTogglePriority}
            onBackToProduct={() => setCurrentView('product')}
            onNavigateSupportingReviews={attr =>
              handleNavigateSupportingReviews(
                attr,
                undefined,
                attr ? `${selectedProduct.name} — ${attr} Evidence` : undefined
              )
            }
          />
        )}

        {currentView === 'compare' && (
          <ComparePage
            products={SAMPLE_PRODUCTS}
            selectedProductIds={comparedProductIds}
            onToggleProductInCompare={handleToggleProductInCompare}
            onSelectProduct={handleSelectProduct}
            priorities={priorities}
            onTogglePriority={handleTogglePriority}
            onBackToDiscover={() => setCurrentView('discover')}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentView === 'saved' && (
          <SavedProductsPage
            products={SAMPLE_PRODUCTS}
            savedIds={savedIds}
            onRemoveSave={handleToggleSave}
            onSelectProduct={handleSelectProduct}
            onCompareSaved={ids => {
              setComparedProductIds(ids);
              setCurrentView('compare');
            }}
            onBackToDiscover={() => setCurrentView('discover')}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksPage onBackToDiscover={() => setCurrentView('discover')} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
