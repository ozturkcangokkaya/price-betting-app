import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const Login = () => {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId.trim() === "") {
      toast.error("User id field cannot be left blank");
      return;
    }

    router.push(`/${userId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8">
        <div>
          <h2 className="mb-4 text-left text-4xl font-extrabold text-gray-900">
            Sign In / Sign Up
          </h2>
          <p className="text-gray-700 mb-6">
            If the user ID exists in the database, you will be automatically
            logged in.
            <br />
            Otherwise, a new user will be created.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="userId" className="sr-only">
                User Id
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                autoComplete="userId"
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-lg text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
                placeholder="User Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
