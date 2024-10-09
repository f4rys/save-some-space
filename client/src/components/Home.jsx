import "bootstrap/dist/css/bootstrap.min.css";
import scissors1 from "../assets/scissors1.png";
import qr from "../assets/qr.png";
import clock from "../assets/clock.png";
import note from "../assets/note.png";

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
        <div className="col center-vertically">
          <div>
            <div className="tenor-sans-regular">URL SHORTENER</div>
            <div className="my-4">
              <input
                className="url-input px-3 py-2"
                type="text"
                placeholder="https://www.example.com/"
              ></input>
            </div>
            <div className="ms-2">
            <div className="d-flex align-items-center mb-2">
                <img className="settings-icon me-2" src={note}></img>
                <div className="assistant-semibold body-font">savesome.space/</div>
                <input
                  className="settings-input custom-url-input ms-2 px-3"
                  type="text"
                  placeholder=""
                ></input>
              </div>
              <div className="d-flex align-items-center mb-2">
                <img className="settings-icon me-2" src={clock}></img>
                <div className="assistant-semibold body-font">
                  Expires in (days):
                </div>
                <input
                  className="settings-input expiry-input ms-2 px-3"
                  type="text"
                  placeholder="7"
                ></input>
              </div>
              <div className="d-flex align-items-center mb-2 align-self-center">
                <img className="settings-icon me-2" src={qr}></img>
                <div className="assistant-semibold body-font me-2">QR Code</div>
                <input type="checkbox" className="checkbox" />
              </div>
            </div>
            <button className="shorten-button assistant-semibold mt-3">
              SHORTEN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;