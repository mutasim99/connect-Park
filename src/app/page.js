
import OverviewComponents from "./components/Dashboard/AdminMenuComponents/OverviewComponents";
import Banner from "./components/Home/Banner";
import Features from "./components/Home/Features";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Features></Features>
      <section className="mt-16">
        <OverviewComponents></OverviewComponents>
      </section>
    </div>
  );
}
