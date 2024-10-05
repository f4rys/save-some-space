import "bootstrap/dist/css/bootstrap.min.css";
import scissors1 from "../assets/scissors1.png";

function Home() {
  return (
    <>
      <div className="row mt-5 mx-5">
        <div className="col position-relative ms-5">
          <img className="scissors position-absolute z-3" src={scissors1}></img>
          <div className="position-absolute">
            <div className="showdex">SAVE</div>
            <div className="showdex">SOME</div>
            <div className="showdex">SPACE.</div>
          </div>
        </div>
        <div className="col"> URL SHORTENING</div>
      </div>
    </>
  );
}

export default Home;
