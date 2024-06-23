import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleInput(e) {
    console.log(e);
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
    console.log("Email:", userData.email);
    // console.log('Password:', userData.password);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", userData.email);
    console.log("Password:", userData.password);
// PROMENI OVO
    axios.post("http://127.0.0.1:8000/api/register", userData).then((res) => {
      console.log(res.data);
      if(res.data.success === true) {
        window.sessionStorage.setItem("auth_token", res.data.access_token);
      }
    }).catch((e)=>{
      console.log(e);
    });
  };
  return (
    <section
      class="vh-100 bg-image"
      style={{
        backgroundImage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form3Example1cg">
                        Your Name
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        name="email"
                        onChange={handleInput}
                      />
                      <label className="form-label" for="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        name="password"
                        onChange={handleInput}
                      />
                      <label className="form-label" for="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="form3Example4cdg">
                        Repeat your password
                      </label>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label className="form-check-label" for="form2Example3g">
                        I agree all statements in{" "}
                        <a href="#!" className="text-body">
                          <u>Terms of service</u>
                        </a>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                      >
                        Register
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <a href="#!" class="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
