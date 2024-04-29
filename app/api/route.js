import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModel";

const { NextResponse } = require("next/server");

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const todos = await TodoModel.find({});

  return NextResponse.json({ todos: todos });
}
export async function POST(request) {
  const { title, discription } = await request.json();
  await TodoModel.create({
    title,
    discription,
  });
  return NextResponse.json({ msg: "Todo Created" });
}
export async function DELETE(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndDelete(mongoId);

  return NextResponse.json({ msg: "Todo Deleted" });
}
export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get("mongoId");
  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });

  return NextResponse.json({ msg: "Todo Completed" });
}
