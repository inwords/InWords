using System;
using System.Drawing;

namespace InWords.WebApi.Extensions.BitmapExtensions
{
    public static class BitmapExtensions
    {
        public static Bitmap CropAtRect(this Bitmap b, Rectangle r)
        {
            Bitmap nb = new Bitmap(r.Width, r.Height);
            Graphics g = Graphics.FromImage(nb);
            g.DrawImage(b, -r.X, -r.Y);
            return nb;
        }

        public static Bitmap ResizeToSize(this Bitmap bitmap, int minSize)
        {
            if (bitmap == null) throw new ArgumentNullException(nameof(bitmap));
            int width, height;
            if (bitmap.Width < bitmap.Height)
            {
                width = minSize;
                int heightRate = bitmap.Height * minSize;
                height = Convert.ToInt32(heightRate / (double)bitmap.Width);
            }
            else
            {
                int widthRate = bitmap.Width * minSize;
                width = Convert.ToInt32(widthRate / (double)bitmap.Height);
                height = minSize;
            }
            return new Bitmap(bitmap, width, height);
        }
    }
}
