import betaDog from "../assets/under-constr-doggie.png";

function BetaDog() {
  return (
    <div
      style={{
        backgroundColor: "#c3a8bf",
        borderRadius: "16px",
        padding: "24px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={betaDog}
        alt="Under construction dog"
        style={{
          maxWidth: "200px",
          height: "auto",
        }}
      />
      <div
        style={{
          marginTop: "12px",
          fontWeight: "600",
        }}
      >
        Under construction!
      </div>
    </div>
  );
}

export default BetaDog;
