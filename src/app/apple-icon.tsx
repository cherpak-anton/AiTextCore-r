import { ImageResponse } from "next/og";

// apple-touch-icon: iOS не подхватывает SVG для этой конвенции (в отличие от
// icon.svg — обычного favicon), поэтому рендерим растровую версию через тот
// же ImageResponse, что и opengraph-image.tsx.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18191a",
          fontSize: 120,
        }}
      >
        📚
      </div>
    ),
    { ...size },
  );
}
