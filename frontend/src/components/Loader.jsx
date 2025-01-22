import DotLoader from "react-spinners/CircleLoader";
const Loader = ({ loading }) => {
  const override = {
    position: "absolute",
    top: "45%",
    left: "45%",
    // translateX: "-50%",
    // translateY: "-50%",
  };
  return (
    <DotLoader
      color="green"
      loading={loading}
      cssOverride={override}
      size={80}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Loader;
