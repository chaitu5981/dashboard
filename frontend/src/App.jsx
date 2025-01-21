import { MdLogout } from "react-icons/md";
import logo from "./assets/logo.png";
import { useEffect, useState } from "react";
const App = () => {
  const tabs = [
    "Dashboard",
    "Business partners",
    "Business promoters",
    "New requests",
    "Invoice",
    "Renewal",
    <div className="flex items-center gap-2">
      <MdLogout />
      <span>Logout</span>
    </div>,
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const [fieldData, setFieldData] = useState();
  const loadData = async (parameter) => {
    if (parameter === "Business partners") {
      try {
        const res = await fetch("https://dashboard-2ptj.onrender.com/partners");
        const data = await res.json();
        setFieldData(data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    loadData(tabs[tabIndex]);
  }, [tabIndex]);
  return (
    <div className="flex flex-col md:flex-row bg-[#043b64] min-h-screen  py-3">
      <div className="menu w-full md:w-[25%] flex flex-col gap-32 h-full text-white">
        <img src={logo} alt="" className="w-[10rem] ml-10" />
        <div className="flex md:flex-col  md:border-t-2 border-white font-bold">
          {tabs.map((t, i) => (
            <div
              key={i}
              className="px-[5px] md:py-[5px] md:px-0 md:border-b-2 md:border-r-0 border-r-2 border-white cursor-pointer"
            >
              <div
                onClick={() => {
                  setTabIndex(i);
                }}
                className={`p-2  ${
                  tabIndex === i && "bg-white text-[#043b64]"
                }`}
              >
                {t}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:w-[75%] min-h-screen bg-white rounded-lg py-16 px-8 ">
        <p className="text-3xl font-bold">Dashboard</p>
        {tabs[tabIndex] === "Business partners" && (
          <div className="mt-20">
            <p className="text-2xl font-bold">Give Help</p>
            <div className="bg-[#f6f6f6] py-4 rounded-md mt-10 drop-shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="flex justify-around py-2">
                    <th>Name</th>
                    <th>Status</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Reference Id</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {fieldData?.length > 0 &&
                    fieldData?.map((d, i) => (
                      <tr
                        key={i}
                        className="flex justify-around border-t-2 border-gray-300 py-2"
                      >
                        <td>{d.name}</td>
                        <td>{d.status}</td>
                        <td>{d.email}</td>
                        <td>{d.phone}</td>
                        <td>{d.referenceId}</td>
                        <td>
                          <button className="bg-[#043b64] text-white rounded-md px-2 py-1">
                            Paid
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
