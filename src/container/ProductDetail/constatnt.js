import {
  reception,
  security,
  checkInOut,
  capturePhoto,
  videoCarousel1,
  videoCarousel2,
  videoCarousel3,
  videoCarousel4,
  videoCarousel5,
} from "components/Images";

const FeaturesData = [
  { heading: "Receptionist Login", img: reception },
  { heading: "Security Login", img: security },
  { heading: " Self Check In/Out", img: checkInOut },
  { heading: "Capture Photo", img: capturePhoto },
  { heading: "Receptionist Login", img: capturePhoto },
  { heading: "Security Login", img: security },
  { heading: " Self Check In/Out", img: checkInOut },
  { heading: "Capture Photo", img: capturePhoto },
];
const MonthlyData = [
  {
    heading: "Silver",
    amount: " 499",
    amount2: "1433",
    li_1: "300 Invitees/month",
    li_2: "20 No.Of Employees",
    li_3: "Tickets",
  },
  {
    heading: " Gold",
    amount: "1499",
    amount2: "1433",
    li_1: "500 Invitees/month",
    li_2: "50 No.Of Employees",
    li_3: "Tickets",
    li_4: "Emails",
    li_5: "Chat(9 AM To 9 PM)",
  },
  {
    heading: "Platinum",
    amount: "2499",
    amount2: "1439",
    li_1: "1200 Invitees/month",
    li_2: "1200 No.Of Employees",
    li_3: "Tickets",
    li_4: "Emails",
    li_5: "Chat(24*7)",
  },
];

const CarouselData = [
  videoCarousel1,
  videoCarousel2,
  videoCarousel3,
  videoCarousel4,
  videoCarousel5,
];
export { FeaturesData, MonthlyData, CarouselData };
