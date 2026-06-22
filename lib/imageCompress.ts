// Phone photos are often 3–10 MB, over the serverless upload limit and wasteful
// on storage. Resize + compress in the browser first: max 1600px on the long
// edge, JPEG ~82%. Runs only in the browser (uses canvas/FileReader/Image).
export async function compressImage(file: File): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!file.type.startsWith("image/")) return file;

  const dataUrl: string = await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result as string);
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const im = new Image();
    im.onload = () => resolve(im);
    im.onerror = reject;
    im.src = dataUrl;
  });

  const MAX = 1600;
  let { width, height } = img;
  if (width > MAX || height > MAX) {
    if (width >= height) { height = Math.round((height * MAX) / width); width = MAX; }
    else { width = Math.round((width * MAX) / height); height = MAX; }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(img, 0, 0, width, height);

  const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
  if (!blob) return file;
  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}
