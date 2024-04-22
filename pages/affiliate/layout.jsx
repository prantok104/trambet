import SideNav from "@/components/Affiliate/SideNav";

const AffiliatLayout = ({children }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
            <SideNav />
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AffiliatLayout;
