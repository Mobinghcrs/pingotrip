// FIX: Removed self-import causing name conflicts.

export type Language = 'fa' | 'en' | 'ar';

export interface Flight {
  id: number;
  airline: string;
  type: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  date: string;
}

export interface Hotel {
    id: number;
    nameKey: string;
    locationKey: string;
    rating: number;
    price: number;
    image: string;
    images?: string[];
    description: string;
    amenities: string[];
}

export interface Train {
    id: number;
    companyKey: string;
    trainNumber: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    date: string;
}

export interface TaxiRide {
    id: number;
    providerKey: string;
    carTypeKey: string;
    eta: number;
    price: number;
}

export interface Car {
    id: number;
    nameKey: string;
    seats: number;
    transmission: 'automatic' | 'manual';
    fuelType: 'petrol' | 'diesel' | 'electric';
    pricePerDay: number;
    image: string;
    images?: string[];
    description: string;
}

export interface CIPService {
    id: number;
    loungeNameKey: string;
    airport: string;
    price: number;
    image: string;
    features: string[];
}

export interface VisaService {
    id: number;
    country: string;
    visaType: string;
    price: number;
    processingTime: number; // in days
    image: string;
}

export interface InsurancePlan {
    id: number;
    planNameKey: string;
    providerKey: string;
    price: number;
    coverage: {
        medical: number;
        cancellation: number;
        baggage: number;
    };
}

export interface HealthService {
    id: string;
    nameKey: string;
    price: number;
}

export interface MedicalAppointment {
    treatment: string;
    date: string;
    time: string;
    patientName: string;
    price: number;
    ref: string;
}

export interface CurrencyPurchase {
    amountToman: number;
    selectedCurrency: string;
    cityId: string;
    exchangeOfficeId: string;
    transactionId?: string;
}

export interface CurrencyDeposit {
    amountToman: number;
    destinationCountry: string;
    recipientFullName: string;
    recipientAddress: string;
    iban: string;
    swiftBic: string;
    bankName: string;
    transactionId?: string;
}

export interface CurrencyDelivery {
    destinationCountry: string;
    destinationCity: string;
    selectedCurrency: string;
    amountForeign: number;
    destinationAddress: string;
    nationalIdImage: string;
    recipientPhoto: string;
    transactionId?: string;
}

export interface ForeignPurchase {
    productUrl: string;
    productImage: string;
    foreignAmount: number;
    foreignCurrency: 'USD' | 'EUR' | 'GBP';
    tomanAmount: number;
    transactionId?: string;
}


export interface GiftCard {
    id: string;
    brandId: string;
    region: string;
    amount: number;
    currency: 'USD' | 'EUR';
    priceToman: number;
}

export interface GiftCardBrand {
    id: string;
    nameKey: string;
    image: string;
}

export interface GiftCardPurchase {
    selectedGiftCard: GiftCard;
    transactionId?: string;
}

export interface BillDetails {
    billId: string;
    paymentId: string;
    type: 'electricity' | 'water' | 'gas';
    amount: number;
}

export interface TopUpDetails {
    mobileNumber: string;
    operator: 'mci' | 'irancell' | 'rightel';
    amount: number;
}


export interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    nationalId: string;
    gender: 'male' | 'female';
}

export interface VisaApplication {
    personal: {
        firstName: string;
        lastName: string;
        gender: 'male' | 'female';
        dateOfBirth: string;
        nationality: string;
    };
    passport: {
        number: string;
        issueDate: string;
        expiryDate: string;
    };
}

export interface HealthFlowState {
    treatmentId: string;
    date: string;
}

export interface TaxiFlowState {
    pickup: string;
    dropoff: string;
}

export interface SeatInfo {
    id: string;
    price: number;
}

export interface SeatData {
    id: string;
    status: 'available' | 'occupied' | 'exit' | 'premium' | 'unavailable';
    price: number;
}

export interface BookingContextType {
    selectedFlight: Flight | null;
    selectedHotel: Hotel | null;
    selectedTrain: Train | null;
    selectedRide: TaxiRide | null;
    selectedCar: Car | null;
    selectedCIP: CIPService | null;
    selectedVisa: VisaService | null;
    selectedInsurance: InsurancePlan | null;
    selectedAppointment: MedicalAppointment | null;
    selectedSeat: SeatInfo | null;
    selectedBill: BillDetails | null;
    selectedTopUp: TopUpDetails | null;
    healthFlowState: HealthFlowState | null;
    taxiFlowState: TaxiFlowState | null;
    passengers: Passenger[];
    visaApplication: VisaApplication | null;
    currencyPurchase: CurrencyPurchase | null;
    currencyDeposit: CurrencyDeposit | null;
    currencyDelivery: CurrencyDelivery | null;
    foreignPurchase: ForeignPurchase | null;
    giftCardPurchase: GiftCardPurchase | null;

