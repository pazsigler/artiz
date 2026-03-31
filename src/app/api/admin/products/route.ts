import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all products
export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

// CREATE product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description || "",
        price: parseFloat(body.price),
        mainImage: body.mainImage || null,
        images: body.images || [],
        stock: parseInt(body.stock) || 0,
        status: body.status?.toUpperCase() || "DRAFT",
        isCustomizable: body.isCustomizable || false,
        customizationType: body.customizationType || null,
        previewConfig: body.previewConfig || null,
        categoryId: body.categoryId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create product" },
      { status: 500 }
    );
  }
}

// UPDATE product
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.update({
      where: { id: body.id },
      data: {
        name: body.name,
        description: body.description || "",
        price: parseFloat(body.price),
        mainImage: body.mainImage || null,
        images: body.images || [],
        stock: parseInt(body.stock) || 0,
        status: body.status?.toUpperCase() || "DRAFT",
        isCustomizable: body.isCustomizable || false,
        customizationType: body.customizationType || null,
        previewConfig: body.previewConfig || null,
        categoryId: body.categoryId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE product
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete product" },
      { status: 500 }
    );
  }
}
