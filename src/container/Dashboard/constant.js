import {
  income,
  leads,
  monthlySale,
  activeCust,
  vizman,
  ezeo,
  eVoting,
  act,
  eAuction,
  iPing,
} from "components/Images";

const TopRowData = [
  { value: "2500", name: "Income", img: income },
  { value: "3500", name: "leads", img: leads },
  { value: "5500", name: "Monthly sale", img: monthlySale },
  { value: "25", name: "Active Customer", img: activeCust },
];
const Products = [
  { img: vizman, class: "vizShadow" },
  { img: ezeo, class: "ezShadow" },
  { img: eVoting, class: "eVShadow" },
  { img: act, class: "actShadow" },
  { img: eAuction, class: "eAuShadow" },
  { img: iPing, class: "iPShadow" },
];
const DashConst = {
  colon: ":",
  name: "Name",
  accManDetail: "Account manager details",
  contNum: "Contact Number",
  emid: "Email ID",
  refCode: "Referral Code",
  hotSellPro: "Hot Selling Product",
};
export { TopRowData, Products, DashConst };
