import SignInFormByCredentials from "features/authentication/comps/auth/sign_in_form_by_credentials";
import SignFormByServices from "features/authentication/comps/auth/sign_form_by_services";
import VerticalSplitter from "features/authentication/comps/auth/vertical_splitter";

//todo make redisign
const toggle = () => {};
const toggleSignUpModal = () => {};
const SignIn = () => {
  //todo check if session, redirect if it is
  return (
    <div className="w-50 h-50">
      <SignInFormByCredentials
        toggleModal={toggle}
        toggleSignUpModal={toggleSignUpModal}
      />

      <VerticalSplitter />

      <SignFormByServices />
    </div>
  );
};

export default SignIn;
