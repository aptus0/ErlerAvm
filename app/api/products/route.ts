import { NextResponse } from "next/server";

import { PRODUCTS } from "@/lib/constants";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const items = category
    ? PRODUCTS.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    : PRODUCTS;

  return NextResponse.json({
    items,
    count: items.length,
  });
}
