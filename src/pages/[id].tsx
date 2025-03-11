import GifFrameScreen from "@/components/GifFrameScreen";
import PngFrameScreen from "@/components/PngFrameScreen";
import FaceFrameScreen from "@/components/FaceFrameScreen";
import { imagesData } from "@/data/images";

const ArPhotoFramePage = ({ fileUrl, width, height, type }: ArPhotoFramePageProps) => {
  return type === "png" ? (
    <PngFrameScreen fileUrl={fileUrl} width={width} height={height} />
  ) : (
    type === "gif" ? (
      <GifFrameScreen fileUrl={fileUrl} width={width} height={height} />
    ) : (
      <FaceFrameScreen fileUrl={fileUrl} width={width} height={height} />
    )
  );
};

export async function getStaticPaths() {
  return {
    paths: imagesData.map((imageData) => ({
      params: { id: imageData.id }
    })),
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  if (!params?.id) return { notFound: true };

  const imageData = imagesData.find((image) => image.id === params.id);
  if (!imageData) return { notFound: true }

  return {
    props: { fileUrl: imageData.fileUrl, width: imageData.width, height: imageData.height, type: imageData.type },
    revalidate: 3600,
  };
};

export default ArPhotoFramePage;
