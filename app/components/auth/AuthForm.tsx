import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";
import { AuthError } from "../expenses/Types";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const validationErrors = useActionData<AuthError>();

  const isSubmitting = navigation.state !== "idle";
  const authMode = searchParams.get("mode") || "login";

  const submitButtonCaption = authMode === "login" ? "Login" : "Create User";
  const toggleButtonCaption =
    authMode === "login" ? "Create a new user" : "Log in with existing user";
  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === "login" ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validationErrors && (
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? "Authenticating..." : submitButtonCaption}
        </button>
        <Link to={authMode === "login" ? "?mode=signup" : "?mode=login"}>
          {toggleButtonCaption}
        </Link>
      </div>
    </Form>
  );
}

export default AuthForm;