    startHealthFlow: (data: HealthFlowState) => void;
    startTaxiFlow: (data: TaxiFlowState) => void;
    selectFlight: (flight: Flight) => void;
    selectHotel: (hotel: Hotel) => void;
    selectTrain: (train: Train) => void;
    selectRide: (ride: TaxiRide) => void;
    selectCar: (car: Car) => void;
    selectCIP: (cip: CIPService) => void;
    selectVisa: (visa: VisaService) => void;
    selectInsurance: (plan: InsurancePlan) => void;
    selectAppointment: (appointment: MedicalAppointment) => void;
    updateSeatSelection: (seat: SeatInfo | null) => void;
    selectBill: (bill: BillDetails) => void;
    selectTopUp: (topup: TopUpDetails) => void;
    updatePassengers: (passengers: Passenger[]) => void;
    updateVisaApplication: (application: VisaApplication) => void;
    updateCurrencyPurchase: (purchase: CurrencyPurchase) => void;
    updateCurrencyDeposit: (deposit: CurrencyDeposit) => void;
    updateCurrencyDelivery: (delivery: CurrencyDelivery) => void;
    updateForeignPurchase: (purchase: ForeignPurchase) => void;
    updateGiftCardPurchase: (purchase: GiftCardPurchase) => void;
    clearBooking: () => void;
}

export interface Transaction {
    id: number;
    type: 'credit' | 'debit';
    title: string;
    date: string;
    amount: number;
}

export type PurchaseType = 'flight' | 'hotel' | 'train' | 'health' | 'foreignPurchase' | 'car' | 'cip' | 'visa' | 'insurance' | 'bill' | 'topup' | 'zhav' | 'exitFee' | 'charity' | 'pingo-credit' | 'currencyPurchase' | 'currencyDeposit' | 'currencyDelivery' | 'giftCardPurchase';

export interface Purchase {
    id: number;
    type: PurchaseType;
    descriptionKey: string;
    ref: string;
    price: number;
    status: 'pending' | 'approved' | 'rejected';
}

export interface Discount {
    id: number;
    descriptionKey: string;
    code: string;
    expiry: string;
}

export interface PointOfInterest {
    id: number;
    nameKey: string;
    category: 'attractions' | 'restaurants' | 'shopping' | 'atms';
    image: string;
    distance: number;
    rating: number;
}

export interface Offer {
    id: number;
    titleKey: string;
    descriptionKey: string;
    image: string;
    link: string;
    discount?: string;
}

export interface CharityProject {
    id: string;
    titleKey: string;
    descriptionKey: string;
    image: string;
    goal: number;
    currentAmount: number;
}

export interface Donation {
    project: CharityProject;
    amount: number;
    transactionId: string;
}

export interface DonationContextType {
    selectedProject: CharityProject | null;
    donation: Donation | null;
    selectProject: (project: CharityProject) => void;
    setDonation: (donation: Donation | null) => void;
    clearDonation: () => void;
}

export interface ExitFeeDetails {
    nationalId: string;
    fullName: string;
    tripType: 'first' | 'second' | 'thirdAndMore';
    travelMethod: 'air' | 'land' | 'atabatLand' | 'sea';
    feeAmount: number;
    transactionId?: string;
}

export interface ExitFeeContextType {
    details: ExitFeeDetails | null;
    setFeeDetails: (details: ExitFeeDetails) => void;
    clearFeeDetails: () => void;
}

export interface ZhavProduct {
    id: number;
    nameKey: string;
    descriptionKey: string;
    image: string;
    price: number;
    weight: number;
    karat: number;
    category: 'necklaces' | 'rings' | 'bracelets' | 'earrings';
}

