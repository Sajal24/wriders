import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../prisma/prisma";
import { ResponseType } from "../../interfaces";

type request_type = {
  name: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET": {
      return getAllUsers(req, res);
    }
    case "POST": {
      return addUser(req, res);
    }
  }
}

async function addUser(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, name }: request_type = req.body;
  await prisma.user
    .create({
      data: {
        email,
        name,
      },
    })
    .then((data) => {
      res
        .status(200)
        .json({ data: data, success: true, message: "User is created" });
    })
    .catch((e) => {
      res.status(400).json({
        data: e.message,
        success: false,
        message: "Something went wrong",
      });
    });
}

async function getAllUsers(req: NextApiRequest, res: NextApiResponse) {
  await prisma.user
    .findMany()
    .then((data) => {
      res
        .status(200)
        .json({ data: data, success: true, message: "All users data" });
    })
    .catch((e) => {
      res.status(400).json({
        data: e.message,
        success: false,
        message: "Something went wrong",
      });
    });
}
