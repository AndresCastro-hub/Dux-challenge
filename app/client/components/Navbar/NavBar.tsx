
import { Button } from 'primereact/button';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="primary h-3rem p-2 flex align-items-center justify-content-between" style={{margin:0, padding:0}}>
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <Button icon="pi pi-cog" />
    </nav>
  );
}
