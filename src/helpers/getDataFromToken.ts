import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

type TypeDecodedToken = {
  id: string;
};

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token.length) throw new Error("No token available");
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as
      | JwtPayload
      | TypeDecodedToken;

    if ("id" in decodedToken) {
      const { id } = decodedToken;
      return id;
    } else {
      throw new Error("No 'id' property in the decoded token.");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
