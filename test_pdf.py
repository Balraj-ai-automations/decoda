import pypdf

pdf_path = "data/sample.pdf"

reader = pypdf.PdfReader(pdf_path)

first_page = reader.pages[0]

text = first_page.extract_text()

print(text)