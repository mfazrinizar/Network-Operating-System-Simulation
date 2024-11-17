"use client";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import configJson from "../config.json";
import { ToastErrorMessage, ToastSuccessMessage } from "@/utils/ToastGenerator";
import { useRouter } from "next/navigation";
import ReactLoading from 'react-loading';


function NewUserPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  type Inputs = {
    name: string;
    username: string;
    password: string;
    date: string;
    country: string;
    city: string;
    email: string;
    role: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.role = "user";
    setLoading(true);
    axios
      .post(`${configJson.localApi}/user`, data)
      .then((res) => {
        if (res.status === 200) {
          ToastSuccessMessage(res.data.message);
          setTimeout(() => {
            router.push("/");
          }, 3000);
        }
      })
      .catch((err) => {
        ToastErrorMessage(err + " Error happened. Maybe username or email is duplicate...");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <main className={`flex min-h-screen flex-col items-center p-4`}>
      {loading ? (
        <>
          <ReactLoading type={"bars"} color={"red"} height={200} width={200} className="flex flex-row min-h-screen justify-center items-center" />
        </>
      ) : (
        <>
          <div className="w-full max-w-xs">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className={`shadow appearance-none border ${
                    errors.username && "border-red-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="username"
                  type="text"
                  placeholder="Username"
                  {...register("username", { required: true, min: 3 })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a username.
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className={`shadow appearance-none border ${
                    errors.email && "border-red-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a email.
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className={`shadow appearance-none border ${
                    errors.name && "border-red-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a name.
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className={`shadow appearance-none border ${
                    errors.city && "border-red-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="city"
                  type="text"
                  placeholder="City"
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a city.
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className={`shadow appearance-none border ${
                    errors.country && "border-red-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="country"
                  type="text"
                  placeholder="Country"
                  {...register("country", { required: true })}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a country.
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <input
                  className={`shadow appearance-none border ${
                    errors.date && "border-red-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="date"
                  type="date"
                  placeholder="Date"
                  {...register("date", { required: true })}
                />
                {errors.date && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a date.
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`shadow appearance-none border ${
                    errors.password && "border-red-500"
                  } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                  id="password"
                  type="password"
                  placeholder="******************"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    Please choose a password.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              &copy;2024 M. Fazri Nizar. All rights reserved.
            </p>
          </div>
        </>
      )}
    </main>
  );
}

export default NewUserPage;
