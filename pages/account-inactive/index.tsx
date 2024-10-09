import Link from "next/link";

const AccountInactive = () => {
  return (
    <div className="flex h-screen flex-col justify-center gap-y-2 text-center">
      <h1 className="text-2xl font-extrabold">
        Your account has been inactivated
      </h1>
      <p className="font-medium text-brand-grey">
        It seems that your account is currently kept inactive. We will contact
        you once it is active.
      </p>
      <Link className="mt-20 font-medium text-link" href={"/"}>
        Go to Home
      </Link>
    </div>
  );
};

export default AccountInactive;
