import Navbar from './_components/Navbar';

const ProtectedLayout = async ({ children }) => {
  return (
    <div className='min-h-screen p-10 flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400  to-blue-800'>
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
