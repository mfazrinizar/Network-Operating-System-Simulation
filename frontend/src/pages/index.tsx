"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import configJson from "../config.json";
import Link from "next/link";

export default function Home() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token")?.trim().replace(/"/g, "");

    axios
      .get(`${configJson.localApi}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        // console.log(token);
        console.log(err + " error happened...");
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="mb-3">All Users (Admin Only)</h1>

      <div className="w-full">
        <Link
          className="bg-blue-500 flex text-white font-bold flex-row p-3 mt-2 mb-2 rounded-lg w-40 text-center justify-center"
          href="/new"
          passHref
        >
          Add User
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2">
        {users?.data?.items?.map((item: any) => (
          <li
            key={item.id}
            className="w-full mx-auto p-10 bg-blue-500 text-white rounded-md"
          >
            <div>Name: {item.name}</div>
            <div>Username: {item.username}</div>
            <div>Email: {item.email}</div>
          </li>
        ))}
      </div>
    </main>
  );
}