export interface ZhavContextType {
    cart: ZhavProduct[];
    addToCart: (product: ZhavProduct) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

export interface AdminPassenger {
    id: number;
    fullName: string;
    nationalId: string;
    gender: 'male' | 'female';
}

export interface AranBooking {
    id: number;
    pnr: string;
    flight: Flight;
    passengers: AdminPassenger[];
    totalPrice: number;
    status: 'confirmed' | 'cancelled' | 'pending';
    contactEmail: string;
    contactPhone: string;
}

export interface AdminVisaApplication {
    id: number;
    applicationId: string;
    applicantName: string;
    country: string;
    applicationDate: string;
    status: 'pending' | 'in_review' | 'approved' | 'rejected';
    personalInfo: {
        dateOfBirth: string;
        nationality: string;
        gender: 'male' | 'female';
    };
    passportInfo: {
        number: string;
        issueDate: string;
        expiryDate: string;
    };
    documents: {
        passportScan: string;
        photo: string;
    };
    history: {
        date: string;
        status: string;
        notes: string;
    }[];
}

export interface AdminHotelBooking {
    id: number;
    bookingId: string;
    hotel: {
        nameKey: string;
        locationKey: string;
    };
    guestName: string;
    guests: AdminPassenger[];
    checkInDate: string;
    checkOutDate: string;
    numberOfNights: number;
    totalPrice: number;
    status: 'confirmed' | 'cancelled' | 'pending';
    contactEmail: string;
    contactPhone: string;
}

export interface AdminCIPBooking {
    id: number;
    bookingId: string;
    service: {
        loungeNameKey: string;
        airport: string;
    };
    guestName: string; 
    guests: AdminPassenger[];
    serviceDate: string;
    totalPrice: number;
    status: 'confirmed' | 'cancelled' | 'pending';
    contactEmail: string;
    contactPhone: string;
    notes?: string;
    history?: {
        date: string;
        status: string;
        notes: string;
    }[];
}

export interface ExchangeAppointment {
    cityId: string;
    exchangeOfficeId: string;
    date: Date | null;
    time: string;
    expertId: string;
    service: 'currency' | 'coin' | undefined;
    currencyType: 'USD' | 'EUR' | 'GBP' | undefined;
    appointmentId?: string;
}

export interface AdminGiftCardPurchase {
    id: number;
    purchaseId: string;
    customerName: string;
    purchaseDate: string;
    card: {
        brandKey: string;
        amount: number;
        currency: 'USD' | 'EUR';
        region: string;
    };
    priceToman: number;
    status: 'pending' | 'approved' | 'rejected';
    giftCardCode?: string;
    notes?: string;
}

export interface AdminExchangeAppointment {
    id: number;
    appointmentId: string;
    customerName: string;
    branchNameKey: string;
    date: string;
    time: string;
    expertNameKey: string;
    serviceType: 'currency' | 'coin';
    currencyType?: 'USD' | 'EUR' | 'GBP';
    status: 'confirmed' | 'cancelled' | 'completed';
    notes?: string;
}

export interface AdminTransaction {
    id: number;
    date: string;
    description: string;
    categoryKey: string;
    amount: number;
    type: 'income' | 'expense';
    referenceId: string;
}

export interface ProfitAndLossReportData {
    revenue: {
        flightSales: number;
        hotelSales: number;
        total: number;
    };
    expenses: {
        marketing: number;
        salaries: number;
        total: number;
    };
    netIncome: number;
}

export interface BalanceSheetReportData {
    assets: {
        cash: number;
        accountsReceivable: number;
        total: number;
    };
    liabilities: {
        accountsPayable: number;
        total: number;
    };
    equity: {
        ownerEquity: number;
        total: number;
    };
}

export interface AdminBillPayment {
    id: number;
    transactionId: string;
    customerName: string;
    date: string;
    details: BillDetails;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
}

export interface AdminTopUpPurchase {
    id: number;
    transactionId: string;
    customerName: string;
    date: string;
    details: TopUpDetails;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
}

export interface AdminZhavOrder {
    id: number;
    orderId: string;
    customerName: string;
    orderDate: string;
    totalPrice: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    shippingInfo: {
        fullName: string;
        address: string;
        phone: string;
    };
    items: ZhavProduct[];
    trackingNumber?: string;
    notes?: string;
}

export interface AdminTrainBooking {
    id: number;
    bookingId: string;
    train: Train;
    passengers: AdminPassenger[];
    totalPrice: number;
    status: 'confirmed' | 'cancelled' | 'pending';
    contactEmail: string;
    contactPhone: string;
    notes?: string;
    history?: {
        date: string;
        status: string;
        notes: string;
    }[];
}

export interface AdminDonation {
    id: number;
    transactionId: string;
    donorName: string;
    date: string;
    project: {
        titleKey: string;
    };
    amount: number; // in Toman
    status: 'successful' | 'failed';
    notes?: string;
}

export interface AdminHealthAppointment {
    id: number;
    ref: string;
    patientName: string;
    contactPhone: string;
    contactEmail: string;
    treatmentKey: string;
    date: string;
    time: string;
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
}

export interface AdminUser {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    registrationDate: string;
    status: 'active' | 'suspended' | 'pending';
    avatarUrl?: string;
    notes?: string;
    permissions: Record<string, boolean>;
}

export interface RevenueDataPoint {
    day: string;
    revenue: number;
}

export interface SalesDistributionDataPoint {
    service: string;
    value: number;
    color: string;
}