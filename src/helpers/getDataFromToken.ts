import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

type DecodedTokenType = {
  id: string;
};

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token.length) throw new Error("No token available");
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
