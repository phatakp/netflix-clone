import HomeBanner from "components/HomeBanner";
import BannerImg from "images/banner.jpg";
import { Banner, Layout } from "layout";

export const Home = () => {
  return (
    <Layout>
      <Banner img={BannerImg} showBanner={true}>
        <HomeBanner />
      </Banner>
    </Layout>
  );
};
