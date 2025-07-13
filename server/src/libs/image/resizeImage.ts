import * as sharp from 'sharp';


export async function resizeImage(
    buffer: Buffer,
    width: number,
    height?: number,
): Promise<Buffer> {
    return sharp(buffer).resize(width, height ?? width).toBuffer();
}
