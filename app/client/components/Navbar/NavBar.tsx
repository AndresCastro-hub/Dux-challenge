import { Button } from 'primereact/button';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <nav className="primary h-3rem p-2 flex align-items-center justify-content-between">
      <Image className='ml-1' priority src="/logo.png" alt="LogoApp" width={40} height={40} />
      <Button aria-label="Configuracion" icon="pi pi-cog" />
    </nav>
  );
};

export default Navbar;
