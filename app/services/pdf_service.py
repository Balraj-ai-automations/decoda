from pypdf import PdfReader


def extract_text_from_pdf(file_path: str):
    # Load PDF
    reader = PdfReader(file_path)

    # Store extracted pages
    pages = []

    # Loop through every PDF page
    for page_number, page in enumerate(
        reader.pages,
        start=1
    ):
        # Extract page text
        page_text = page.extract_text()

        # Skip empty pages
        if page_text:
            pages.append({
                "page": page_number,
                "text": page_text
            })

    return pages