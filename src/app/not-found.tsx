export default function NotFoundPage() {
  return (
    <main className='flex h-screen items-center justify-center bg-primary'>
      <div className='flex flex-col rounded-md border border-secondary p-4 text-secondary'>
        <h2 className='border-b text-center text-4xl font-bold'>404</h2>
        <span className='pt-2 text-secondary'>
          This page could not be found.
        </span>
      </div>
    </main>
  );
}
