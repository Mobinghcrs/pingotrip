

import React, { createContext, useState, ReactNode, FC } from 'react';
// FIX: Correct import path
import { BookingContextType, Flight, Hotel, Passenger, Train, TaxiRide, Car, CIPService, VisaService, VisaApplication, InsurancePlan, CurrencyPurchase, CurrencyDeposit, MedicalAppointment, HealthFlowState, TaxiFlowState, CurrencyDelivery, ForeignPurchase, SeatInfo, GiftCardPurchase, BillDetails, TopUpDetails } from '../types';

export const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedRide, setSelectedRide] = useState<TaxiRide | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [selectedCIP, setSelectedCIP] = useState<CIPService | null>(null);
  const [selectedVisa, setSelectedVisa] = useState<VisaService | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<InsurancePlan | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<MedicalAppointment | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<SeatInfo | null>(null);
  const [selectedBill, setSelectedBill] = useState<BillDetails | null>(null);
  const [selectedTopUp, setSelectedTopUp] = useState<TopUpDetails | null>(null);
  const [healthFlowState, setHealthFlowState] = useState<HealthFlowState | null>(null);
  const [taxiFlowState, setTaxiFlowState] = useState<TaxiFlowState | null>(null);
  const [visaApplication, setVisaApplication] = useState<VisaApplication | null>(null);
  const [currencyPurchase, setCurrencyPurchase] = useState<CurrencyPurchase | null>(null);
  const [currencyDeposit, setCurrencyDeposit] = useState<CurrencyDeposit | null>(null);
  const [currencyDelivery, setCurrencyDelivery] = useState<CurrencyDelivery | null>(null);
  const [foreignPurchase, setForeignPurchase] = useState<ForeignPurchase | null>(null);
  const [giftCardPurchase, setGiftCardPurchase] = useState<GiftCardPurchase | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);

  const clearBookingData = () => {
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedTrain(null);
    setSelectedRide(null);
    setSelectedCar(null);
    setSelectedCIP(null);
    setSelectedVisa(null);
    setSelectedInsurance(null);
    setSelectedAppointment(null);
    setSelectedSeat(null);
    setSelectedBill(null);
    setSelectedTopUp(null);
    setHealthFlowState(null);
    setTaxiFlowState(null);
    setVisaApplication(null);
    setCurrencyPurchase(null);
    setCurrencyDeposit(null);
    setCurrencyDelivery(null);
    setForeignPurchase(null);
    setGiftCardPurchase(null);
    setPassengers([]);
  }

  const startHealthFlow = (data: HealthFlowState) => {
    clearBookingData();
    setHealthFlowState(data);
  };

  const startTaxiFlow = (data: TaxiFlowState) => {
    clearBookingData();
    setTaxiFlowState(data);
  };

  const selectFlight = (flight: Flight) => {
      clearBookingData();
      setSelectedFlight(flight);
  };
  const selectHotel = (hotel: Hotel) => setSelectedHotel(hotel);
  const selectTrain = (train: Train) => setSelectedTrain(train);
  const selectRide = (ride: TaxiRide) => setSelectedRide(ride);
  const selectCar = (car: Car) => setSelectedCar(car);
  const selectCIP = (cip: CIPService) => setSelectedCIP(cip);
  const selectVisa = (visa: VisaService) => setSelectedVisa(visa);
  const selectInsurance = (plan: InsurancePlan) => setSelectedInsurance(plan);
  const selectAppointment = (appointment: MedicalAppointment) => setSelectedAppointment(appointment);
  const updateSeatSelection = (seat: SeatInfo | null) => setSelectedSeat(seat);
  
  const selectBill = (bill: BillDetails) => {
    clearBookingData();
    setSelectedBill(bill);
  };
  
  const selectTopUp = (topup: TopUpDetails) => {
    clearBookingData();
    setSelectedTopUp(topup);
  };

  const updateVisaApplication = (application: VisaApplication) => setVisaApplication(application);

  const updateCurrencyPurchase = (purchase: CurrencyPurchase) => {
    clearBookingData();
    setCurrencyPurchase(purchase);
  };

  const updateCurrencyDeposit = (deposit: CurrencyDeposit) => {
    clearBookingData();
    setCurrencyDeposit(deposit);
  };

  const updateCurrencyDelivery = (delivery: CurrencyDelivery) => {
    clearBookingData();
    setCurrencyDelivery(delivery);
  };

  const updateForeignPurchase = (purchase: ForeignPurchase) => {
    clearBookingData();
    setForeignPurchase(purchase);
  };
  
  const updateGiftCardPurchase = (purchase: GiftCardPurchase) => {
    clearBookingData();
    setGiftCardPurchase(purchase);
  };

  const updatePassengers = (passengersData: Passenger[]) => {
    setPassengers(passengersData);
  };
  
  const clearBooking = () => {
    clearBookingData();
  };

  return (
    <BookingContext.Provider value={{ 
        selectedFlight, selectedHotel, selectedTrain, selectedRide, selectedCar, selectedCIP, selectedVisa, selectedInsurance,
        selectedAppointment, selectedSeat, selectedBill, selectedTopUp, healthFlowState, taxiFlowState, passengers, visaApplication, currencyPurchase, currencyDeposit, 
        currencyDelivery, foreignPurchase, giftCardPurchase,
        startHealthFlow, startTaxiFlow, selectFlight, selectHotel, selectTrain, selectRide, selectCar, selectCIP, selectVisa, selectInsurance, selectAppointment, updateSeatSelection,
        selectBill, selectTopUp, updatePassengers, updateVisaApplication, updateCurrencyPurchase, updateCurrencyDeposit, updateCurrencyDelivery, updateForeignPurchase, updateGiftCardPurchase, clearBooking 
    }}>
      {children}
    </BookingContext.Provider>
  );
};