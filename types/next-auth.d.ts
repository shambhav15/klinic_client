type User = {
  id: string;
  name: string;
  phone: string;
  isAdmin: boolean;
};

type Hospital = {
  id: string;
  name: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  phone: string[];
  email: string;
  image: string;

  reviews: string[];
  noOfDoctors: number;
  specialties: string[];
  insuranceAccepted: string[];
  facilities: string[];

  paymentMethods: string[];
  appointmentAvailability: boolean;
  operatingHours: string;

  accessibilityFeatures: string[];
  emergencyContacts: string[];

  servicesOffered: string[];
};
