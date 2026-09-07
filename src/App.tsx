import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { TabLayout } from "./components/layout/TabLayout";
import { Home } from "./pages/Home";
import { Payments } from "./pages/Payments";
import { Products } from "./pages/Products";
import { More } from "./pages/More";
import { DiscoverHome } from "./pages/DiscoverHome";
import { ForYouPage } from "./pages/ForYouPage";
import { WhatsNewPage } from "./pages/WhatsNewPage";
import { OffersPage } from "./pages/OffersPage";
import { RecommendationDetail } from "./pages/RecommendationDetail";
import { FeatureDetail } from "./pages/FeatureDetail";
import { OfferDetail } from "./pages/OfferDetail";
import { OfferWallet } from "./pages/OfferWallet";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route element={<TabLayout />}>
          <Route path="/" element={<Navigate to="/discover" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/discover" element={<DiscoverHome />} />
          <Route path="/discover/for-you" element={<ForYouPage />} />
          <Route path="/discover/whats-new" element={<WhatsNewPage />} />
          <Route path="/discover/offers" element={<OffersPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/more" element={<More />} />
        </Route>

        <Route path="/discover/recommendation/:id" element={<RecommendationDetail />} />
        <Route path="/discover/feature/:id" element={<FeatureDetail />} />
        <Route path="/discover/offer/:id" element={<OfferDetail />} />
        <Route path="/discover/offers/wallet" element={<OfferWallet />} />

        <Route path="*" element={<Navigate to="/discover" replace />} />
      </Routes>
    </AppShell>
  );
}

export default App;
