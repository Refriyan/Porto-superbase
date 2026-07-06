import * as pdfjsLib from "pdfjs-dist/build/pdf.mjs";

// Vite butuh worker pdf.js di-resolve sebagai URL asset saat build
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
).toString();

/**
 * Render halaman pertama dari file PDF menjadi gambar PNG (File object),
 * supaya bisa dipakai sebagai thumbnail sertifikat seperti file gambar biasa.
 *
 * @param {File} file - File PDF yang dipilih user
 * @returns {Promise<File|null>} File PNG hasil render, atau null kalau gagal
 */
export async function pdfFileToImage(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        // scale 2 supaya hasil render tidak buram (~144 DPI)
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");

        await page.render({ canvasContext: ctx, viewport }).promise;

        const blob = await new Promise((resolve) =>
            canvas.toBlob(resolve, "image/png")
        );
        if (!blob) return null;

        const newName = file.name.replace(/\.pdf$/i, "") + ".png";
        return new File([blob], newName, { type: "image/png" });
    } catch (err) {
        console.error("Gagal convert PDF ke gambar:", err);
        return null;
    }
}