import AllBrands from "../pages/AllBrands";
import FlashSale from "../pages/FlashSale";
import Accessories from "./Accessories";
import Banner from "./Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <AllBrands></AllBrands>
      <FlashSale></FlashSale>
      <Accessories></Accessories>
    </div>
  );
};

export default Home;
