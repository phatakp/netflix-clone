import { SignInForm } from "components";
import { useDimensions } from "hooks/use-dimensions";
import BannerImg from "images/banner.jpg";
import { Banner, Layout } from "layout";
import { useEffect, useState } from "react";

export const SignIn = () => {
  const [showBanner, setShowBanner] = useState(true);
  const { width } = useDimensions();

  useEffect(() => {
    setShowBanner(width > 767);
  }, [width]);

  return (
    <Layout>
      <Banner img={BannerImg} showBanner={showBanner}>
        <SignInForm />
      </Banner>
    </Layout>
  );
};
