import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DataIngestion from "./pages/DataIngestion";
import NlpAnalysis from "./pages/NlpAnalysis";
import DataMasking from "./pages/DataMasking";
import RiskScan from "./pages/RiskScan";
import Alerts from "./pages/Alerts";
import Suggestions from "./pages/Suggestions";
import Reports from "./pages/Reports";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/data-ingestion" element={<DataIngestion />} />
          <Route path="/nlp-analysis" element={<NlpAnalysis />} />
          <Route path="/data-masking" element={<DataMasking />} />
          <Route path="/risk-scan" element={<RiskScan />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
