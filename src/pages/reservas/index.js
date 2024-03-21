import { withAuth } from '@/utils/withAuth';
import ReservasPage from './reservation';

function ReservationsPage() {
    return <ReservasPage/>
}

export default withAuth(ReservationsPage);
