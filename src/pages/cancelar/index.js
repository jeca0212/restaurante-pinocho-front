
import Layout from "@/components/Layout";
import ReservationCancel from "./[id]";


const Cancel = () => {
  const reservation = {
      firstName: 'Nombre',
      date: 'Fecha',
      id: 'ID',
  };

  return (
    <>
        <Layout>
        <ReservationCancel reservation={reservation}/>
      </Layout>
    </>
  );
}
export default Cancel;