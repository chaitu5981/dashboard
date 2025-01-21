import { useState } from "react";

const Modal = ({ setShowModal, loadData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "inactive",
    referenceId: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/partners/create", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //   const data = await res.json();
      if (res.status === 201) setShowModal(false);
      loadData();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleClick = (e) => {
    if (e.target.classList.contains("container")) setShowModal(false);
  };
  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center container"
    >
      <div className="overflow-y-auto max-h-[80vh]">
        <div className="w-[20rem] md:w-[30rem] rounded-lg">
          <div className="bg-[#043b64] text-white w-full py-2 text-center">
            Add Partner
          </div>
          <form
            action=""
            className="bg-white flex flex-col w-full p-3 gap-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border-2 border-gray-300 rounded p-1 outline-none "
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded p-1 outline-none "
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded p-1 outline-none "
            />
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              onChange={handleChange}
              className="border-2 border-gray-300 rounded p-1 outline-none"
              value={formData.status}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <label htmlFor="referenceId">Reference Id</label>
            <input
              type="text"
              name="referenceId"
              id="referenceId"
              value={formData.referenceId}
              onChange={handleChange}
              className="border-2 border-gray-300 rounded p-1 outline-none "
            />
            <button className="bg-[#043b64] text-white mx-auto rounded px-3 py-1">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Modal;
