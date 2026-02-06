import math
import os
import struct
import zlib


def rgba(r, g, b, a=255):
    return (r, g, b, a)


def write_png(path, width, height, pixels):
    # pixels is a flat list of RGBA tuples length width*height
    raw_rows = []
    for y in range(height):
        row = bytearray()
        for x in range(width):
            r, g, b, a = pixels[y * width + x]
            row.extend([r, g, b, a])
        raw_rows.append(b"\x00" + bytes(row))
    raw = b"".join(raw_rows)
    compressed = zlib.compress(raw)

    def chunk(chunk_type, data):
        return (
            struct.pack(">I", len(data))
            + chunk_type
            + data
            + struct.pack(">I", zlib.crc32(chunk_type + data) & 0xFFFFFFFF)
        )

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", ihdr)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")

    with open(path, "wb") as f:
        f.write(png)


def render_logo(size, stroke_color):
    width = height = size
    pixels = [rgba(0, 0, 0, 0)] * (width * height)

    # Stroke settings in SVG units (0..100)
    outer_radius = 45
    outer_stroke = 6
    c_stroke = 8
    c_half = c_stroke / 2.0
    outer_half = outer_stroke / 2.0

    # Ellipse approximation for the "C"
    rx = 23.0
    ry = 26.0
    avg_radius = (rx + ry) / 2.0
    c_threshold = c_half / avg_radius

    for y in range(height):
        for x in range(width):
            # map pixel center to SVG space (0..100)
            sx = (x + 0.5) * 100 / width
            sy = (y + 0.5) * 100 / height

            # outer circle stroke
            dist_center = math.hypot(sx - 50, sy - 50)
            on_outer = abs(dist_center - outer_radius) <= outer_half

            on_c = False
            if not on_outer:
                dx = sx - 50
                dy = sy - 50
                angle = math.degrees(math.atan2(dy, dx))
                # Keep the C open on the right (-40 to 40 degrees)
                if angle <= -40 or angle >= 40:
                    r = math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2)
                    if abs(r - 1) <= c_threshold:
                        on_c = True

            if on_outer or on_c:
                pixels[y * width + x] = stroke_color

    return pixels


def composite(center_pixels, center_size, canvas_size, bg_color):
    width, height = canvas_size
    canvas = [bg_color] * (width * height)
    cx = (width - center_size) // 2
    cy = (height - center_size) // 2
    for y in range(center_size):
        for x in range(center_size):
            src = center_pixels[y * center_size + x]
            if src[3] == 0:
                continue
            canvas[(cy + y) * width + (cx + x)] = src
    return canvas


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def main():
    output_dir = os.path.join("public", "brand")
    ensure_dir(output_dir)

    stroke = rgba(27, 38, 59, 255)
    sizes = [64, 128, 256, 512]
    for size in sizes:
        pixels = render_logo(size, stroke)
        out_path = os.path.join(output_dir, f"charlesville-logo-{size}.png")
        write_png(out_path, size, size, pixels)

    # Preview on light and dark headers
    preview_size = 160
    logo_pixels = render_logo(preview_size, stroke)
    light_bg = rgba(244, 245, 247, 255)
    dark_bg = rgba(11, 13, 16, 255)

    light_canvas = composite(logo_pixels, preview_size, (600, 200), light_bg)
    dark_canvas = composite(logo_pixels, preview_size, (600, 200), dark_bg)

    write_png(
        os.path.join(output_dir, "charlesville-logo-preview-light.png"),
        600,
        200,
        light_canvas,
    )
    write_png(
        os.path.join(output_dir, "charlesville-logo-preview-dark.png"),
        600,
        200,
        dark_canvas,
    )


if __name__ == "__main__":
    main()
