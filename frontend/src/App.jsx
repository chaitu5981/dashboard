import { MdLogout } from "react-icons/md";
import logo from "./assets/logo.png";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
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
  const [showModal, setShowModal] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch("https://dashboard-2ptj.onrender.com/partners");
      // const res = await fetch("http://localhost:3000/partners");
      const data = await res.json();
      setFieldData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // const res = await fetch("http://localhost:3000/partners/" + id, {
      //   method: "delete",
      // });
      const res = await fetch(
        "https://dashboard-2ptj.onrender.com/partners/" + id
      );
      if (res.status === 200) loadData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, [tabIndex]);
  return (
    <div className="flex flex-col md:flex-row bg-[#043b64] min-h-screen  py-3">
      <div className="w-full md:w-[25%] flex flex-col gap-32 h-full text-white">
        <img src={logo} alt="" className="w-[10rem] ml-10" />
        <div className="flex md:flex-col  md:border-t-2 border-white font-bold overflow-x-auto">
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
          <div className="mt-20 w-full">
            <div className="flex w-full justify-between">
              <p className="text-2xl font-bold">Give Help</p>
              <button
                className="bg-[#043b64] text-white rounded-md px-2 py-1"
                onClick={() => setShowModal(true)}
              >
                Add Partner
              </button>
            </div>
            <div className="bg-[#f6f6f6] py-4 px-2 rounded-md mt-10 drop-shadow-lg w-full overflow-x-auto">
              <div className="w-full ">
                <div className="flex justify-between  py-2 font-bold">
                  <div className="flex-1 text-center">Name</div>
                  <div className="flex-1 text-center">Status</div>
                  <div className="flex-1 text-center">Email</div>
                  <div className="flex-1 text-center">Phone</div>
                  <div className="flex-1 text-center">Reference Id</div>
                  <div className="w-[8rem]"></div>
                </div>
                {fieldData?.length > 0 &&
                  fieldData?.map((d, i) => (
                    <tr
                      key={i}
                      className="flex justify-between border-t-2 gap-2 border-gray-300 py-2"
                    >
                      <div className="flex-1 text-center">{d.name}</div>
                      <div className="flex-1 text-center">{d.status}</div>
                      <div className="flex-1 text-center">{d.email}</div>
                      <div className="flex-1 text-center">{d.phone}</div>
                      <div className="flex-1 text-center">{d.referenceId}</div>
                      <div className="flex gap-2">
                        <div>
                          <button
                            className="bg-red-500 rounded px-2 py-1 text-white"
                            onClick={() => handleDelete(d.id)}
                          >
                            Delete
                          </button>
                        </div>
                        <div>
                          <button className="bg-[#043b64] text-white rounded-md px-2 py-1">
                            Paid
                          </button>
                        </div>
                      </div>
                    </tr>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && <Modal setShowModal={setShowModal} loadData={loadData} />}
    </div>
  );
};
export default App;
