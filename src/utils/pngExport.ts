function loadQrImage(svg: SVGSVGElement): Promise<HTMLImageElement> {
  const copy = svg.cloneNode(true) as SVGSVGElement;
  copy.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  copy.setAttribute("width", "1024");
  copy.setAttribute("height", "1024");
  copy.setAttribute("style", "width:1024px;height:1024px;max-width:none;display:block");

  const imageUrl = URL.createObjectURL(
    new Blob([new XMLSerializer().serializeToString(copy)], {
      type: "image/svg+xml;charset=utf-8",
    }),
  );

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Could not render QR code"));
    };
    image.src = imageUrl;
  });
}

function downloadCanvas(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Could not create PNG image"));
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = filename;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, "image/png");
  });
}

function drawElementText(
  context: CanvasRenderingContext2D,
  element: HTMLElement,
  cardRect: DOMRect,
  cardOffsetX: number,
  cardOffsetY: number,
  exportText = element.textContent?.trim() || "",
) {
  const style = window.getComputedStyle(element);
  const text = style.textTransform === "uppercase"
    ? exportText.toLocaleUpperCase()
    : style.textTransform === "lowercase"
      ? exportText.toLocaleLowerCase()
      : exportText;
  if (!text) return;

  const rect = element.getBoundingClientRect();
  const fontSize = Number.parseFloat(style.fontSize) || 12;
  const lineHeight = style.lineHeight === "normal"
    ? fontSize * 1.2
    : Number.parseFloat(style.lineHeight) || fontSize * 1.2;
  const maxWidth = rect.width;
  context.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  (context as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
    element.classList.contains("brand-export-description")
      ? "0.35px"
      : element.classList.contains("brand-export-qrid")
        ? "0px"
        : style.letterSpacing;
  context.fillStyle = style.color;
  context.textBaseline = "middle";
  context.textAlign = style.textAlign === "center"
    ? "center"
    : style.textAlign === "right" || style.textAlign === "end"
      ? "right"
      : "left";

  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && context.measureText(candidate).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  const maxLines = Math.max(1, Math.floor(rect.height / lineHeight));
  const visibleLines = lines.slice(0, maxLines);
  const x = style.textAlign === "center"
    ? cardOffsetX + rect.left - cardRect.left + rect.width / 2
    : style.textAlign === "right" || style.textAlign === "end"
      ? cardOffsetX + rect.right - cardRect.left
      : cardOffsetX + rect.left - cardRect.left;
  const firstLineY = cardOffsetY + rect.top - cardRect.top + (rect.height - visibleLines.length * lineHeight) / 2 + lineHeight / 2;

  visibleLines.forEach((content, index) => {
    context.fillText(content, x, firstLineY + index * lineHeight);
  });
}

export async function exportQrPng(svg: SVGSVGElement, filename: string) {
  const image = await loadQrImage(svg);
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 900;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 60, 60, 780, 780);
  await downloadCanvas(canvas, filename);
}

export async function exportBrandedQrPng(
  card: HTMLDivElement,
  filename: string,
) {
  await document.fonts.ready;
  const svg = card.querySelector("svg");
  if (!svg) throw new Error("QR code is not available");

  const image = await loadQrImage(svg);
  const cardRect = card.getBoundingClientRect();
  const cardStyle = window.getComputedStyle(card);
  const shadowMatch = cardStyle.boxShadow.match(
    /^(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px(?:\s+[-\d.]+px)?\s+(.+)$/,
  );
  const shadowX = shadowMatch ? Number.parseFloat(shadowMatch[1]) : 0;
  const shadowY = shadowMatch ? Number.parseFloat(shadowMatch[2]) : 0;
  const shadowBlur = shadowMatch ? Number.parseFloat(shadowMatch[3]) : 0;
  const framePadding = 16;
  const shadowLeft = Math.max(0, shadowBlur - shadowX);
  const shadowRight = Math.max(0, shadowBlur + shadowX);
  const shadowTop = Math.max(0, shadowBlur - shadowY);
  const shadowBottom = Math.max(0, shadowBlur + shadowY);
  const cardOffsetX = framePadding + shadowLeft;
  const cardOffsetY = framePadding + shadowTop;
  const canvas = document.createElement("canvas");
  const scale = 3;
  canvas.width = Math.ceil((cardRect.width + framePadding * 2 + shadowLeft + shadowRight) * scale);
  canvas.height = Math.ceil((cardRect.height + framePadding * 2 + shadowTop + shadowBottom) * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not available");
  context.scale(scale, scale);

  context.fillStyle = window.getComputedStyle(document.body).backgroundColor;
  context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

  if (shadowMatch) {
    context.shadowColor = shadowMatch[4];
    context.shadowBlur = shadowBlur;
    context.shadowOffsetX = shadowX;
    context.shadowOffsetY = shadowY;
    context.fillStyle = cardStyle.backgroundColor;
    context.fillRect(cardOffsetX, cardOffsetY, cardRect.width, cardRect.height);
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
  }

  context.fillStyle = cardStyle.backgroundColor;
  context.fillRect(cardOffsetX, cardOffsetY, cardRect.width, cardRect.height);

  const qrTile = svg.closest<HTMLElement>(".brand-export-qr");
  if (qrTile) {
    const qrTileRect = qrTile.getBoundingClientRect();
    context.fillStyle = window.getComputedStyle(qrTile).backgroundColor;
    context.fillRect(
      cardOffsetX + qrTileRect.left - cardRect.left,
      cardOffsetY + qrTileRect.top - cardRect.top,
      qrTileRect.width,
      qrTileRect.height,
    );
  }

  const qrSvgRect = svg.getBoundingClientRect();
  context.drawImage(
    image,
    cardOffsetX + qrSvgRect.left - cardRect.left,
    cardOffsetY + qrSvgRect.top - cardRect.top,
    qrSvgRect.width,
    qrSvgRect.height,
  );

  const textElements = [
    ...card.querySelectorAll<HTMLElement>(
      ".brand-export-card-top span, .brand-export-name, .brand-export-description, .brand-export-qrid, .brand-export-meta strong",
    ),
  ];
  textElements.forEach((element) => {
    const text = element.textContent?.trim() || "";
    drawElementText(context, element, cardRect, cardOffsetX, cardOffsetY, text);
  });

  const meta = card.querySelector<HTMLElement>(".brand-export-meta");
  if (meta) {
    const metaRect = meta.getBoundingClientRect();
    const metaStyle = window.getComputedStyle(meta);
    if (metaStyle.borderTopStyle !== "none") {
      context.beginPath();
      context.strokeStyle = metaStyle.borderTopColor;
      context.lineWidth = Number.parseFloat(metaStyle.borderTopWidth) || 1;
      context.moveTo(cardOffsetX + metaRect.left - cardRect.left, cardOffsetY + metaRect.top - cardRect.top);
      context.lineTo(cardOffsetX + metaRect.right - cardRect.left, cardOffsetY + metaRect.top - cardRect.top);
      context.stroke();
    }
  }

  await downloadCanvas(canvas, filename);
}