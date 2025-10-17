import React, { useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, LanguageContext } from './contexts/LanguageContext';
import { BookingProvider } from './contexts/BookingContext';
import { DonationProvider } from './contexts/DonationContext';
import { ZhavProvider } from './contexts/ZhavContext';
import { ExitFeeProvider } from './contexts/ExitFeeContext';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage';
import FlightsPage from './pages/FlightsPage';
import HotelsPage from './pages/HotelsPage';
import TravelPage from './pages/TravelPage';
import PassengerDetailsPage from './pages/PassengerDetailsPage';
import ReviewPage from './pages/ReviewPage';
import PaymentPage from './pages/PaymentPage';
import InternationalTravelPage from './pages/InternationalTravelPage';
import InternationalFlightsPage from './pages/InternationalFlightsPage';
import HotelTravelPage from './pages/HotelTravelPage';
import HotelDetailsPage from './pages/HotelDetailsPage';
import HotelReviewPage from './pages/HotelReviewPage';
import InternationalHotelTravelPage from './pages/InternationalHotelTravelPage';
import InternationalHotelsPage from './pages/InternationalHotelsPage';
import InternationalHotelDetailsPage from './pages/InternationalHotelDetailsPage';
import TrainTravelPage from './pages/TrainTravelPage';
import TrainsPage from './pages/TrainsPage';
import TaxiTravelPage from './pages/TaxiTravelPage';
import TaxiOptionsPage from './pages/TaxiOptionsPage';
import TaxiStatusPage from './pages/TaxiStatusPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import SettingsPage from './pages/SettingsPage';
import LoginAndSecurityPage from './pages/LoginAndSecurityPage';
import WalletPage from './pages/WalletPage';
import PurchasesPage from './pages/PurchasesPage';
import DiscountsPage from './pages/DiscountsPage';
import CustomerClubPage from './pages/CustomerClubPage';
import CarRentalPage from './pages/CarRentalPage';
import CarResultsPage from './pages/CarResultsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import CIPPage from './pages/CIPPage';
import CIPResultsPage from './pages/CIPResultsPage';
import VisaPage from './pages/VisaPage';
import VisaApplicationPage from './pages/VisaApplicationPage';
import InsurancePage from './pages/InsurancePage';
import InsuranceResultsPage from './pages/InsuranceResultsPage';
import LocatorPage from './pages/LocatorPage';
import CurrencyServicesPage from './pages/CurrencyServicesPage';
import BuyCurrencyPage from './pages/BuyCurrencyPage';
import DepositToAccountPage from './pages/DepositToAccountPage';
import CurrencyDeliveryPage from './pages/CurrencyDeliveryPage';
import HealthServicesPage from './pages/HealthServicesPage';
import AppointmentBookingPage from './pages/AppointmentBookingPage';
import AppointmentConfirmationPage from './pages/AppointmentConfirmationPage';
import PartnerExchangesPage from './pages/PartnerExchangesPage';
import ForeignPurchasePage from './pages/ForeignPurchasePage';
import ExchangeAppointmentPage from './pages/ExchangeAppointmentPage';
import OffersPage from './pages/OffersPage';
import AranAirlinesPage from './pages/AranAirlinesPage';
import AranFlightsPage from './pages/AranFlightsPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PingoCreditPage from './pages/PingoCreditPage';
import GiftCardPage from './pages/GiftCardPage';
import GiftCardDetailsPage from './pages/GiftCardDetailsPage';
import GiftCardReviewPage from './pages/GiftCardReviewPage';
import GiftCardConfirmationPage from './pages/GiftCardConfirmationPage';
import CharityPage from './pages/CharityPage';
import DonationPage from './pages/DonationPage';
import DonationConfirmationPage from './pages/DonationConfirmationPage';
import ExitFeePage from './pages/ExitFeePage';
import ExitFeeReviewPage from './pages/ExitFeeReviewPage';
import ExitFeePaymentPage from './pages/ExitFeePaymentPage';
import ExitFeeConfirmationPage from './pages/ExitFeeConfirmationPage';
import DepartureBanInquiryPage from './pages/DepartureBanInquiryPage';
import ZhavGoldGalleryPage from './pages/ZhavGoldGalleryPage';
import ZhavProductDetailsPage from './pages/ZhavProductDetailsPage';
import ZhavCartPage from './pages/ZhavCartPage';
import ZhavCheckoutPage from './pages/ZhavCheckoutPage';
import ZhavConfirmationPage from './pages/ZhavConfirmationPage';
import BillPaymentPage from './pages/BillPaymentPage';
import BillReviewPage from './pages/BillReviewPage';
import BillConfirmationPage from './pages/BillConfirmationPage';
import TopUpPage from './pages/TopUpPage';
import TopUpReviewPage from './pages/TopUpReviewPage';
import TopUpConfirmationPage from './pages/TopUpConfirmationPage';
import AdminPage from './pages/AdminPage';
import AranAirlinesAdminPage from './pages/admin/AranAirlinesAdminPage';
import DomesticFlightsAdminPage from './pages/admin/DomesticFlightsAdminPage';
import InternationalFlightsAdminPage from './pages/admin/InternationalFlightsAdminPage';
import VisaAdminPage from './pages/admin/VisaAdminPage';
import InternationalHotelsAdminPage from './pages/admin/InternationalHotelsAdminPage';
import DomesticHotelsAdminPage from './pages/admin/DomesticHotelsAdminPage';
import CurrencyPurchaseAdminPage from './pages/admin/CurrencyPurchaseAdminPage';
import CurrencyDepositAdminPage from './pages/admin/CurrencyDepositAdminPage';
import CurrencyDeliveryAdminPage from './pages/admin/CurrencyDeliveryAdminPage';
import ForeignPurchaseAdminPage from './pages/admin/ForeignPurchaseAdminPage';
import GiftCardPurchaseAdminPage from './pages/admin/GiftCardPurchaseAdminPage';
import ExchangeAppointmentAdminPage from './pages/admin/ExchangeAppointmentAdminPage';
import AccountingDashboardPage from './pages/admin/accounting/AccountingDashboardPage';
import AccountingTransactionsPage from './pages/admin/accounting/AccountingTransactionsPage';
// FIX: Correctly import the AccountingReportsPage component.
import AccountingReportsPage from './pages/admin/accounting/AccountingReportsPage';
import AdminPurchaseListPage from './pages/admin/AdminPurchaseListPage';
import CIPAdminPage from './pages/admin/CIPAdminPage';
import BillsAdminPage from './pages/admin/BillsAdminPage';
import ZhavAdminPage from './pages/admin/ZhavAdminPage';
import TrainAdminPage from './pages/admin/TrainAdminPage';
import CharityAdminPage from './pages/admin/CharityAdminPage';
import FlightConfirmationPage from './pages/FlightConfirmationPage';
import HotelConfirmationPage from './pages/HotelConfirmationPage';
import HealthAdminPage from './pages/admin/HealthAdminPage';
import UsersAdminPage from './pages/admin/UsersAdminPage';
import PermissionsAdminPage from './pages/admin/PermissionsAdminPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import HelpCenterPage from './pages/HelpCenterPage';
import ManageVisaAdminPage from './pages/admin/ManageVisaAdminPage';
import ManageHealthServicesAdminPage from './pages/admin/ManageHealthServicesAdminPage';

