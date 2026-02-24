import { NextResponse } from "next/server";

import { getActiveMenuItems } from "@/lib/constants";

export async function GET() {
  const items = getActiveMenuItems();

  return NextResponse.json({
    items,
    count: items.length,
  });
}
