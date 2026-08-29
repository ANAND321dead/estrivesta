export default function LoadingSkeleton({
  width = '100%',
  height = 20,
  rounded = '8px',
}) {
  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className="shimmer"
      style={{ width: w, height: h, borderRadius: rounded }}
    />
  );
}
