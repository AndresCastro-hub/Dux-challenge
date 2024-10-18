import Filters from './client/pages/User/Filters/Filters';
import Table from './client/pages/User/Table/Table';
import Usuarios from './client/pages/User/Usuarios';
import './global.css'

export default function Home() {
  return (
    <>
        <div className="sm:col-10 md:col-10">
          <Usuarios />
          <Filters/>
          <Table/>
        </div>
    </>
  );
}
