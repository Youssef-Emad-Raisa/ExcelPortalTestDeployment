import React from "react";
import { useUser } from "../../../contexts/UserContext";
import { APP_NS, FORM_NS } from "..";
import { Field, Input } from "@fluentui/react-components";
import Button from "../common/Button";
import "./AuthenticationForm.scss";
// @ts-ignore
import raisaLogo from "../../../../assets/icon-filled.png";
const AuthenticaitonForm = () => {
  const app = APP_NS.app;
  const formContainer = FORM_NS.form;
  const { setUser } = useUser();
  const [showOTPForm, setShowOTPFOrm] = React.useState(false);
  const digits = 6;
  const refs = React.useRef(new Array(digits).fill("").map((_) => React.useRef<HTMLInputElement>()));
  React.useEffect(() => {
    if (showOTPForm) refs.current[0].current.focus();
  }, [showOTPForm]);
  const [otp, setOTP] = React.useState(new Array(digits).fill(""));
  const handleEmailFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOTPFOrm(true);
  };
  const handleOTPPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Prevent the default paste action
    e.preventDefault();
    // Get the pasted content from the clipboard
    const clipboardData = e.clipboardData;
    const pastedText = clipboardData.getData("text");
    if (isNaN(Number(pastedText.trim()))) return;
    const newOTP = [...otp].map((digit, index) => {
      if (index < pastedText.length) return pastedText[index];
      return digit;
    });
    setOTP(newOTP);
  };
  const handleOTPFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("") === "123456") setUser({ name: "Youssef Emad", email: "yemad@raisaenergy.com" });
  };
  const emailForm = (
    <form className={formContainer.$} onSubmit={handleEmailFormSubmit}>
      <Field label="Email">
        <Input type="email" placeholder="Enter your email" />
      </Field>
      <Button type="submit">Log in</Button>
    </form>
  );
  const OTPForm = (
    <form className={formContainer.$} onSubmit={handleOTPFormSubmit}>
      <Field label={`${digits}-digits OTP`}>
        <div className={APP_NS.otpContainer.$}>
          {otp.map((digit, index) => (
            <Input
              ref={refs.current[index]}
              onPaste={handleOTPPaste}
              key={`${index}`}
              className={APP_NS.otpContainer.box.$}
              value={digit}
              onChange={(e) => {
                const newOTP = [...otp];
                if (isNaN(Number(e.target.value))) return;
                newOTP[index] = e.target.value.replace(otp[index], "")[0];
                if (index < digits - 1 && e.target.value !== "") refs.current[index + 1]?.current.focus();
                setOTP(newOTP);
              }}
            />
          ))}
        </div>
      </Field>
      <Button type="submit">Verify</Button>
    </form>
  );
  return (
    <main className={app.$}>
      <h1>Hello World</h1>
      <section>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <img src={raisaLogo} alt="raisa logo" />
        </div>
        {showOTPForm ? OTPForm : emailForm}
      </section>
    </main>
  );
};

export default AuthenticaitonForm;
