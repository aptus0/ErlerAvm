import { NextResponse } from "next/server";

type OrderRecord = {
  id: string;
  customerName: string;
  total: number;
  status: "new" | "processing" | "shipped";
  createdAt: string;
};

const orders: OrderRecord[] = [
  {
    id: "ORD-1021",
    customerName: "Ayse Demir",
    total: 6399,
    status: "processing",
    createdAt: "2026-02-23T10:24:00.000Z",
  },
  {
    id: "ORD-1020",
    customerName: "Mehmet Kaya",
    total: 1999,
    status: "shipped",
    createdAt: "2026-02-22T15:18:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({
    items: orders,
    count: orders.length,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        customerName?: string;
        total?: number;
      }
    | null;

  if (!body?.customerName || typeof body.total !== "number") {
    return NextResponse.json(
      {
        message: "Eksik siparis bilgisi.",
      },
      {
        status: 400,
      },
    );
  }

  const newOrder: OrderRecord = {
    id: `ORD-${1022 + orders.length}`,
    customerName: body.customerName,
    total: body.total,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);

  return NextResponse.json(
    {
      item: newOrder,
    },
    {
      status: 201,
    },
  );
}
