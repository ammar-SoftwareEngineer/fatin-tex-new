import ProductDetails from "@/components/products/details/ProductDetails";
import { fetchProductDetailsData } from "@/api/productsService";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const productData = await fetchProductDetailsData(slug);
  console.log("productData", productData);
  return <ProductDetails productData={productData?.data} />;
}
