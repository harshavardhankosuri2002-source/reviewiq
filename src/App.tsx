import React, { useState, useEffect } from 'react';
import { Product, PrioritySelection, AttributeKey, ReviewSentiment, UserProfile } from './types';
import { SAMPLE_PRODUCTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { DiscoverPage } from './pages/DiscoverPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { ProductAnalysisPage } from './pages/ProductAnalysisPage';
import { ComparePage } from './pages/ComparePage';
import { SavedProductsPage } from './pages/SavedProductsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { SupportingReviewsPage } from './pages/SupportingReviewsPage';
import { TransparentCalculationPage } from './pages/TransparentCalculationPage';
import {
  getCurrentUser,
  getSavedProductsStorageKey,
  getComparisonStorageKey,
} from './utils/auth';

export const App: React.FC = () => {
  // Active User Profile & Privacy State
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

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

  // Isolated Comparison State per User
  const [comparedProductIds, setComparedProductIds] = useState<string[]>(() => {
    try {
      const user = getCurrentUser();
      const saved = localStorage.getItem(getComparisonStorageKey(user.id));
      return saved ? JSON.parse(saved) : ['iphone-16', 'galaxy-s24'];
    } catch {
      return ['iphone-16', 'galaxy-s24'];
    }
  });

  // Isolated Saved Products State - Every new visitor or shared link starts with [] (EMPTY)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const user = getCurrentUser();
      const saved = localStorage.getItem(getSavedProductsStorageKey(user.id));
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
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

  // Sync saved products to user-isolated localStorage key
  useEffect(() => {
    try {
      localStorage.setItem(getSavedProductsStorageKey(currentUser.id), JSON.stringify(savedIds));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [savedIds, currentUser.id]);

  // Sync comparison products to user-isolated localStorage key
  useEffect(() => {
    try {
      localStorage.setItem(getComparisonStorageKey(currentUser.id), JSON.stringify(comparedProductIds));
    } catch (e) {
      console.warn('Could not save comparison to localStorage', e);
    }
  }, [comparedProductIds, currentUser.id]);

  // Handle user login / switch / logout: reload that user's private data
  const handleUserChanged = (newUser: UserProfile) => {
    setCurrentUser(newUser);
    try {
      const userSaved = localStorage.getItem(getSavedProductsStorageKey(newUser.id));
      setSavedIds(userSaved ? JSON.parse(userSaved) : []);

      const userCompared = localStorage.getItem(getComparisonStorageKey(newUser.id));
      setComparedProductIds(userCompared ? JSON.parse(userCompared) : ['iphone-16', 'galaxy-s24']);
    } catch (e) {
      console.warn('Could not switch user state', e);
      setSavedIds([]);
    }
  };

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
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
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
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentView === 'how-it-works' && (
          <HowItWorksPage onBackToDiscover={() => setCurrentView('discover')} />
        )}
      </main>

      {/* Auth & Private Profile Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onUserChanged={handleUserChanged}
        savedCount={savedIds.length}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};