const AppContent = () => {
  const { language } = useContext(LanguageContext);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const isRtl = language === 'fa' || language === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const containerClasses = isAdminPage
    ? "admin-bg min-h-screen"
    : "max-w-md mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen shadow-2xl dark:shadow-slate-900/50";

  return (
    <div className={containerClasses}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offers" element={<OffersPage />} />
        {/* Flight Routes */}
        <Route path="/aran-airlines" element={<AranAirlinesPage />} />
        <Route path="/aran-flights" element={<AranFlightsPage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/travel/international" element={<InternationalTravelPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/flights/international" element={<InternationalFlightsPage />} />
        {/* Hotel Routes */}
        <Route path="/travel/hotels" element={<HotelTravelPage />} />
        <Route path="/travel/hotels/international" element={<InternationalHotelTravelPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/international" element={<InternationalHotelsPage />} />
        <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
        <Route path="/hotels/international/:hotelId" element={<InternationalHotelDetailsPage />} />
        <Route path="/hotel-review" element={<HotelReviewPage />} />
        {/* Train Routes */}
        <Route path="/travel/train" element={<TrainTravelPage />} />
        <Route path="/trains" element={<TrainsPage />} />
        {/* Taxi Routes */}
        <Route path="/taxi" element={<TaxiTravelPage />} />
        <Route path="/taxi/options" element={<TaxiOptionsPage />} />
        <Route path="/taxi/status" element={<TaxiStatusPage />} />
        {/* Car Rental Route */}
        <Route path="/car-rental" element={<CarRentalPage />} />
        <Route path="/car-rental/results" element={<CarResultsPage />} />
        <Route path="/car-rental/:carId" element={<CarDetailsPage />} />
        {/* CIP Routes */}
        <Route path="/cip" element={<CIPPage />} />
        <Route path="/cip/results" element={<CIPResultsPage />} />
        {/* Visa Routes */}
        <Route path="/visa" element={<VisaPage />} />
        <Route path="/visa/application" element={<VisaApplicationPage />} />
        {/* Insurance Routes */}
        <Route path="/insurance" element={<InsurancePage />} />
        <Route path="/insurance/results" element={<InsuranceResultsPage />} />
         {/* Locator Route */}
        <Route path="/locator" element={<LocatorPage />} />
        {/* Currency Services Route */}
        <Route path="/currency-services" element={<CurrencyServicesPage />} />
        <Route path="/currency-services/buy" element={<BuyCurrencyPage />} />
        <Route path="/currency-services/deposit" element={<DepositToAccountPage />} />
        <Route path="/currency-services/delivery" element={<CurrencyDeliveryPage />} />
        <Route path="/currency-services/partners" element={<PartnerExchangesPage />} />
        <Route path="/currency-services/foreign-purchase" element={<ForeignPurchasePage />} />
        <Route path="/currency-services/gift-cards" element={<GiftCardPage />} />
        <Route path="/currency-services/gift-cards/:brandId" element={<GiftCardDetailsPage />} />
        <Route path="/gift-card-review" element={<GiftCardReviewPage />} />
        <Route path="/gift-card-confirmation" element={<GiftCardConfirmationPage />} />
        <Route path="/exchange-appointment" element={<ExchangeAppointmentPage />} />
        {/* Health Services Routes */}
        <Route path="/health-services" element={<HealthServicesPage />} />
        <Route path="/health-services/booking" element={<AppointmentBookingPage />} />
        <Route path="/health-services/confirmation" element={<AppointmentConfirmationPage />} />
        {/* Charity Routes */}
        <Route path="/charity" element={<CharityPage />} />
        <Route path="/donate/:projectId" element={<DonationPage />} />
        <Route path="/donation-confirmation" element={<DonationConfirmationPage />} />
        {/* Bill Payment Routes */}
        <Route path="/bills" element={<BillPaymentPage />} />
        <Route path="/bill-review" element={<BillReviewPage />} />
        <Route path="/bill-confirmation" element={<BillConfirmationPage />} />
        {/* Top-up Routes */}
        <Route path="/topup" element={<TopUpPage />} />
        <Route path="/topup-review" element={<TopUpReviewPage />} />
        <Route path="/topup-confirmation" element={<TopUpConfirmationPage />} />
        {/* Booking Flow Routes */}
        <Route path="/seat-selection" element={<SeatSelectionPage />} />
        <Route path="/passenger-details" element={<PassengerDetailsPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/flight-confirmation" element={<FlightConfirmationPage />} />
        <Route path="/hotel-confirmation" element={<HotelConfirmationPage />} />
        {/* Profile & Wallet Routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/settings" element={<SettingsPage />} />
        <Route path="/profile/login-security" element={<LoginAndSecurityPage />} />
        <Route path="/profile/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/profile/help-center" element={<HelpCenterPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/discounts" element={<DiscountsPage />} />
        <Route path="/customer-club" element={<CustomerClubPage />} />
        <Route path="/pingo-credit" element={<PingoCreditPage />} />
        
        {/* --- ADMIN Routes --- */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/users" element={<UsersAdminPage />} />
        <Route path="/admin/permissions" element={<PermissionsAdminPage />} />
        <Route path="/admin/aran-flights" element={<AranAirlinesAdminPage />} />
        <Route path="/admin/domestic-flights" element={<DomesticFlightsAdminPage />} />
        <Route path="/admin/international-flights" element={<InternationalFlightsAdminPage />} />
        <Route path="/admin/domestic-hotels" element={<DomesticHotelsAdminPage />} />
        <Route path="/admin/international-hotels" element={<InternationalHotelsAdminPage />} />
        <Route path="/admin/visa" element={<VisaAdminPage />} />
        <Route path="/admin/visa/manage" element={<ManageVisaAdminPage />} />
        <Route path="/admin/cip" element={<CIPAdminPage />} />
        <Route path="/admin/bills" element={<BillsAdminPage />} />
        <Route path="/admin/zhav" element={<ZhavAdminPage />} />
        <Route path="/admin/train" element={<TrainAdminPage />} />
        <Route path="/admin/charity" element={<CharityAdminPage />} />
        {/* Exchange Sub-routes */}
        <Route path="/admin/currency-purchase" element={<CurrencyPurchaseAdminPage />} />
        <Route path="/admin/currency-deposit" element={<CurrencyDepositAdminPage />} />
        <Route path="/admin/currency-delivery" element={<CurrencyDeliveryAdminPage />} />
        <Route path="/admin/foreign-purchase" element={<ForeignPurchaseAdminPage />} />
        <Route path="/admin/gift-card-purchase" element={<GiftCardPurchaseAdminPage />} />
        <Route path="/admin/exchange-appointments" element={<ExchangeAppointmentAdminPage />} />
        {/* Accounting Sub-routes */}
        <Route path="/admin/accounting" element={<AccountingDashboardPage />} />
        <Route path="/admin/accounting/transactions" element={<AccountingTransactionsPage />} />
        <Route path="/admin/accounting/reports" element={<AccountingReportsPage />} />
        {/* New Admin Purchase List Pages */}
        <Route path="/admin/health" element={<HealthAdminPage />} />
        <Route path="/admin/health/manage" element={<ManageHealthServicesAdminPage />} />
        <Route path="/admin/insurance" element={<AdminPurchaseListPage pageTitleKey="insurance" activeTabId="insurance" filterTypes={['insurance']} />} />
        <Route path="/admin/pingo-credit" element={<AdminPurchaseListPage pageTitleKey="pingoCredit" activeTabId="pingo-credit" filterTypes={['pingo-credit']} />} />

        {/* New Standalone Routes */}
        <Route path="/exit-fee" element={<ExitFeePage />} />
        <Route path="/exit-fee/review" element={<ExitFeeReviewPage />} />
        <Route path="/exit-fee/payment" element={<ExitFeePaymentPage />} />
        <Route path="/exit-fee/confirmation" element={<ExitFeeConfirmationPage />} />
        <Route path="/departure-ban-inquiry" element={<DepartureBanInquiryPage />} />
        {/* Zhav Gold Gallery Routes */}
        <Route path="/zhav-gold-gallery" element={<ZhavGoldGalleryPage />} />
        <Route path="/zhav-gold-gallery/product/:productId" element={<ZhavProductDetailsPage />} />
        <Route path="/zhav-gold-gallery/cart" element={<ZhavCartPage />} />
        <Route path="/zhav-gold-gallery/checkout" element={<ZhavCheckoutPage />} />
        <Route path="/zhav-gold-gallery/confirmation" element={<ZhavConfirmationPage />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BookingProvider>
          <DonationProvider>
            <ZhavProvider>
              <ExitFeeProvider>
                <HashRouter>
                  <AppContent />
                </HashRouter>
              </ExitFeeProvider>
            </ZhavProvider>
          </DonationProvider>
        </BookingProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;