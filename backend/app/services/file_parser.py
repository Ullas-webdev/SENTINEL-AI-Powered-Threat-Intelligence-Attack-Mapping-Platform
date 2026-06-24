import PyPDF2
import docx
import csv
import io
from fastapi import UploadFile, HTTPException

class FileParser:
    @staticmethod
    async def parse_file(file: UploadFile) -> str:
        content = await file.read()
        extension = file.filename.split(".")[-1].lower()
        
        if extension == "pdf":
            return FileParser._parse_pdf(content)
        elif extension == "docx":
            return FileParser._parse_docx(content)
        elif extension == "txt":
            return content.decode("utf-8")
        elif extension == "csv":
            return FileParser._parse_csv(content)
        elif extension == "json":
            return content.decode("utf-8")
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported file extension: {extension}")

    @staticmethod
    def _parse_pdf(content: bytes) -> str:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text

    @staticmethod
    def _parse_docx(content: bytes) -> str:
        doc = docx.Document(io.BytesIO(content))
        return "\n".join([para.text for para in doc.paragraphs])

    @staticmethod
    def _parse_csv(content: bytes) -> str:
        stream = io.StringIO(content.decode("utf-8"))
        reader = csv.reader(stream)
        rows = [", ".join(row) for row in reader]
        return "\n".join(rows)
