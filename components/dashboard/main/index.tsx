import { ReinvestModal } from '@/components/modal/Reinvest';
import { Button } from '@/components/ui/button';
import { useInvestment } from '@/hooks/useInvestment';
import { useInvestor } from '@/hooks/useInvestor';
import { upperFirstLetter } from '@/utils/helpers';
import React from 'react';
import UserInvestmentTable from './cards/UserInvestmentTable';
import UserProfileCard from './cards/UserProfileCard';
import { UserInvestmentRow } from './interfaces';

const Dashboard = () => {
  const [userInvestmentData, setUserInvestmentData] = React.useState<
    UserInvestmentRow[]
  >([]);
  const [reinvestShow, setReinvestShow] = React.useState<boolean>(false);
  const [otpModalShow, setOtpModalShow] = React.useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = React.useState<string>('');
  const [mfaVerified, setmfaVerified] = React.useState<boolean>(false);

  const { investments } = useInvestment();
  const { investor: userData, isLoading: isUserLoading } = useInvestor();

  return (
    <div className="mx-10 mt-5">
      <div className="flex items-center justify-between">
        <div className=" text-3xl font-bold">
          Welcome, {upperFirstLetter(userData?.firstName)}{' '}
          {upperFirstLetter(userData?.lastName)}!
        </div>
        <div>
          <Button onClick={() => setReinvestShow(true)}>Reinvest</Button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-6">
        {/* Investment Table */}
        <div className="col-span-4">
          <div className="grid grid-flow-row auto-rows-max gap-5">
            {/* <RequestUploadCard /> */}
            <UserInvestmentTable tableData={investments} />
          </div>
        </div>

        {/* Traffic chart & Pie Chart */}
        <div className="col-span-2 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-1">
          <UserProfileCard userData={userData} isLoading={isUserLoading} />
          {/* <DailyTraffic />
    <PieChartCard /> */}
        </div>
      </div>
      <ReinvestModal
        isOpen={reinvestShow}
        onClose={() => setReinvestShow(false)}
        onContinue={(payment, mfaVerified) => {
          setmfaVerified(mfaVerified);
          setPaymentMethod(payment);
          setReinvestShow(false);
          setOtpModalShow(true);
        }}
      />
      {/* <OtpModal
        isOpen={otpModalShow}
        onClose={() => setOtpModalShow(false)}
        onContinue={() => setOtpModalShow(false)}
        paymentMethod={paymentMethod}
        mfaVerified={mfaVerified}
      /> */}
    </div>
  );
};

export default Dashboard;
