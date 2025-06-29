import Header from '~/components/header';
import Footer from '~/components/footer';
import StockChartWrapper from '~/components/stock-chart-wrapper';

export default async function Home() {
  return (
    <main className='w-full bg-primary text-secondary'>
      <Header />
      <StockChartWrapper />
      <Footer />
    </main>
  );
}
