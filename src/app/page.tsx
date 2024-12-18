import { Box } from '~/components/Box';
import { TestData } from '~/test-data';

export default async function Home() {
  const getData = async () => {
    const data = [...TestData];

    setTimeout(() => {
      console.log('mem');
    }, 10000);
    return data;
  };

  const data = await getData();

  return (
    <main className='flex h-screen w-full flex-col items-center bg-red-200'>
      <div className='h-full w-full p-4'>
        <Box />
      </div>
    </main>
  );
}
