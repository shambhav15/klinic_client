declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

type Doctors = {
  id: string;
  name: string;
};

type Appointment = {
  _id: string; 
  hospital: string;
  userId: string;

  phone: string;
  doctor: string;
  schedule: string;
  reason: string;
  paid: boolean;
};

type User = {
  _id: string; 
  name: string;
  appointments: string[];
  image?: string;
  phone: string;
  isAdmin?: boolean;
};

// Define the Hospital type
type Hospital = {
  _id: string; 
  name: string;
  city: string;
  state: string;
  pincode: string;
  address: string;
  phone: string[];
  email: string;
  image: string;
  appointments: string[];
  users?: string[];
  doctors: string[];
  insuranceAccepted: string[];
  languagesSpoken: string[];
  facilities: string[];
  paymentMethods: string[];
  appointmentAvailability: boolean;
  operatingHours: string;
  accessibilityFeatures: string[];
  emergencyContact: string[];
  virtualTourLink: string;
  servicesOffered: string[];
  specialties: string[];
  accreditations: string[];
  reviews: string[];
};

type AppointmentBody = {
  phone: string;
  hospital: string;
  doctor: string;
  schedule: any;
  reason: string;
  paid: boolean;
  userId: string;
};
