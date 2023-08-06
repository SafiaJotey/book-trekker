import AppDownload from '@/components/AppDownload';
import Category from '@/components/Category';
import Faq from '@/components/Faq';
import Attraction from '../components/Attraction';
import Banner from '../components/Banner';
import RecentlyAdded from '../components/RecentlyAdded';

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Attraction></Attraction>
      <RecentlyAdded></RecentlyAdded>
      <AppDownload></AppDownload>
      <Category></Category>

      <Faq></Faq>
    </div>
  );
}
